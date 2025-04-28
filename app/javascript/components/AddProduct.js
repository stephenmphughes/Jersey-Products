// app/javascript/components/AddProduct.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
    image: null, //for file input
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('product[name]', formData.name);
    formDataToSend.append('product[description]', formData.description);
    formDataToSend.append('product[price]', formData.price);
    formDataToSend.append('product[available]', formData.available);
    if (formData.image) {
      formDataToSend.append('product[image]', formData.image);
    }

    await fetch('/api/v1/products', {
      method: 'POST',
      body: formDataToSend,
    });

    alert('Product created successfully!');
    navigate('/products');
  };

  return (
    <div className="container mt-5">
      <img
        src="/assets/BuaLogo.svg"
        className="logoimage d-block mx-auto mb-4"
        alt="logo"
      />

      <h2 className="text-center mb-4 text-white">Add New Jersey</h2>

      <form onSubmit={handleSubmit} className="p-4 rounded stockorder-form" encType="multipart/form-data">
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-white">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label text-white">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label text-white">Price (€)</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label text-white">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* Available Checkbox */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="available"
            id="availableCheckbox"
            className="form-check-input"
            checked={formData.available}
            onChange={handleChange}
          />
          <label htmlFor="availableCheckbox" className="form-check-label text-white">
            Available
          </label>
        </div>

        <button type="submit" className="btn btn-success w-100">Save Jersey</button>
      </form>
    </div>
  );
};

export default AddProduct;
