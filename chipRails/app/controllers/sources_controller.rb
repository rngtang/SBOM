class SourcesController < ApplicationController
    def new
        @source = Source.new
    end

    def create
        @rating = Rating.find(params[:rating_id])
        @source = @rating.sources.new(source_params)
    end

    def source_params
        params.permit(:name, :url)
    end
end