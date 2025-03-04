import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";
import logo from "../assets/logo.jpg"; // Ensure this path is correct

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Project B Logo" className="logo-image" />
      </div>
      
      <div className="mobile-menu-icon" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/home" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
        <li><Link to="/hivehealth" onClick={toggleMenu}>Hive Health</Link></li>
        <li><Link to="/reports" onClick={toggleMenu}>Reports</Link></li>
        <li><Link to="/predictive-analysis" onClick={toggleMenu}>Predictive Analysis</Link></li>
      </ul>
      <div className="bee">🐝</div>
    </nav>
  );
};

export default Navbar;