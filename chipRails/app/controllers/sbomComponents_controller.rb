class SbomComponentsController < ApplicationController
    protect_from_forgery with: :null_session
    def index
        @sbom = Sbom.find(params[:sbom_id])
        render json: @sbom.sbomComponents, status: :ok
    end

    def all
        @sbomComponents = SbomComponent.all
        render json: @sbomComponents, status: :ok
    end

    def show
        @sbomComponent = SbomComponent.find(params[:id])
        render json: @SbomComponent, status: :ok
    end
    
    def new
        @SbomComponent = SbomComponent.new
    end

    def destroy
        @SbomComponent = SbomComponent.find(params[:id])
        if @SbomComponent.present?
            @SbomComponent.destroy
        end
    end

    def create
        @sbom = Sbom.find(params[:sbom_id])
        @SbomComponent = @sbom.sbomComponents.new(SbomComponent_params)
    end

    def SbomComponent_params
        params.permit(:bom_ref, :group, :publisher, :name, :version, :cpe, :purl)
    end
end
