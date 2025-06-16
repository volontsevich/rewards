# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [] do
        member do
          get :balance
          post :earn
        end
        resources :redemptions, only: %i[index create]
      end
      resources :rewards, only: :index
    end
  end
end
