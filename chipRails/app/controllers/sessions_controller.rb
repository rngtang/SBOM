class SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:new, :create]
  protect_from_forgery except: :create

  def new
    redirect_to "https://shib.oit.duke.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=https://chip.duke.edu"
  end

  def create
    saml_response = params[:SAMLResponse]
    response = OneLogin::RubySaml::Response.new(saml_response, settings: saml_settings)
  
    if response.is_valid?
      uid = response.attributes['uid']  
      user = User.find_or_create_by(netid: uid)  
      session[:user_id] = user.id
      redirect_to "http://localhost:3000", notice: 'Logged in!'
    else
      Rails.logger.error "SAML response invalid. Errors: #{response.errors}"
      flash.now.alert = 'SAML response invalid'
      render 'new'
    end
  end
  
  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: 'Logged out!'
  end
  
end
