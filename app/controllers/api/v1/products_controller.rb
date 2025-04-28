class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  # GET /api/v1/products
  def index
    products = Product.all
    render json: ProductSerializer.new(products)
  end

  # GET /api/v1/products/:id
  def show
    render json: ProductSerializer.new(@product)
  end

  # POST /api/v1/products
  def create
    product = Product.new(product_params)
    if product.save
      render json: ProductSerializer.new(product), status: :created
    else
      render json: { errors: product.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/products/:id
  def update
    if @product.update(product_params)
      render json: ProductSerializer.new(@product)
    else
      render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/products/:id
  def destroy
    @product.destroy
    head :no_content
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  # Permit : image param so it can be attached via FormData
  def product_params
    params.require(:product).permit(:name, :description, :price, :available, :image)
  end
end

  
  #References
  # https://guides.rubyonrails.org/action_controller_overview.html
  # https://guides.rubyonrails.org/api_app.html 
  # https://edgeguides.rubyonrails.org/action_controller_overview.html#strong-parameters
  # https://www.nopio.com/blog/upload-files-with-rails-active-storage/
