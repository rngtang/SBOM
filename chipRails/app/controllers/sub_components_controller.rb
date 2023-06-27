class SubComponentsController < ApplicationController
    def index
        @subComponents = SubComponent.find(params[:dependency_id])
        render json: @subComponents, status: :ok
    end

    def show
        @subComponent = SubComponent.find(params[:id])
        render json: @subComponent, status: :ok
    end
    
    def new
        @subComponent = SubComponent.new
    end

    def create
        @dependency = Dependency.find(params[:dependency_id])
        @subComponent = @dependency.components.new(subComponent_params)
    end

    def subComponent_params
        params.require(:subComponent).permit(:bom_ref, :group, :publisher, :name, :version, :cpe, :purl)
    end
end