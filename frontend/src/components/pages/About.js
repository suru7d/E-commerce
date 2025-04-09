import React from 'react';
import { FaLeaf, FaRecycle, FaSeedling } from 'react-icons/fa';

const About = () => {
  return (
    <div className="page-container">
      <h1>About Eco Shop</h1>
      
      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          At Eco Shop, we're committed to providing sustainable products while minimizing 
          our digital carbon footprint. Our mission is to make eco-friendly shopping accessible 
          to everyone while demonstrating that technology can be both powerful and environmentally responsible.
        </p>
      </div>
      
      <div className="about-section">
        <h2>Energy-Efficient Website</h2>
        <p>
          Our website is designed with energy efficiency in mind. We've implemented numerous 
          optimizations to reduce power consumption and minimize our carbon footprint:
        </p>
        
        <div className="eco-features">
          <div className="eco-feature">
            <FaLeaf className="eco-icon" />
            <div>
              <h3>Dark Theme by Default</h3>
              <p>Uses less energy on OLED/AMOLED screens</p>
            </div>
          </div>
          
          <div className="eco-feature">
            <FaRecycle className="eco-icon" />
            <div>
              <h3>Optimized Code</h3>
              <p>Minimized animations and transitions to reduce CPU usage</p>
            </div>
          </div>
          
          <div className="eco-feature">
            <FaSeedling className="eco-icon" />
            <div>
              <h3>Efficient Loading</h3>
              <p>Lazy loading and code splitting to reduce data transfer</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="about-section">
        <h2>Our Products</h2>
        <p>
          We carefully select products that meet our sustainability criteria. Each product 
          is evaluated based on its environmental impact, manufacturing process, and recyclability. 
          We provide transparency through our sustainability scores and eco badges.
        </p>
      </div>
      
      <div className="about-section">
        <h2>Join Our Mission</h2>
        <p>
          By shopping with us, you're not just buying products – you're supporting a movement 
          toward more sustainable e-commerce. Together, we can reduce our environmental impact 
          while enjoying quality products.
        </p>
        
        <div className="cta-container">
          <a href="/products" className="btn">Shop Now</a>
          <a href="/contact" className="btn btn-outline">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default About;