# This migration comes from active_storage (originally 20170806125915)
# The purpose of this file is to add active storages to 2 tables in my app: blobs + attatchements
class CreateActiveStorageTables < ActiveRecord::Migration[7.0]
  def change
    # Use Active Record's configured type for primary and foreign keys
    primary_key_type, foreign_key_type = primary_and_foreign_key_types #asks if bigint or uuid will be used

    #TABLE 1: ACTIVE STORAGE BLOBS   
    create_table :active_storage_blobs, id: primary_key_type do |t| #creates table active_storage_blobs with ID of type primary_key_type
      t.string   :key,          null: false #key is a string and cannot be null
      t.string   :filename,     null: false #filename is a string and cannot be null eg "newjersey.png"
      t.string   :content_type #optional 
      t.text     :metadata #metadata text field for addition info
      t.string   :service_name, null: false #each file must belong to service/ either locally or on cloud (S3)
      t.bigint   :byte_size,    null: false #file size in bytes
      t.string   :checksum #checksum for file integrity
# Timestamp for database to organise and sort files
      if connection.supports_datetime_with_precision?
        t.datetime :created_at, precision: 6, null: false
      else
        t.datetime :created_at, null: false
      end

      t.index [ :key ], unique: true #adds a uniqie index/ on key making sure no two blobs share the same key ***
    end

    #TABLE 2: ACTIVE STORAGE ATTATCHMENTS    
    create_table :active_storage_attachments, id: primary_key_type do |t| #creates table with ID of type primary_key_type that links records to blobs
      t.string     :name,     null: false #column for name of the attatchment
      t.references :record,   null: false, polymorphic: true, index: false, type: foreign_key_type #polymorphic association to link to any model *********
      t.references :blob,     null: false, type: foreign_key_type #blob id reference showing which blob the attatchment is linked to

#Timestamp , with or without precision depending on database support
      if connection.supports_datetime_with_precision?
        t.datetime :created_at, precision: 6, null: false
      else
        t.datetime :created_at, null: false
      end

      t.index [ :record_type, :record_id, :name, :blob_id ], name: :index_active_storage_attachments_uniqueness, unique: true
      t.foreign_key :active_storage_blobs, column: :blob_id
    end

#3rd TABLE: ACTIVE STORAGE VARIANT RECORDS, if using image variants like thumbnails (not currently)
    create_table :active_storage_variant_records, id: primary_key_type do |t|
      t.belongs_to :blob, null: false, index: false, type: foreign_key_type
      t.string :variation_digest, null: false #hash describing the variation

      t.index [ :blob_id, :variation_digest ], name: :index_active_storage_variant_records_uniqueness, unique: true #unique index so same variation is not duplicated
      t.foreign_key :active_storage_blobs, column: :blob_id #foreign key linking to the blobs table
    end
  end

  private #method to figure out the primary and foreign key types based on the Rails configuration
    def primary_and_foreign_key_types
      config = Rails.configuration.generators #access the Rails generator settings
      setting = config.options[config.orm][:primary_key_type] #check what is preferred primary key type
      primary_key_type = setting || :primary_key 
      foreign_key_type = setting || :bigint
      [primary_key_type, foreign_key_type]
    end
end

# 1. bin/rails active_storage:install
# 2. https://guides.rubyonrails.org/active_record_migrations.html
