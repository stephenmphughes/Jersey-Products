class CreateStockOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :stock_orders do |t|
      t.integer :quantity
      t.string :sizes
      t.text :comment
      t.references :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end
