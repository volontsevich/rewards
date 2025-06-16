module Api
  module V1
    class RewardsController < ApplicationController
      def index
        rewards = Reward.all.order(:id)
        render json: rewards.map { |r|
          r.as_json(only: %i[id name description points_cost])
           .merge(in_stock: r.in_stock?)
        }
      end
    end
  end
end
