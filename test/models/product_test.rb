require "test_helper"

class ProductTest < ActiveSupport::TestCase
  test "should not save product without name" do
    product = Product.new(price: 10, available: true)
    assert_not product.save, "Saved the product without a name"
  end

  test "should save valid product" do
    product = Product.new(name: "Jersey", price: 10, available: true)
    assert product.save
  end
end
# test/models/product_test.rb
# https://guides.rubyonrails.org/testing.html?utm_source=chatgpt.com#test-helpers