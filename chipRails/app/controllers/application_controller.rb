require 'rack_authenticator'
class ApplicationController < ActionController::Base
    # config.web_console.whiny_requests = false
    before_action :set_cors_headers, :authorize_user

    def handle_unauthorized_request
      render 'home/not_authorized', status: 403, layout: false
    end

    def handle_not_found
      render 'home/not_found', status: 404, layout: false
    end

    def current_user
      # Return the authenticated user information
      render json: @user
    end

    private

    def rack_authenticate
      if Rails.env.development?
        
        rack_user = session[:mock_logged_in] ? mock_rack_user : nil
        # ^this is pretending to be shib
      else
        rack_user = request.env['authenticator.rack_user']
        # ^this is shib !!!!
      end
      @current_user = User.from_rack_user(rack_user)
    end

   

    def require_valid_user
      unless @current_user
        request_login(target: request.fullpath)
      end
    end

    def request_login(target:)
      redirect_to "/Shibboleth.sso/Login?target=#{URI.encode_www_form_component(target)}"
    end

    def mock_rack_user
      RackAuthenticator::RackUser.new(
        "#{ENV['GROUPS']}".split(','),
        {
          'HTTP_UID' => ENV['UID'],
          'HTTP_MAIL' => ENV['MAIL']
        }
      )
    end




    def set_cors_headers
      #Temporary for local dev, proxy setup will remove the need for this
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    end

    def authorize_user
      # redirect_after_login = session[:user].nil?
      puts ">>>>>>>>>>>>>>>> in authorize_user"
      rack_user = request.env['authenticator.rack_user']
      puts ">>>>>>>>>>>>>>>> rack_user is #{rack_user.inspect}"
      return nil unless rack_user
      #netid = rack_user.netid
      uid = rack_user.extra_params['HTTP_UID']

      if rack_user.in_group?("GROUP_NAME") #Group name decided later
        session[:admin] = true
      else
        session[:admin] = false
      end

      @user = User.find_by(unique_id: duid)
      if @user.nil?
        @user = User.new
        @user.netid = uid
        @user.email = mail
        @user.save
      else
        @user.save
      end

      session[:user] = @user

      # redirect_to "/" if redirect_after_login

    end

  end