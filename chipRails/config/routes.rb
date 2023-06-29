Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/scripts/linux', to: 'scripts#linux'
  get '/scripts/windows', to: 'scripts#windows'

end
