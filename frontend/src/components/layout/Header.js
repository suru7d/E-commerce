import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLeaf,
  FaShoppingCart,
  FaComments,
  FaChartLine,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaTachometerAlt,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

const Header = ({ metrics }) => {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simplified energy class calculation to save CPU cycles
  const getEnergyClass = () => {
    if (!metrics) return "A";

    const score =
      metrics.pageLoads + metrics.apiCalls + metrics.dataTransferred * 0.05;

    if (score < 15) return "A";
    if (score < 30) return "B";
    return "C";
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <FaLeaf />
          <span>Eco Shop</span>
        </Link>

        {/* Energy efficiency badge - now visible */}
       

        {/* Mobile menu toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={closeMobileMenu}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/energy-efficiency" onClick={closeMobileMenu}>
                <FaChartLine />
                <span>Energy</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={closeMobileMenu}>
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/cart" className="cart-icon" onClick={closeMobileMenu}>
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="cart-count">{totalItems}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
