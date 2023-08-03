Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  # opens up /sboms (GET [all, :id], PUT, DELETE)
  # opens up /sboms/:id/metadata (GET)
  # opens up /sboms/:id/sbom_components (GET[all, ;id], DELETE)
  resources :sboms, shallow: true do
    resources :metadata, only: [:index]
    resources :sbom_components, only: [:index]
    resources :vulnerabilities, only: [:index]
    resources :dependencies, only: [:index]
  end

  delete '/sboms', to: 'sboms#index'

  get '/dependencies/:id/tree', to: 'dependencies#tree'

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

  resources :users, shallow: true do
    resources :sboms
  end
  
  delete '/users', to: 'users#index'

  get '/sboms/:id/archive', to: 'sboms#archive'
  get '/sboms/:id/namedesc', to: 'sboms#namedesc'
  get '/sboms/:sbom_id/dependencies_tree', to: 'dependencies#dependencies_tree'
  
  get '/users/:user_id/sbom_names', to: 'sboms#sbomNames'
  get '/users/:user_id/sbom_top', to: 'sboms#sbomTop'

  get '/sboms/:sbom_id/vuln_affected', to: 'vulnerabilities#vulnaffected'

  get '/scripts/linux', to: 'scripts#linux'
  get '/scripts/windows', to: 'scripts#windows'
  get '/scripts/mac', to: 'scripts#mac'
  get 'scripts/docker', to: 'scripts#docker'

  # root "articles#index"

  resources :sessions, only: [:new, :create, :destroy]
  post '/saml/consume', to: 'sessions#create'
  get '/current_user', to: 'sessions#index' 
  get '/destroy', to: 'sessions#destroy'

  get '/sboms/:sbom_id/vuln_trace', to: 'vulnerabilities#vuln_trace'

end
