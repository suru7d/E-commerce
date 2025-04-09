import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="page-container">
      <div className="not-found-container">
        <FaExclamationTriangle className="not-found-icon" />
        
        <h1>404 - Page Not Found</h1>
        
        <p className="not-found-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="not-found-suggestions">
          <p>You might want to:</p>
          <ul>
            <li>Check the URL for typos</li>
            <li>Go back to the previous page</li>
            <li>Visit our homepage</li>
            <li>Browse our products</li>
          </ul>
        </div>
        
        <div className="not-found-actions">
          <Link to="/" className="btn">
            <FaHome /> Go to Homepage
          </Link>
          
          <Link to="/products" className="btn btn-outline">
            <FaSearch /> Browse Products
          </Link>
        </div>
        
        <div className="eco-note">
          <p>
            This lightweight 404 page uses minimal resources to save energy.
            Every bit counts in reducing our digital carbon footprint!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;