class PropertiesController < ApplicationController
    def new
        @property = Property.new
    end

    def index
        @propoerties = Property.find(params[:dependency_id])
        render json: @properties, status: :ok
    end

    def create
        @dependency = Dependency.find(params[:dependency_id])
        @property = @dependency.components.new(property_params)
    end

    def property_params
        params.require(:property).permit(:name, :value)
    end
end