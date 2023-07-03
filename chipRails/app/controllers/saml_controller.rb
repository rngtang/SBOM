class SamlController < ApplicationController
    def acs
      response = OneLogin::RubySaml::Response.new(params[:SAMLResponse])
      
      if response.is_valid?
        session[:netid] = response.nameid
        # Redirect to the logged-in page
        redirect_to dashboard_path
      else
        # Handle invalid SAML response
        render plain: "Invalid SAML response", status: :unauthorized
      end
    end
  end
  