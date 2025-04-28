require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module JerseyProducts
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w(assets tasks))

    # This ensures `url_for` and `rails_blob_path` etc. work correctly * MAY NEED CHANGING IN DEPOYMENT
    Rails.application.routes.default_url_options = { host: 'localhost', port: 3000 }

    # This fixes ActiveStorage serving images (No more 406 errors as found in console)
    config.action_dispatch.rescue_responses["ActiveStorage::FileNotFoundError"] = :not_found
    config.active_storage.resolve_model_to_route = :rails_storage_proxy

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
