class ExternalReferencesController < ApplicationController
    def new
        @externalReference = ExternalReference.new
    end

    def create
        @dependency = Dependency.find(params[:dependency_id])
        @externalReference = @dependency.components.new(externalReference_params)
    end

    def externalReference_params
        params.require(:externalReference).permit(:group, :url)
    end
end