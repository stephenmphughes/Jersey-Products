# test/controllers/api/v1/stock_orders_controller_test.rb
require "test_helper"

module Api
  module V1
    class StockOrdersControllerTest < ActionDispatch::IntegrationTest
      setup do
        @product = Product.create!(
          name: "TEST ORDER",
          description: "TEST DESCRIPTION",
          price: 30,
          available: true
        )

        @stock_order = @product.stock_orders.create!(
          quantity: 5,
          sizes: "M,L",
          comment: "ASAP"
        )
      end

      test "should get index" do
        get api_v1_stock_orders_url, as: :json
        assert_response :success
      end

      test "should create stock order" do
        assert_difference('StockOrder.count') do
          post api_v1_stock_orders_url, params: {
            stock_order: {
              product_id: @product.id,
              quantity: 10,
              sizes: "S,M,L",
              comment: "ASAP TEST"
            }
          }, as: :json
        end

        assert_response :created
      end

      test "should delete stock order" do
        assert_difference('StockOrder.count', -1) do
          delete api_v1_stock_order_url(@stock_order), as: :json
        end

        assert_response :no_content
      end
    end
  end
end

# https://guides.rubyonrails.org/testing.html#functional-testing-for-controllers


#https://guides.rubyonrails.org/testing.html#functional-testing-for-controllers