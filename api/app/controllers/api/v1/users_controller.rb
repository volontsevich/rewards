# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      def balance
        user = User.find(params[:id])
        render json: { user_id: user.id, points_balance: user.points_balance }
      end

      def earn
        user  = User.find(params[:id])
        pts   = params[:points].to_i.clamp(1, 10_000)
        user.update!(points_balance: user.points_balance + pts)
        render json: { user_id: user.id, new_balance: user.points_balance }, status: :created
      end
    end
  end
end
