// app/javascript/components/StockOrdersList.js
import React from 'react';

const StockOrdersList = ({ orders, onDelete }) => {
  if (!orders.length) {
    return <p className="text-white mt-5 text-center">No stock orders yet.</p>;
  }

  return (
    <div className="mt-5">
      <h4 className="text-white mb-4">Recent Stock Orders</h4>
      <div className="container">
        {/* Header Row */}
        <div className="row fw-bold text-white mb-2" style={{ borderBottom: '4px solid #00c9a7' }}>
          <div className="col-2">Order #</div>
          <div className="col-3">Product</div>
          <div className="col-2">Quantity</div>
          <div className="col-2">Sizes</div>
          <div className="col-2">Comments</div>
          <div className="col-1">Actions</div>
        </div>

        {/* Orders */}
        {orders.map((order) => (
          <div key={order.id} className="row align-items-center py-3 mb-2 bg-light rounded shadow-sm">
            <div className="col-2 fw-bold">#{order.id}</div>
            <div className="col-3">{order.attributes.product_name || 'Unknown'}</div>
            <div className="col-2">{order.attributes.quantity}</div>
            <div className="col-2">{order.attributes.sizes}</div>
            <div className="col-2">{order.attributes.comment || 'N/A'}</div>
            <div className="col-1">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(order.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockOrdersList;

// https://getbootstrap.com/docs/5.3/layout/grid/