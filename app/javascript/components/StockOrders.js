// app/javascript/components/StockOrders.js
import React, { useState, useEffect } from 'react';
import StockOrdersList from './StockOrdersList';

const StockOrders = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    sizes: '',
    comment: '',
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/v1/products');
    const data = await res.json();
    setProducts(data.data);
  };

  const fetchOrders = async () => {
    const res = await fetch('/api/v1/stock_orders');
    const data = await res.json();
    setOrders(data.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.productId) {
      alert('Please select a product.');
      return;
    }

    await fetch('/api/v1/stock_orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stock_order: {
          product_id: formData.productId,
          quantity: formData.quantity,
          sizes: formData.sizes,
          comment: formData.comment
        }
      }),
    });

    setFormData({ productId: '', quantity: '', sizes: '', comment: '' });
    fetchOrders(); // refresh orders after creating
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      await fetch(`/api/v1/stock_orders/${orderId}`, { method: 'DELETE' });
      fetchOrders(); // refresh orders after deletion
    }
  };

  return (
    <div className="container mt-5">
      <img src="/assets/BuaLogo.svg" className="logoimage d-block mx-auto mb-4" alt="logo" />

      <h2 className="text-center mb-4 text-white">Create Stock Order</h2>

      <form onSubmit={handleSubmit} className="stockorder-form p-4 rounded">
        <div className="mb-3">
          <label className="form-label text-white" htmlFor="productId">Select Jersey</label>
          <select
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">- Choose Jersey for Order -</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.attributes.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label text-white" htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            className="form-control"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white" htmlFor="sizes">Sizes</label>
          <input
            id="sizes"
            type="text"
            name="sizes"
            className="form-control"
            placeholder="e.g., S, M, L, XL"
            value={formData.sizes}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white" htmlFor="comment">Comments</label>
          <textarea
            id="comment"
            name="comment"
            className="form-control"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Add Stock Order</button>
      </form>

      <StockOrdersList orders={orders} onDelete={handleDelete} />
    </div>
  );
};

export default StockOrders;



// https://devmoran.hashnode.dev/handling-crud-operations-with-react-hooks-and-fetch-api-a-hands-on-lab
// https://www.digitalocean.com/community/tutorials/react-crud-context-hooks