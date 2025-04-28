// app/javascript/components/Products.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch('/api/v1/products');
    const data = await res.json();
    setProducts(data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await fetch(`/api/v1/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  return (
    <div className="container-fluid px-4 mt-5">
      <img src="/assets/BuaLogo.svg" className="logoimage d-block mx-auto mb-4" alt="logo" />

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h2 className="text-white m-0">Jersey Stock Overview</h2>
        <Link to="/products/new" className="btn btn-success">Create New Jersey</Link>
      </div>

      <div className="row g-4">
        {products.map((prod) => {
          const fullImageUrl = prod.attributes.image_url
            ? `${window.location.origin}${prod.attributes.image_url}`
            : null;

          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={prod.id}>
              <div className="card custom-jersey-card h-100 shadow">
                {fullImageUrl && (
                  <img
                    src={fullImageUrl}
                    className="card-img-top"
                    alt="jersey"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{prod.attributes.name}</h5>
                  <p className="card-text">{prod.attributes.description}</p>
                  <p className="card-text"><strong>€{prod.attributes.price}</strong></p>
                  <span className={`badge ${prod.attributes.available ? 'bg-success' : 'bg-secondary'}`}>
                    {prod.attributes.available ? 'Available' : 'Out of Stock'}
                  </span>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <Link to={`/products/${prod.id}`} className="btn btn-primary btn-sm">Edit</Link>
                  <button onClick={() => handleDelete(prod.id)} className="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;

// https://getbootstrap.com/docs/4.0/components/card/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals