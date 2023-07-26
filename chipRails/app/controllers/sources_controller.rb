class SourcesController < ApplicationController
    def new
        @source = Source.new
    end

    # Looks for the source associated to a vulnerability
    def index
        @sources = Source.find(params[:vulnerability_id])
        render json: @sources, status: :ok
    end
    
    # Creates a source
    def create
        @vulnerability = Vulnerability.find(params[:vulnerability_id])
        @source = @vulnerability.sources.new(source_params)
    end

    # Parameters to create a source
    def source_params
        params.permit(:name, :url)
    end
end