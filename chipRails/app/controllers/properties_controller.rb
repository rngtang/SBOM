class PropertiesController < ApplicationController
    def new
        @property = Property.new
    end

    def index
        @sbom_component = SbomComponent.find(params[:sbom_component_id])
        render json: @sbom_component.properties, status: :ok
    end

    def create
        @sbom_component = SbomComponent.find(params[:sbom_component_id])
        @property = @sbom_component.Properties.new(property_params)
        @property.save
    end

    def property_params
        params.require(:property).permit(:name, :value)
    end
end