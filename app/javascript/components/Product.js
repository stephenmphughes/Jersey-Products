// app/javascript/components/Product.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    available: false,
  });

  useEffect(() => {
    fetch(`/api/v1/products/${id}`) // Fetch product details from backend api
      .then((res) => res.json()) 
      .then((data) => {
        const { attributes } = data.data;
        setProduct(data.data);
        setFormData({
          name: attributes.name,
          description: attributes.description,
          price: attributes.price,
          available: attributes.available,
          image_url: attributes.image_url, //capture image URL
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; //event target the name, value, type and checked
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/v1/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: formData }),
    });
    alert('Your product has been updated');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await fetch(`/api/v1/products/${id}`, {
        method: 'DELETE',
      });
      navigate('/');
    }
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card product-edit-card p-4">

        {/*If image exists, show it. Otherwise fallback to placeholder */}
        {formData.image_url ? (
          <img
            src={formData.image_url.startsWith('/') ? `${window.location.origin}${formData.image_url}` : formData.image_url}
            className="card-img-top"
            alt="jersey"
          />
        ) : (
          <img
            src="/assets/placeholder-jersey.png"
            className="card-img-top"
            alt="placeholder"
          />
        )}

        <h4 className="mb-3 text-white">Edit: {formData.name}</h4>
        
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price (€)</label>
            <input
              type="number"
              name="price"
              className="form-control"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="available"
              className="form-check-input"
              id="availableCheckbox"
              checked={formData.available}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="availableCheckbox">
              Available
            </label>
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary w-50">Update</button>
            <button type="button" className="btn btn-danger w-50" onClick={handleDelete}>Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
