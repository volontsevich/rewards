# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Earn points API', type: :request do
  let!(:user) { User.create!(email: 'demo', points_balance: 0) }

  it 'adds points' do
    post "/api/v1/users/#{user.id}/earn", params: { points: 150 }
    expect(response).to have_http_status(:created)
    expect(user.reload.points_balance).to eq 150
  end

  it 'caps absurd numbers' do
    post "/api/v1/users/#{user.id}/earn", params: { points: 1_000_000 }
    expect(user.reload.points_balance).to eq 10_000
  end
end
