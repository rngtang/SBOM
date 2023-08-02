class SbomsController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_sboms, only: %i[ show edit update destroy ]

    # Updates the name or description of an SBOM
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

    # Finds sbom associated to a user_id and returns name
    def sbomNames
        @user = User.find(params[:user_id])
        render json: @user.sboms.where(archive: false).pluck(:name), status: :ok
    end

    # Returns the parameters of an sbom
    def sbomTop
        @user = User.find(params[:user_id])
        sbomtop = @user.sboms.where(archive: false).as_json(
            only: [:id, :bomFormat, :specVersion, :serialNumber, :version, :name, :description, :metadata, :archive], 
            methods: [:vuln_number]
        )
        render json: sbomtop, status: :ok
    end 

    def show
        @sbom = Sbom.find(params[:id])
        render json: @sbom, status: :ok
    end

    # Sets the column archive to "true" to archive the sbom
    def archive
        @sbom = Sbom.find(params[:id])
        @sbom.update(archive: true)
    end

    def namedesc
        @sbom = Sbom.find(params[:id])
        @top = []
        @top << @sbom.name
        @top << @sbom.description
        render json: @top, status: :ok
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
                if SbomComponent.find_by(purl: subC["purl"])
                    # If the component already exists, it is associated to the sbom if it does not already contains it
                    @c = SbomComponent.find_by(purl: subC["purl"])
                    @sbom.sbom_components << @c unless @sbom.sbom_components.include?(@c)
                else
                    # If it does not exist, it creates the component
                    @c = @sbom.sbom_components.create(bom_ref: subC["bom-ref"], group: subC["type"], name: subC["name"], version: subC["version"], purl:subC["purl"])
                    
                    # Links the dependency with the sbomComponent (looks for a match between purl and ref)
                    if @d = Dependency.find_by(ref: subC["purl"])
                        @c.dependencies << @d
                    end

                    @props = subC["properties"]
                    # creates sbom_component properties for array of object input
                    @props = subC["properties"]
                    if @props
                        @props.each do |p|
                            @m = @c.properties.create(name: p["name"], value: p["value"])
                        end
                    end
                end
            end
        end

        # creates metadata, why is it an array? idk has_many
        @mtd = data["metadata"]
        @rn = @mtd["component"]
        @m = @sbom.metadata.create(timestamp: @mtd["timestamp"], rootNode: @rn["purl"])
        
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
                # Finds or creates vulnerabilities by the vulnID
                if Vulnerability.find_by(vulnID: v["id"])
                    # If the vulnerability exists, the it is appended to the sbom
                    @v = Vulnerability.find_by(vulnID: v["id"])
                    @sbom.vulnerabilities << @v unless @sbom.vulnerabilities.include?(@v)
                    next
                else
                    # Creates the affected array and then pass it was a parameter to the Vulnerability
                    @affected = v["affects"]
                    if @affected
                        # Creates array
                        aff = Array.new

                        # Appends the affected elements to the array
                        @affected.each do |a|
                            aff.push(a["ref"])
                        end
                    end

                    # Creates new vulnerability if it does not exist
                    @vuln = @sbom.vulnerabilities.create(bom_ref: v["bom-ref"], vulnID: v["id"], description: v["description"], recommendation: v["advisories"][0]["url"], affected: aff)

                    # Creates the rating object fo the vulnerability
                    @ratings = v["ratings"]
                    if @ratings
                        @ratings.each do |r|
                            @vuln.ratings.create(score: r["score"], severity: r["severity"])
                        end
                    end

                    # Creates the source of the vulnerability
                    @source = v["source"]
                    @vuln.sources.create(name: @source["name"], url: @source["url"])
                end
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
