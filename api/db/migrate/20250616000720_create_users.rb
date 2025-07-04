# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.integer :points_balance, null: false, default: 0

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
