class SourcesController < ApplicationController
    def new
        @source = Source.new
    end

    def index
        @sources = Source.find(params[:vulnerability_id])
        render json: @sources, status: :ok
    end
    
    def create
        @vulnerability = Vulnerability.find(params[:vulnerability_id])
        @source = @vulnerability.sources.new(source_params)
    end

    def source_params
        params.permit(:name, :url)
    end
end