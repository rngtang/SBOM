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

    def createSbomComponent (sbomComp)
        # sbom.sbomComponent = sbomComp
        # sbomComp.properties.each do |prop|
        #     @property = @component.properties
        #     @property.name = prop["name"]
        #     @property.value = prop["value"]
        # end

        # for prop in sbomComp
        #     @property = Property.new(name: prop["name"], value: prop["value"]);
        # end
        
    end

    def create
        # byebug
        # puts "==" *30
        # puts sbom_params.keys
        # puts "++" *30
        # blowup
        @user = User.find(params[:user_id])
        @sbom = Sbom.create(bomFormat: params["bomFormat"], specVersion: params["specVersion"], serialNumber: params["serialNumber"], version: params["version"], user: @user)
        @sc = params["components"]
        @sc.each do |subC|
            @c = @sbom.sbom_components.create(bom_ref: subC["bom-ref"], publisher: subC["publisher"], name: subC["name"], version: subC["version"], cpe:subC["cpe"], purl:subC["purl"])
            @props = subC["properties"]
            @exRefs = subC["externalReferences"]
            @lic = subC["licenses"]
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
        # @dpd = params["dependencies"]
        # @dpd.each do |d|

        # end
        # @sbom.sbomComponent = createSbomComponent
        # @sbom.sbomComponents = params["sbomComponents"]

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
