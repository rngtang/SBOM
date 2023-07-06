Rails.application.routes.draw do
  resources :references
  root "articles#index"

  resource :sessions, only: [:create, :destroy]

  post '/saml/acs', to: 'saml#acs'
  post '/Shibboleth.sso/saml/consume', to: 'sessions#create'
  
  get '/current_user', to: 'current_user#index'
end
