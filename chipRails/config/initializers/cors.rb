allowed_origins = if Rails.env.development?
    ['localhost:3000'] #3006 = webapp
  end

  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins allowed_origins 

      resource '*',
        headers: :any,
        credentials: true,
        methods: %i[get post put patch delete options head]
    end
  end