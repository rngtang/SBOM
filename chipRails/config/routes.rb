Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  # opens up /sboms (GET [all, :id], PUT, DELETE)
  # opens up /sboms/:id/metadata (GET)
  # opens up /sboms/:id/dependencies (GET[all, ;id], DELETE)
  resources :sboms, shallow: true do
    resources :metadata, only: [:index]
    resources :dependencies, only: [:index, :show]
  end
  

  get '/sboms_all', to: 'sboms#all'
  delete '/sboms_all', to: 'sboms#all'

  # opens up /dependencies for all dependencies
  get '/dependencies', to: 'dependencies#all'

  # opens up /dependencies/:id/licenses (GET)
  # opens up /dependencies/:id/sub_components
  resources :dependencies, shallow: true do
    resources :licenses, only: [:index]
    resources :sub_components, only: [:index]
    resources :properties, only: [:index]
  end

  resources :metadata, shallow: true do
    resources :tools, only: [:index]
    resources :components, only: [:index]
  end

  resources :users, shallow: true do
    resources :sboms
  end
  delete '/users', to: 'users#index'
  
end
