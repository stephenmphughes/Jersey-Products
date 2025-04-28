require "test_helper"

class StockOrderTest < ActiveSupport::TestCase
  test "should not save stock order without quantity" do
    stock_order = StockOrder.new(sizes: "M,L,XL", comment: "Urgent order")
    assert_not stock_order.save, "Saved the stock order without quantity"
  end

  test "should save valid stock order" do
    product = Product.create(name: "Sample test Jersey", price: 100, available: true)

    stock_order = StockOrder.new(
      product: product,
      quantity: 10,
      sizes: "M,L",
      comment: "Priority delivery"
    )

    assert stock_order.save
  end
end

# https://guides.rubyonrails.org/testing.html?utm_source=chatgpt.com#test-helpers
