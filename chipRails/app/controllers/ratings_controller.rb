class RatingsController < ApplicationController
    def new
        @rating = Rating.new
    end

    def create
        @vulnerability = Vulnerability.find(params[:vulnerability_id])
        @rating = @vulnerability.ratings.new(rating_params)
    end

    def rating_params
        params.permit(:score, :severity)
    end
end
