class SbomComponentsController < ApplicationController
    protect_from_forgery with: :null_session
    def index
        if params[:sbom_id]
            @sbom = Sbom.find(params[:sbom_id])
            render json: @sbom.sbom_components, status: :ok
        else
            render json: SbomComponent.all, status: :ok
        end
    end

    def show
        @sbom_component = SbomComponent.find(params[:id])
        render json: @sbom_component, status: :ok
    end
    
    def new
        @sbom_component = SbomComponent.new
    end

    def destroy
        @sbom_component = SbomComponent.find(params[:id])
        if @sbom_component.present?
            @sbom_component.destroy
        end
    end

    # Creates an SbomComponent
    def create
        @sbom = Sbom.find(params[:sbom_id])
        @sbom_component = @sbom.SbomComponents.new(sbom_component_params)
    end

    # Sets parameters that an SbomComponent accepts
    def sbom_component_params
        params.permit(:bom_ref, :group, :name, :version, :purl)
    end
end
