class SbomsController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_sboms, only: %i[ show edit update destroy ]

    def new
        @sbom = Sbom.new
    end
    
    def all
        @sboms = Sbom.all
        render json: @sboms, status: :ok
    end

    def index
        @user = User.find(params[:user_id])
        render json: @user.sboms, status: :ok
    end


    def show
        @sbom = Sbom.find(params[:id])
        render json: @sbom, status: :ok
    end

    def destroy     
        @sbom.destroy
        respond_to do |format|
            format.html { redirect_to '/sboms_all', notice: "SBOM was successfully destroyed." }
            format.json { head :no_content}
        end
    end

    # def createSbomComponent (sbomComp)
    #     # sbom.sbomComponent = sbomComp
    #     # sbomComp.properties.each do |prop|
    #     #     @property = @component.properties
    #     #     @property.name = prop["name"]
    #     #     @property.value = prop["value"]
    #     # end

    #     # for prop in sbomComp
    #     #     @property = Property.new(name: prop["name"], value: prop["value"]);
    #     # end
        # byebug
    # end

    def create
        @user = User.find(params[:user_id])
        @sbom = Sbom.create(bomFormat: params["bomFormat"], specVersion: params["specVersion"], serialNumber: params["serialNumber"], version: params["version"], user: @user)
        # create sbom_components, nested loop for array of objects input
        @sc = params["components"]
        if @sc
            @sc.each do |subC|
                @c = @sbom.sbom_components.create(bom_ref: subC["bom-ref"], publisher: subC["publisher"], name: subC["name"], version: subC["version"], cpe:subC["cpe"], purl:subC["purl"])
                @props = subC["properties"]
                @exRefs = subC["externalReferences"]
                @lic = subC["licenses"]
                # creates sbom_component properties, externalReferences, and licenses for array of object input
                if @props
                    @props.each do |p|
                        @m = @c.properties.create(name: p["name"], value: p["value"])
                    end
                end
                if @ex
                    @exRefs.each do |e|
                        @c.externalReferences.create(group: e["group"], url: e["url"])
                    end
                end
                if @lic
                    @lic.each do |l|
                        @c.licenses.create(iden: l["id"])
                    end
                end
            end
        end
        # create dependencies for array of objects input
        @dpd = params["dependencies"]
        if @dpd
            @dpd.each do |d|
                @dep = @sbom.dependencies.create(ref: d["ref"], dependsOn: d["dependsOn"])
            end
        end
        # creates metadata, why is it an array? idk has_many
        @mtd = params["metadata"]
        @m = @sbom.metadata.create(timestamp: @mtd["timestamp"])
        # creates tools for metadata for array of object input
        @t = @mtd["tools"]
        if @t
            @t.each do |tools|
                @m.tools.create(vendor: tools["vendor"], name: tools["name"], version: tools["version"])
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
            params.require(:sbom).permit(:bomFormat, :specVersion, :serialNumber, :version, :user_id, :vulnerabilities, sbom_component: [])
        end

        def set_sboms
            @sbom = Sbom.find(params[:id])
        end

end
