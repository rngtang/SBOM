class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    # skip_before_action :verify_authenticity_token

    # def saml
    #     auth_hash = request.env["omniauth.auth"]
    #     user = User.find_by(uid: auth_hash[:uid])
    #     if @user.persisted?
    #         sign_in_and_redirect @user, event: :authentication
    #         set_flash_message(:notice, :success, kind: "Shibboleth") if 
    #     end
    # end
end