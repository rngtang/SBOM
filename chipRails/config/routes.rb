Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  # opens up /sboms (GET [all, :id], PUT, DELETE)
  # opens up /sboms/:id/metadata (GET)
  # opens up /sboms/:id/sbomComponents (GET[all, ;id], DELETE)
  resources :sboms, shallow: true do
    resources :metadata, only: [:index]
    resources :sbomComponents, only: [:index]
    resources :vulnerabilities, only: [:index]
    resources :dependencyren, only: [:index]
  end
  get 'vulnerabilities_all', to: 'vulnerabilities#all'

  get '/sboms_all', to: 'sboms#all'
  delete '/sboms_all', to: 'sboms#all'

  # opens up /sbomComponents for all sbomComponents
  get '/sbomComponents', to: 'sbomComponents#all'

  # get '/dependency_all', to: 'dependency#all'
  get '/dependency/:id/tree', to: 'dependency#tree'
  # opens up /sbomComponents/:id/licenses (GET)
  # opens up /sbomComponents/:id/sub_components
  resources :sbomComponents, shallow: true do
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
  
end
