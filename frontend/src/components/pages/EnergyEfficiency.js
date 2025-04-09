import React from 'react';
import { FaBatteryFull, FaMobileAlt, FaServer, FaCode, FaLightbulb, FaLeaf } from 'react-icons/fa';

const EnergyEfficiency = () => {
  return (
    <div className="page-container">
      <h1>Energy Efficiency</h1>
      
      <div className="intro-section">
        <p>
          At Eco Shop, we're committed to reducing our digital carbon footprint. 
          Our website is designed to consume less energy while providing a great user experience.
        </p>
      </div>
      
      <div className="energy-stats">
        <div className="energy-stat-card">
          <h3>Energy Rating</h3>
          <div className="energy-rating">A</div>
          <p>Our website is optimized to use minimal resources</p>
        </div>
        
        <div className="energy-stat-card">
          <h3>CO₂ Saved</h3>
          <div className="energy-value">~0.8g</div>
          <p>Per page view compared to average e-commerce sites</p>
        </div>
        
        <div className="energy-stat-card">
          <h3>Data Transfer</h3>
          <div className="energy-value">~60%</div>
          <p>Less data transferred than typical e-commerce sites</p>
        </div>
      </div>
      
      <h2>How We Save Energy</h2>
      
      <div className="energy-features">
        <div className="energy-feature">
          <FaBatteryFull className="feature-icon" />
          <div>
            <h3>Dark Theme by Default</h3>
            <p>
              Our dark theme uses predominantly dark colors which consume significantly less 
              power on OLED and AMOLED screens found in most modern devices. This can save 
              up to 30% of screen energy usage.
            </p>
          </div>
        </div>
        
        <div className="energy-feature">
          <FaMobileAlt className="feature-icon" />
          <div>
            <h3>Minimal Animations</h3>
            <p>
              We've reduced animations and transitions to the essential minimum. 
              This decreases CPU and GPU usage, extending battery life on mobile devices 
              and reducing energy consumption on all platforms.
            </p>
          </div>
        </div>
        
        <div className="energy-feature">
          <FaServer className="feature-icon" />
          <div>
            <h3>Efficient Loading</h3>
            <p>
              We use code splitting and lazy loading to reduce initial load size. 
              Components are only loaded when needed, reducing data transfer and 
              server energy consumption.
            </p>
          </div>
        </div>
        
        <div className="energy-feature">
          <FaCode className="feature-icon" />
          <div>
            <h3>Optimized Code</h3>
            <p>
              Our codebase is optimized for efficiency with simplified CSS, 
              reduced JavaScript execution, and efficient rendering patterns 
              that minimize CPU usage.
            </p>
          </div>
        </div>
        
        <div className="energy-feature">
          <FaLightbulb className="feature-icon" />
          <div>
            <h3>Reduced Contrast</h3>
            <p>
              We use slightly reduced contrast ratios (while maintaining accessibility) 
              to decrease screen brightness requirements, further reducing energy consumption 
              on all display types.
            </p>
          </div>
        </div>
        
        <div className="energy-feature">
          <FaLeaf className="feature-icon" />
          <div>
            <h3>Simplified UI</h3>
            <p>
              Our user interface is intentionally simple and focused, reducing the 
              computational resources needed to render pages and interact with the site.
            </p>
          </div>
        </div>
      </div>
      
      <div className="energy-impact">
        <h2>Why This Matters</h2>
        <p>
          The internet consumes about 10% of global electricity. By implementing energy-efficient 
          web design, we can collectively make a significant impact on reducing carbon emissions. 
          If all websites adopted similar practices, we could save millions of tons of CO₂ annually.
        </p>
        
        <div className="cta-container">
          <a href="/products" className="btn">Browse Our Eco Products</a>
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiency;