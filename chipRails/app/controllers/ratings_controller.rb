class RatingsController < ApplicationController
    def new
        @rating = Rating.new
    end

    def index
        @ratings = Rating.find(params[:vulnerability_id])
        render json: @ratings, status: :ok
    end
    
    # Creates a rating
    def create
        @vulnerability = Vulnerability.find(params[:vulnerability_id])
        @rating = @vulnerability.ratings.new(rating_params)
    end

    # Parameters that a rating accepts
    def rating_params
        params.permit(:score, :severity)
    end
end
