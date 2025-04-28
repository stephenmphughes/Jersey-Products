import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./Products";
import Product from "./Product";
import StockOrders from "./StockOrders";
import Navbar from "./Navbar"; 
import Footer from './Footer';
import AddProduct from './AddProduct';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/orders" element={<StockOrders />} />
          <Route path="/products/new" element={<AddProduct />} />

        </Routes>
        
      </div>
      <Footer />
    </>
  );
};

export default App;