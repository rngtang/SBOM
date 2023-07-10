# class SamlController < ApplicationController
#   def acs
#     response = OneLogin::RubySaml::Response.new(params[:SAMLResponse])
    
#     if response.is_valid?
#       session[:netid] = response.nameid
#       # Generating the authentication token
#       auth_token = generate_auth_token(response.nameid)
#       # Redirecting to the frontend with the authentication token
#       redirect_to "http://localhost:3000?auth_token=#{auth_token}"
#     else
#       # Invalid response
#       render plain: "Invalid SAML response", status: :unauthorized
#     end
#   end
#   def generate_auth_token(user_id)
#     # Not so sure whether I still need tokens
#   end
# end
class SamlController < ApplicationController
  def acs
    response = OneLogin::RubySaml::Response.new(params[:SAMLResponse])
    response.settings = saml_settings

    if response.is_valid?
      session[:netid] = response.nameid
      # Redirecting to the frontend
      redirect_to "http://localhost:3000"
    else
      # Invalid response
      render plain: "Invalid SAML response", status: :unauthorized
    end
  end

  private

  def saml_settings
    settings = OneLogin::RubySaml::Settings.new
  
    settings.assertion_consumer_service_url = "http://localhost:8080/saml/consume"
    settings.sp_entity_id                   = "https://chip.duke.edu"
    settings.idp_sso_target_url             = "https://shib.oit.duke.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=https://chip.duke.edu"
    settings.idp_cert_fingerprint           = 'AB:83:A0:19:39:E5:A0:4A:28:FC:79:A9:73:88:AB:45:8A:D3:C0:50'
    settings.name_identifier_format         = "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
  
    # Optional for most SAML IdPs
    settings.authn_context = "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport"
  
    # Private key and certificate paths
    settings.private_key = File.read('config/saml/privatekey.pem') 
    settings.certificate = File.read('config/saml/certificate.pem') 
  
    settings
  end
  

end

