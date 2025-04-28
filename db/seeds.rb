# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
products = Product.create([
  {
    name: "Yellow Tiger Stripe",
    description: "A vibrant yellow jersey with tiger stripe pattern.",
    price: 49.99,
    available: true
  },
  {
    name: "Royal Blue",
    description: "Classic royal blue jersey for elite teams.",
    price: 44.99,
    available: true
  },
  {
    name: "Bright Red",
    description: "Bold red design, perfect for away games.",
    price: 42.99,
    available: true
  },
  {
    name: "Sky Blue",
    description: "Soft sky blue jersey with breathable fabric.",
    price: 45.50,
    available: true
  }
])

stock_orders = StockOrder.create([
  {
    quantity: 10,
    sizes: "M,L,XL",
    comment: "First bulk order for Sky Blue",
    product: products.last
  },
  {
    quantity: 5,
    sizes: "S,M",
    comment: "Urgent restock",
    product: products.first
  }
])
