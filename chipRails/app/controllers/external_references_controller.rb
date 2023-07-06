class ExternalReferencesController < ApplicationController
    def new
        @externalReference = ExternalReference.new
    end

    def index
        @sbomComponent = sbomComponent.find(params[:sbomComponent_id])
        render json: @sbomComponent.externalReferences, status: :ok
    end

    def create
        @sbomComponent = sbomComponent.find(params[:sbomComponent_id])
        @externalReference = @sbomComponent.externalReferences.new(externalReference_params)
    end

    def externalReference_params
        params.permit(:group, :url)
    end
end