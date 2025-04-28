# test/integration/products_and_stock_orders_test.rb

require "test_helper"

class ProductsAndStockOrdersTest < ActionDispatch::IntegrationTest
  #this creates product, sends a patch request to update it, and checks if the name was updated
  test "should update a jersey" do
    product = Product.create(name: "Old Jersey update", description: "Old description update", price: 30.0, available: true)
    patch "/api/v1/products/#{product.id}", params: { product: { name: "Updated Jersey" } }
    assert_response :success

    updated_product = Product.find(product.id)
    assert_equal "Updated Jersey", updated_product.name
  end
#creates product, sends delete request and confirms it doesnt exist anymore
  test "should delete a jersey" do
    product = Product.create(name: "Delete Jersey", description: "To delete", price: 20.0, available: true)
    delete "/api/v1/products/#{product.id}"
    assert_response :no_content

    assert_raises(ActiveRecord::RecordNotFound) { Product.find(product.id) }
  end
#creates a product, sends post to stock_orders, checks order was created and belongs to that product
  test "should create a stock order" do
    product = Product.create!(name: "Test Jersey", description: "Test Description", price: 50.0, available: true)

    # Notice: now POST to /api/v1/stock_orders, not /products/:id/stock_orders
    post "/api/v1/stock_orders", params: { stock_order: { product_id: product.id, quantity: 10, sizes: "M,L", comment: "Fast delivery" } }

    assert_response :success

    stock_order = StockOrder.last
    assert_equal product.id, stock_order.product_id
    assert_equal 10, stock_order.quantity
  end
#creates product and stoc order , sends delete request and confirms stock order no onger exists
  test "should delete a stock order" do
    product = Product.create(name: "StockOrderDelete", description: "Stock", price: 40.0, available: true)
    stock_order = StockOrder.create(product_id: product.id, quantity: 5, sizes: "S,M", comment: "Test delete")

    delete "/api/v1/stock_orders/#{stock_order.id}"
    assert_response :no_content

    assert_raises(ActiveRecord::RecordNotFound) { StockOrder.find(stock_order.id) }
  end
end
#https://github.com/ankane/blazer/blob/master/test/queries_test.rb
# https://guides.rubyonrails.org/testing.html#integration-testing