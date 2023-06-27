class MetadataController < ApplicationController
    def new
        @metadatum = Metadatum.new
    end

    def create
        @sbom = Sbom.find(params[:sbom_id])
        @metadatum = @sbom.metadata.new(metadatum_params)
    end

    def user_params
        params.permit(:timestamp)
    end
end
