class SbomsController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_sboms, only: %i[ show edit update destroy ]

    def update 
        @sbom = Sbom.find(params[:id])
        @sbom.update(update_sbom_params)
        render json: @sbom, status: :ok
    end

    def new
        @sbom = Sbom.new
    end

    def index
        if !params[:user_id]
            render json: Sbom.all, status: :ok
            
        else 
            @user = User.find(params[:user_id])
            render json: @user.sboms, status: :ok
        end
    end

    def sbomNames
        @user = User.find(params[:user_id])
        render json: @user.sboms.pluck(:name), status: :ok
    end

    def show
        @sbom = Sbom.find(params[:id])
        render json: @sbom, status: :ok
    end

    def archive
        @sbom = Sbom.find(params[:id])
        @sbom.update(archive: true)
    end

    def destroy     
        @sbom.destroy
        respond_to do |format|
            format.html { redirect_to '/sboms', notice: "SBOM was successfully destroyed." }
            format.json { head :no_content}
        end
    end

    def create
        # error = MyError.new
        # p error

        # Finds user by id
        @user = User.find(params[:user_id])
      
        # Use languages not included
        require 'json'

        file = params[:file].read

        data = JSON.parse(file)
        puts "CALLED ON CREATE"

        # Creates the sbom object with the parameters
        @sbom = Sbom.create(bomFormat: data['bomFormat'] , specVersion: data['specVersion'], serialNumber: data['serialNumber'], version: data['version'], user: @user, name: params[:name], description: params[:description])
        
        puts "GOING DOWN LEVELS"
        # create dependencies for array of objects input
        @dpd = data["dependencies"]
        if @dpd
            @dpd.each do |d|
                @dep = @sbom.dependencies.create(ref: d["ref"], dependsOn: d["dependsOn"])
            end
        end

        # create sbom_components, nested loop for array of objects input
        @sc = data["components"]
        if @sc
            @sc.each do |subC|
                # Finds or creates the components by purl
                @c = SbomComponent.find_or_create_by(purl: subC["purl"]) do |c|
                    c.bom_ref = subC["bom-ref"]
                    c.group = subC["type"]
                    c.name = subC["name"]
                    c.version = subC["version"]
                end
                # Links the components to the sboms
                @sbom.sbom_components << @c unless @sbom.sbom_components.include?(@c)

                @c = @sbom.sbom_components.create(bom_ref: subC["bom-ref"], group: subC["type"], name: subC["name"], version: subC["version"], purl:subC["purl"])
                # Links the dependency with the sbomComponent (looks for a match between purl and ref)
                if @d = Dependency.find_by(ref: subC["purl"])
                    @c.dependencies << @d
                end

                @props = subC["properties"]
                # creates sbom_component properties for array of object input
                if @props
                    @props.each do |p|
                        @m = @c.properties.create(name: p["name"], value: p["value"])
                    end
                end
            end
        end

        # creates metadata, why is it an array? idk has_many
        @mtd = data["metadata"]
        @m = @sbom.metadata.create(timestamp: @mtd["timestamp"])
        
        # creates tools for metadata for array of object input
        @t = @mtd["tools"]
        if @t
            @t.each do |tools|
                @m.tools.create(vendor: tools["vendor"], name: tools["name"], version: tools["version"])
            end
        end

        # creates vulnerabilities assoc with sboms
        @vulns = data["vulnerabilities"]
        if @vulns
            @vulns.each do |v|
                # Find existing vulnerability or create new one
                @vuln = Vulnerability.find_or_create_by(vulnID: v["id"]) do |vuln|
                    vuln.bom_ref = v["bom-ref"]
                    vuln.description = v["description"]
                    vuln.recommendation = v["advisories"][0]["url"]
                end
                # Associate vulnerability with SBoM
                @sbom.vulnerabilities << @vuln unless @sbom.vulnerabilities.include?(@vuln)

                @vuln = @sbom.vulnerabilities.create(bom_ref: v["bom-ref"], vulnID: v["id"], description: v["description"], recommendation: v["advisories"][0]["url"])
                @affected = v["affects"]
                if @affected
                    @affected.each do |a|
                        @vuln.affected << a["ref"]
                    end
                end
                @ratings = v["ratings"]
                if @ratings
                    @ratings.each do |r|
                        @vuln.ratings.create(score: r["score"], severity: r["severity"])
                    end
                end
                @source = v["source"]
                @vuln.sources.create(name: @source["name"], url: @source["url"])
            end
        end

        if @sbom.save
            render json: @sbom, status: :created
        else
            #do something to acknowledge that it didn't work, include returning a useful status code
            render json: @sbom.errors, status: :unprocessable_entity
        end
    end

    private
        def sbom_params
            params.require(:sbom).permit(:bomFormat, :specVersion, :serialNumber, :version, :user_id, :vulnerabilities, :archive, sbom_component: [])
        end

        def set_sboms
            @sbom = Sbom.find(params[:id])
        end

        def invalid(e)
            render json: { errors: e.record.errors.full_messages }, 
            status: :unprocessable_entity
        end

        def update_sbom_params
            params.require(:sbom).permit(:name, :description)
        end
        
end
