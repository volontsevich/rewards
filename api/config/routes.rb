Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [] do
        member { get :balance }                 # /api/v1/users/:id/balance
        resources :redemptions, only: %i[index create]
      end
      resources :rewards, only: :index
    end
  end
end
