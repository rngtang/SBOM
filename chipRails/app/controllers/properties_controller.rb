class PropertiesController < ApplicationController
    def new
        @property = Property.new
    end

    def index
        @sbom_component = SbomComponent.find(params[:sbom_component_id])
        render json: @sbom_component.properties, status: :ok
    end

    # Creates a property associated to an SbomComponent
    def create
        @sbom_component = SbomComponent.find(params[:sbom_component_id])
        @property = @sbom_component.Properties.new(property_params)
        @property.save
    end

    # Parameter that a property accepts
    def property_params
        params.require(:property).permit(:name, :value)
    end
end