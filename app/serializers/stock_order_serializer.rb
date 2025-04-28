# app/serializers/stock_order_serializer.rb
class StockOrderSerializer
  include FastJsonapi::ObjectSerializer
  attributes :quantity, :sizes, :comment, :product_id
  
  belongs_to :product
  # Add product_name to the serialized output
  attribute :product_name do |object|
    object.product.name if object.product
  end
end
