class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.decimal :price
      t.boolean :available, default: true
      t.string :sizes, array: true, default: []

      t.timestamps
    end
  end
end

