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
    
    if response.is_valid?
      session[:netid] = response.nameid
      # Redirecting to the frontend
      redirect_to "https://localhost:3000"
    else
      # Invalid response
      render plain: "Invalid SAML response", status: :unauthorized
    end
  end
end
# Just trynna test without tokens
