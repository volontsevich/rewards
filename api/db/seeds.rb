# frozen_string_literal: true

User.find_or_create_by!(email: 'volontsevich@gmail.com') do |user|
  user.points_balance = 5000
end

REWARDS = [
  { name: 'Coffee Mug',  description: 'Ceramic, 11 oz',      points_cost: 500, stock: 100 },
  { name: 'T-Shirt',     description: 'Size M (unisex)',     points_cost: 500, stock: 100 },
  { name: 'Sticker Pack', description: 'Sticky & gluey fun!', points_cost: 200, stock: 2 }
].freeze

REWARDS.each do |attrs|
  Reward.find_or_create_by!(name: attrs[:name]) do |reward|
    reward.assign_attributes(attrs)
  end
end
