import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Receipt.css";

const Receipt = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return <p>No order details found.</p>;
  }

  const {
    name,
    email,
    address,
    city,
    zipCode,
    totalItems,
    totalPrice,
    greenDelivery,
    carbonOffset,
    carbonFootprint,
    finalTotal,
  } = orderDetails;

  return (
    <div className="receipt-container">
      <h1>Payment Receipt</h1>
      <div className="receipt-details">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Address:</strong> {address}, {city} - {zipCode}</p>
        <p><strong>Items Ordered:</strong> {totalItems}</p>
        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
        <p><strong>Shipping:</strong> {greenDelivery ? "Green Shipping (Free)" : "Standard ($5.00)"}</p>
        <p><strong>Carbon Offset:</strong> {carbonOffset ? `$${(carbonFootprint * 0.1).toFixed(2)}` : "$0.00"}</p>
        <h2><strong>Final Amount Paid:</strong> ${finalTotal.toFixed(2)}</h2>
      </div>
      <Link to="/" className="btn">Back to Home</Link>
    </div>
  );
};

export default Receipt;
