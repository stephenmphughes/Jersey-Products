# config/routes.rb

Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :products do
        resources :stock_orders, only: [] 
      end
      resources :stock_orders, only: [:index, :create, :destroy]      
    end
  end

  # Mount ActiveStorage first
  mount ActiveStorage::Engine => '/rails/active_storage'

  # Catch-all route — put a constraint on it so it skips Active Storage
  get '*path', to: 'pages#index', constraints: lambda { |req|
    !req.path.starts_with?('/rails/active_storage')
  }, via: :all
end
