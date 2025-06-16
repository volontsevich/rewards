# frozen_string_literal: true

module Api
  module V1
    class RedemptionsController < ApplicationController
      before_action :set_user

      def index
        render json: @user.redemptions
                          .includes(:reward)
                          .order(created_at: :desc)
                          .map { |r| present(r) }
      end

      def create
        reward = Reward.find(params[:reward_id])
        redemption = Redemption.redeem!(user: @user, reward:)
        render json: { redemption_id: redemption.id,
                       new_balance: @user.points_balance },
               status: :created
      rescue StandardError => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      private

      def set_user
        @user = User.find(params[:user_id])
      end

      def present(redemption)
        {
          id: redemption.id,
          reward: redemption.reward.name,
          points_cost: redemption.points_cost,
          redeemed_at: redemption.created_at.iso8601
        }
      end
    end
  end
end
