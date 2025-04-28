# app/serializers/product_serializer.rb
class ProductSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :description, :price, :available

  has_many :stock_orders

  attribute :image_url do |object|
    if object.image.attached?
      # Change from rails_storage_proxy_path to rails_blob_path
      Rails.application.routes.url_helpers.rails_blob_path(object.image, only_path: true)
    end
  end
end


#https://www.nopio.com/blog/upload-files-with-rails-active-storage/
#https://hackernoon.com/how-to-upload-an-image-from-react-to-the-rails-api-using-react-hook-form-and-context-api