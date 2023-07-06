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


    def create
        @user = User.find(params[:user_id])
        @sbom = @user.sboms.new(sbom_params)
        p sbom_params
        if @sbom.save
            render json: @sbom, status: :created
        else
            #do something to acknowledge that it didn't work, include returning a useful status code
            render json: @sbom.errors, status: :unprocessable_entity
        end
    end

    private
        def sbom_params
            byebug
            params.require(:sbom).permit(:bomFormat, :specVersion, :serialNumber, :version, :name, :description, :packages, :dependencies, :vulnerabilities, :user_id)
        end

        def set_sboms
            @sbom = Sbom.find(params[:id])
        end

end
