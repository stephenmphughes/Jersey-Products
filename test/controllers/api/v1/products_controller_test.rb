require "test_helper"

class Api::V1::ProductsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @product = Product.create(name: "TEST JERSEY", price: 50, available: true)
  end

  test "should get index" do
    get api_v1_products_url
    assert_response :success
  end

  test "should create product" do
    assert_difference("Product.count") do
      post api_v1_products_url, params: {
        product: { name: "NEW TEST JERSEY", price: 50.00, available: true }
      }
    end

    assert_response :created
  end

  test "should update product" do
    patch api_v1_product_url(@product), params: {
      product: { name: "UPDATED TEST JERSEY", price: 50.00, available: true }
    }
    assert_response :success
    @product.reload
    assert_equal "UPDATED TEST JERSEY", @product.name
  end

  test "should delete product" do
    assert_difference("Product.count", -1) do
      delete api_v1_product_url(@product)
    end
    assert_response :no_content
  end
end


# https://guides.rubyonrails.org/testing.html#functional-testing-for-controllers
# https://fosterv222.medium.com/intro-to-testing-with-rails-controller-tests-291237692908
# https://medium.com/@jburdt/basic-unit-testing-ruby-on-rails-62f370d30310