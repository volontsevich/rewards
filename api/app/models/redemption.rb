# frozen_string_literal: true

class Redemption < ApplicationRecord
  belongs_to :user
  belongs_to :reward
  validates :points_cost, presence: true

  def self.redeem!(user:, reward:)
    raise StandardError, 'Insufficient points' if user.points_balance < reward.points_cost
    raise StandardError, 'Out of stock' unless reward.in_stock?

    transaction do
      user.update!(points_balance: user.points_balance - reward.points_cost)
      reward.update!(stock: reward.stock - 1) if reward.stock
      create!(user:, reward:, points_cost: reward.points_cost)
    end
  end
end
