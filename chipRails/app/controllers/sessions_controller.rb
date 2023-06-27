# app/controllers/sessions_controller.rb
class SessionsController < ApplicationController
    def new
      redirect_to "https://shib.oit.duke.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=https://chip.duke.edu"
    end
  

    def create
      saml_response = params[:SAMLResponse] 
      response = OneLogin::RubySaml::Response.new(saml_response)
  
      if response.is_valid?
        netid = response.attributes['netid']
  

        user = User.find_by(netid: netid)
        if user
          session[:user_id] = user.id
          redirect_to root_path, notice: 'Logged in!'
        else
          flash[:error] = "Not authorized."
          redirect_to root_path
        end
      else
        flash.now.alert = 'SAML response invalid'
        render 'new'
      end
    end
  
    def destroy
      session[:user_id] = nil
      redirect_to root_path, notice: 'Logged out!'
    end
  end
  