Rails.application.routes.draw do
  resources :references
  root "articles#index"

  # resources :sessions, only: [:new, :create, :destroy] 
  post '/saml/consume', to: 'saml#acs'
  # post '/Shibboleth.sso/saml/consume', to: 'sessions#create' 
  # post '/saml/consume', to: 'sessions#create'
  
  get '/current_user', to: 'current_user#index'
end
