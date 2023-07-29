class SessionsController < ActionController::Base
    protect_from_forgery with: :exception, except: :create
    def new
      redirect_to "https://shib.oit.duke.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=https://chip.duke.edu"
    end
    
    def current_user
      @current_user ||= User.find_by(id: session[:user_id])
    end
  
    def authenticate_user!
      unless current_user
        redirect_to "http://localhost:3000", allow_other_host: true
      end
    end
    
    def index
      if current_user
        render json: current_user
      else
        render json: {}, status: 404
      end
    end
  
    def create
      saml_response = params[:SAMLResponse]
      
      response = OneLogin::RubySaml::Response.new(saml_response, settings: saml_settings, allowed_clock_drift: 5.seconds)
      if response.is_valid?
        attributes_hash = convert_to_hash(response.attributes)
    
        netid = fetch_netid(attributes_hash)
        email = fetch_email(attributes_hash)
        username = fetch_username(attributes_hash)
        user = User.find_or_create_by(netid: netid)
        
        if user.persisted?
          begin
            user.update!(email: email, username: username)
          rescue => e
            Rails.logger.error "Failed to update user email: #{e.message}"
          end
    
          session[:user_id] = user.id
          @current_user=user
          redirect_to "http://localhost:3000/home"
        else
          flash.now.alert = 'Could not log in'
          render 'new'
        end
      else
        Rails.logger.error "SAML response invalid. Errors: #{response.errors}"
        flash.now.alert = 'SAML response invalid'
        redirect_to :action => 'new'
      end
    end
    
    def destroy
      session[:user_id] = nil
      # redirect_to root_path, notice: 'Logged out!'
      redirect_to "http://localhost:3000/logout"
    end
  
    private
    
    def convert_to_hash(attributes)
      hash = {}
      attributes.each do |key, value|
        hash[key] = value
      end
      hash
    end

    # TODO: replace the urn oid with a variable for easier updates in the future (maybe for different institutions, etc.)

    def fetch_netid(attributes_hash)
      attributes_hash.dig("urn:oid:0.9.2342.19200300.100.1.1", 0)
    end
  
    def fetch_email(attributes_hash)
      attributes_hash.dig("urn:oid:0.9.2342.19200300.100.1.3", 0)
    end

    def fetch_username(attributes_hash)
      attributes_hash.dig("urn:oid:2.16.840.1.113730.3.1.241", 0)
    end
  
    def saml_settings
      settings = OneLogin::RubySaml::Settings.new
  
      settings.assertion_consumer_service_url = ENV['ASSERTION_CONSUMER_SERVICE_URL']
      settings.sp_entity_id                   = "https://chip.duke.edu"
      settings.idp_sso_target_url             = "https://shib.oit.duke.edu/idp/profile/SAML2/Unsolicited/SSO?providerId=https://chip.duke.edu"
      settings.private_key = File.read('config/saml/private.key') 
      settings.certificate = File.read('config/saml/certificate.cert') 
      settings.security[:want_responses_signed]= true
      settings.idp_cert= File.read('config/saml/idp_cert.cert')
  
      settings
    end
  end
  