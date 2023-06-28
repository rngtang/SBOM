class ExternalReferencesController < ApplicationController
    def new
        @externalReference = ExternalReference.new
    end

    def index
        @dependency = Dependency.find(params[:dependency_id])
        render json: @dependency.externalReferences, status: :ok
    end

    def create
        @dependency = Dependency.find(params[:dependency_id])
        @externalReference = @dependency.externalReferences.new(externalReference_params)
    end

    def externalReference_params
        params.permit(:group, :url)
    end
end