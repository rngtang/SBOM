require 'jwt'

class AuthController < ApplicationController
  def create
    # authenticate user and assign to @user
    if @user
      token = JWT.encode({ user_id: @user.id, exp: 24.hours.from_now.to_i }, Rails.application.secrets.secret_key_base)
      render json: { token: token }, status: :ok
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end
end
