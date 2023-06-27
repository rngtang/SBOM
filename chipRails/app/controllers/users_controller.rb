class UsersController < ApplicationController
    def new
        @user = User.new
    end

    def create
        @user = User.new(user_params)
    end

    def user_params
        params.permit(:username)
    end
end