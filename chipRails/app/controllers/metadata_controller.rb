class MetadataController < ApplicationController
    def new
        @metadatum = Metadatum.new
    end

    def index
        @sbom = Sbom.find(params[:sbom_id])
        render json: @sbom.metadata, status: :ok
    end

    # Creates a metadatum object
    def create
        @sbom = Sbom.find(params[:sbom_id])
        @metadatum = @sbom.metadata.new(metadatum_params)
    end

    # Parameters that a metadatum accepts
    def user_params
        params.require(:metadatum).permit(:timestamp, :rootNode)
    end
end
