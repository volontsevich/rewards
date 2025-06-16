class Reward < ApplicationRecord
  has_many :redemptions
  validates :name, :points_cost, presence: true
  validates :points_cost, numericality: { greater_than: 0 }
  validates :stock, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true

  def in_stock?
    stock.nil? || stock.positive?
  end
end
