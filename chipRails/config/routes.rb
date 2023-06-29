Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root to: "home#index"
  # opens up /sboms (GET [all, :id], PUT, DELETE)
  # opens up /sboms/:id/metadata (GET)
  # opens up /sboms/:id/dependencies (GET[all, ;id], DELETE)
  resources :sboms, shallow: true do
    resources :metadata, only: [:index]
    resources :dependencies, only: [:index]
    resources :vulnerabilities, only: [:index]
    resources :children, only: [:index]
  end
  get 'vulnerabilities_all', to: 'vulnerabilities#all'

  get '/sboms_all', to: 'sboms#all'
  delete '/sboms_all', to: 'sboms#all'

  # opens up /dependencies for all dependencies
  get '/dependencies', to: 'dependencies#all'

  # get '/children_all', to: 'children#all'
  get '/children/:id/tree', to: 'children#tree'
  # opens up /dependencies/:id/licenses (GET)
  # opens up /dependencies/:id/sub_components
  resources :dependencies, shallow: true do
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

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks"}
end
