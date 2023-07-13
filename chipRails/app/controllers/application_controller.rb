class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user
  # before_action :authenticate_user!

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def authenticate_user!
    unless current_user
      redirect_to "http://localhost:3001", allow_other_host: true
    end
  end
  
end
