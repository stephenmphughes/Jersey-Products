class Product < ApplicationRecord
  has_many :stock_orders, dependent: :destroy
  has_one_attached :image #this enables image uploads
  validates :name, presence: true
end
