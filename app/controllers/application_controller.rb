# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  skip_before_action :verify_authenticity_token, if: -> { request.format.json? }

  before_action :ensure_active_storage_works

  private

  def ensure_active_storage_works
    if request.path.starts_with?("/rails/active_storage")
      request.format = :html
    end
  end
end

