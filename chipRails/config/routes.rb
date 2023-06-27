Rails.application.routes.draw do
  resources :references
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"
  resource :sessions, only: [:create, :destroy]
  post '/Shibboleth.sso/SAML2/POST', to: 'sessions#create'
end
