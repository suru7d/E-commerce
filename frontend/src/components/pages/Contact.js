import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the form data to a server here
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className="page-container">
      <h1>Contact Us</h1>
      
      <div className="contact-layout">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>
            Have questions about our products or sustainability practices? 
            We'd love to hear from you. Fill out the form or use the contact 
            information below.
          </p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <FaEnvelope className="contact-icon" />
              <div>
                <h3>Email</h3>
                <p>contact@eco-shop.com</p>
              </div>
            </div>
            
            <div className="contact-method">
              <FaPhone className="contact-icon" />
              <div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="contact-method">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <h3>Address</h3>
                <p>123 Green Street<br />Eco City, EC 12345</p>
              </div>
            </div>
          </div>
          
          <div className="eco-note">
            <FaLeaf className="eco-icon" />
            <p>
              Our customer service team works remotely to reduce commuting emissions. 
              We respond to all inquiries within 24 hours.
            </p>
          </div>
        </div>
        
        <div className="contact-form-container">
          {submitted ? (
            <div className="form-success">
              <h2>Thank You!</h2>
              <p>Your message has been sent. We'll get back to you soon.</p>
            </div>
          ) : (
            <>
              <h2>Send a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn">
                  <FaPaperPlane /> Send Message
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;