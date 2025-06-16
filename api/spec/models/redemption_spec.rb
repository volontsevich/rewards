# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Redemption, type: :model do
  let(:user) { User.create!(email: 't@e.com', points_balance: 500) }
  let(:reward) { Reward.create!(name: 'Mug', points_cost: 300, stock: 1) }

  it 'redeems and deducts points' do
    expect { Redemption.redeem!(user:, reward:) }.to change { user.reload.points_balance }.by(-300)
  end

  it 'raises if insufficient balance' do
    user.update!(points_balance: 100)
    expect { Redemption.redeem!(user:, reward:) }.to raise_error('Insufficient points')
  end
end
