class SamlController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:acs]
  
    def acs
      saml_response = OneLogin::RubySaml::Response.new(params[:SAMLResponse])
  
      if saml_response.is_valid?
        user_info = saml_response.attributes        
        session[:user_id] = user_info['user_id'] 
        redirect_to root_path, notice: 'Logged in!'
      else
        flash[:error] = "The SAML response was not valid."
        redirect_to root_path
      end
    end
  end
  