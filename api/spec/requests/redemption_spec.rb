# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Redemptions API', type: :request do
  let!(:user) { User.create!(email: 'demo', points_balance: 1000) }
  let!(:reward) { Reward.create!(name: 'Sticker', points_cost: 200) }

  it 'POST /users/:id/redemptions' do
    post "/api/v1/users/#{user.id}/redemptions", params: { reward_id: reward.id }
    expect(response).to have_http_status(:created)
    expect(user.reload.points_balance).to eq 800
  end
end
