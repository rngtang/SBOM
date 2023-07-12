
class SamlController < ApplicationController
  protect_from_forgery except: :acs
  def acs
    response = OneLogin::RubySaml::Response.new(params[:SAMLResponse], settings: saml_settings)
    # response.settings = saml_settings

    if response.is_valid?
      Rails.logger.info "SAML response: #{response.inspect}"
      decoded_nameid = Base64.decode64(response.nameid)
      Rails.logger.info "Decoded nameid: #{decoded_nameid}"
      session[:user_id] = User.find_or_create_by(netid: response.nameid).id #universal resource number
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

    settings.assertion_consumer_service_url = ENV['ASSERTION_CONSUMER_SERVICE_URL'] #env variable
    settings.sp_entity_id                   = "https://chip.duke.edu"
    settings.idp_sso_target_url             = "https://shib.oit.duke.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=https://chip.duke.edu"
    #settings.idp_cert_fingerprint           = 'AB:83:A0:19:39:E5:A0:4A:28:FC:79:A9:73:88:AB:45:8A:D3:C0:50'
    #settings.name_identifier_format         = "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
    settings.private_key = File.read('config/saml/private.key') 
    settings.certificate = File.read('config/saml/certificate.cert') 
    #sign idp cert
    settings.security[:want_responses_signed]= true
    settings.idp_cert= File.read('config/saml/idp_cert.cert')

    settings
  end
  
end

