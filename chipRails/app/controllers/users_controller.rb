class UsersController < ApplicationController
    before_action :set_user, only: %i[ show edit update destroy ]
    protect_from_forgery with: :null_session
    def index
        @users = User.all
        render json: @users, status: :ok
    end

    # Finds user by id
    def show 
        @user = User.find(params[:id])
        render json: @user, status: :ok
    end

    # Destroy user
    def destroy
        @user.destroy
        respond_to do |format|
            format.html { redirect_to users_path, notice: "User was successfully destroyed." }
            format.json { head :no_content}
        end
    end

    # Updates a user
    def update
        respond_to do |format|
            if @user.update(user_params)
                format.html { redirect_to user_url(@user) }
                format.json { head :no_content}
            else
                format.json {head :no_content}
            end
            
        end
    end

    def new
        @user = User.new
    end

    # Creates a new user
    def create
        @user = User.new(user_params)
        respond_to do |format|
            if @user.save
                format.json { render json: @user}
            else
                format.json { head :no_content}
            end
        end
    end

    private
        def set_user
            @user = User.find(params[:id])
        end   
        def user_params
            params.require(:user).permit(:username)
        end
end 
