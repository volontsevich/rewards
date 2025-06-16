module Api
  module V1
    class UsersController < ApplicationController
      def balance
        user = User.find(params[:id])
        render json: { user_id: user.id, points_balance: user.points_balance }
      end
    end
  end
end
