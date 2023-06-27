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
        @sboms = Sbom.find(params[:user_id])
        render json: @sboms, status: :ok
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
        @sbom.save
        respond_to do |format|
            format.html { redirect_to '/sboms_all'}
            format.json { head :no_content}
        else
            format.json { head :no_content}
        end
        render json: @sbom, status: :ok

    end

    private
        def sbom_params
            params.require(:sbom).permit(:bomFormat, :specVersion, :serialNumber, :version, :name, :description)
        end

        def set_sboms
            @sbom = Sbom.find(params[:id])
        end

end
