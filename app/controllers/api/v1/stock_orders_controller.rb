# app/controllers/api/v1/stock_orders_controller.rb
module Api
  module V1
    class StockOrdersController < ApplicationController
      # List all stock orders
      def index 
        stock_orders = StockOrder.all.includes(:product) # eager load products to avoid repetitive queries
        render json: StockOrderSerializer.new(stock_orders, include: [:product]) # return stock orders as JSON, using serializer and including associated product
      end

      # Create a new stock order
      def create
        stock_order = StockOrder.new(stock_order_params) # initialize new stock order with form params including product_id

        if stock_order.save
          render json: StockOrderSerializer.new(stock_order), status: :created # if saved, return the stock order as JSON
        else
          render json: { error: stock_order.errors.full_messages }, status: :unprocessable_entity # if not saved, return validation error messages
        end
      end

      # Delete a stock order
      def destroy
        stock_order = StockOrder.find(params[:id]) # find the stock order by id from URL
        stock_order.destroy
        head :no_content # return empty response if successfully deleted
      end

      private

      # Strong params for stock order
      def stock_order_params
        params.require(:stock_order).permit(:product_id, :quantity, :sizes, :comment) # require stock_order object and permit these fields
      end
    end
  end
end


# References
# https://guides.rubyonrails.org/action_controller_overview.html
# https://guides.rubyonrails.org/api_app.html 
# https://edgeguides.rubyonrails.org/action_controller_overview.html#strong-parameters
# https://medium.com/@rail_to_rescue/eager-loading-in-a-ruby-on-rails-3c6aebba49cf#:~:text=Eager%20loading%20is%20a%20way,N%2B1%20query%20problem.%E2%80%9D
