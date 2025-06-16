# frozen_string_literal: true

it 'adds points' do
  user = User.create!(email: 'x', points_balance: 0)
  post "/api/v1/users/#{user.id}/earn", params: { points: 150 }
  expect(user.reload.points_balance).to eq 150
end
