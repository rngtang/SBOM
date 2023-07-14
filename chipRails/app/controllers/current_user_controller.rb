class CurrentUserController < ApplicationController
    def index
      if current_user
        render json: current_user
      else
        render json: {}, status: 404
      end
    end
  end
