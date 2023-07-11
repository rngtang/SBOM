class SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:new, :create]
  protect_from_forgery except: :create

  def new
    redirect_to "https://shib.oit.duke.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=https://chip.duke.edu"
  end

  def create
    saml_response = params[:SAMLResponse]
    response = OneLogin::RubySaml::Response.new(saml_response)
    response.settings = saml_settings

    enc_key = REXML::XPath.first(response.document, "//xenc:EncryptedKey//xenc:CipherData/xenc:CipherValue").text
    enc_value = REXML::XPath.first(response.document, "//xenc:EncryptedData/xenc:CipherData/xenc:CipherValue").text
    private_key = OpenSSL::PKey::RSA.new(File.read('config/saml/privatekey.pem'))
    data_key = private_key.private_decrypt(Base64.decode64(enc_key), OpenSSL::PKey::RSA::PKCS1_OAEP_PADDING)
    decrypted_response = decrypt_cipher_data(data_key, enc_value)
    response = OneLogin::RubySaml::Response.new(decrypted_response)
  
    if response.is_valid?
      netid = response.attributes['NetID']
  
      user = User.find_or_create_by(netid: netid)
      session[:user_id] = user.id
      redirect_to "http://localhost:3000", notice: 'Logged in!'
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
