class SubComponentsController < ApplicationController
    def new
        @subComponent = SubComponent.new
    end

    def create
        @dependency = Dependency.find(params[:dependency_id])
        @subComponent = @dependency.components.new(subComponent_params)
    end

    def subComponent_params
        params.permit(:bom_ref, :group, :publisher, :name, :version, :cpe, :purl)
    end
end