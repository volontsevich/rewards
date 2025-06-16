module Api
  module V1
    class RewardsController < ApplicationController
      def index
        rewards = Reward.all.order(:id)
        render json: rewards.as_json(only: %i[id name description points_cost],
                                     methods: [:in_stock?])
      end
    end
  end
end
