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
        sbomComp.properties.each do |prop|
            @property = @component.properties
            @property.name = prop["name"]
            @property.value = prop["value"]
        end
    end

    def create
        # byebug
        # puts "==" *30
        # puts sbom_params.keys
        # puts "++" *30
        # blowup
        @user = User.find(params[:user_id])
        @sbom = @user.sboms.new(sbom_params)
        # p sbom_params
        sbom_params["components"].each do |sbomComp|
            @sbom.sbom_component =createSbomComponent(sbomComp:sbomComp)
        end
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
            params.require(:sbom).permit(:bomFormat, :specVersion, :serialNumber, :version, :user_id, :vulnerabilities)
        end

        def set_sboms
            @sbom = Sbom.find(params[:id])
        end

end
