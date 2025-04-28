import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    
<nav className="navbar navbar-expand-lg" id="custom-navbar">
  <div className="container px-3"> 
    <Link className="navbar-brand" to="/">
      <img src="/assets/NavBarLogo.svg" alt="Logo" className="navbar-logo" />
    </Link>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/orders">Stock Orders</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Navbar;

