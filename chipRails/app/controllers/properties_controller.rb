class PropertiesController < ApplicationController
    def new
        @property = Property.new
    end

    def index
        @sbomComponent = sbomComponent.find(params[:sbomComponent_id])
        render json: @sbomComponent.properties, status: :ok
    end

    def create
        @sbomComponent = sbomComponent.find(params[:sbomComponent_id])
        @property = @sbomComponent.components.new(property_params)
    end

    def property_params
        params.require(:property).permit(:name, :value)
    end
end