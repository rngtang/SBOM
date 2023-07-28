Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  # opens up /sboms (GET [all, :id], PUT, DELETE)
  # opens up /sboms/:id/metadata (GET)

  # opens up /sboms/:id/sbom_components (GET[all, :id], DELETE all)
  # why delete for sbom_components 
  resources :sboms, shallow: true do
    resources :metadata, only: [:index]
    resources :sbom_components, only: [:index]
    resources :vulnerabilities, only: [:index]
    resources :dependencies, only: [:index]
  end

  # really just a GET request, if try to delete will instead redirect to just showing all sboms
  delete '/sboms', to: 'sboms#index'

  # change sbom archive parameter to true so it no longer displays in accordion
  get '/sboms/:id/archive', to: 'sboms#archive'

  # opens up /sbom_components/:id/sub_components
  resources :sbom_components, shallow: true do
    resources :licenses, only: [:index]
    resources :properties, only: [:index]
    # resources :externalReferences, only: [:index]
  end

  resources :metadata, shallow: true do
    resources :tools, only: [:index]
    resources :components, only: [:index]
  end

  resources :vulnerabilities, shallow: true do
    resources :ratings, only: [:index]
  end
  resources :ratings, shallow: true do
    resources :sources, only: [:index]
  end

  # finds dependencies to make tree with
  get '/dependencies/:id/tree', to: 'dependencies#tree'
  # creates dependency tree with all dependencies
  get '/sboms/:sbom_id/dependencies_tree', to: 'dependencies#dependencies_tree'

  resources :users, shallow: true do
    resources :sboms
  end
  # really just a GET request, if try to delete will instead redirect to just showing all users
  delete '/users', to: 'users#index'
  
  # routes for fast accordion building 
  get '/users/:user_id/sbom_names', to: 'sboms#sbomNames'
  get '/users/:user_id/sbom_top', to: 'sboms#sbomTop'

  # routes for generating an SBOM
  get '/scripts/linux', to: 'scripts#linux'
  get '/scripts/windows', to: 'scripts#windows'
  get '/scripts/mac', to: 'scripts#mac'

  # routes for authentication
  resources :sessions, only: [:new, :create, :destroy]
  post '/saml/consume', to: 'sessions#create'
  get '/current_user', to: 'sessions#index' 
  get '/destroy', to: 'sessions#destroy'

end
