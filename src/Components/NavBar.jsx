import React from 'react';
import './Navbar.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">News</Link>
        <Link to="/weather">Weather Info</Link>
      </div>
    </nav>
  );
};

export default Navbar;
