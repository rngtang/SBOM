class ComponentsController < ApplicationController
    def new
        @component = Component.new
    end

    def create
        @metadatum = Metadatum.find(params[:metadatum_id])
        @component = @metadatum.components.new(component_params)
    end

    def component_params
        params.require(:component).permit(:vendor, :name, :version)
    end
end