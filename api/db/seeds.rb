# frozen_string_literal: true

User.find_or_create_by!(email: 'volontsevich@gmail.com') do |user|
  user.points_balance = 5000
end

Reward.create!([
                 { name: 'Coffee Mug', description: 'Ceramic, 11 oz', points_cost: 500, stock: 100 },
                 { name: 'T-Shirt', description: 'Size M', points_cost: 1500, stock: 50 },
                 { name: 'Sticker Pack', description: '5 pcs', points_cost: 200, stock: nil }
               ])
