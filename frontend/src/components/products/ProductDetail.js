import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaLeaf, FaShoppingCart, FaRecycle } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import axiosInstance from "../../utils/axiosConfig";
import "./ProductDetail.css";

const ProductDetail = ({ onApiCall }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;

    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/api/products/${id}`);

        if (isMounted) {
          setProduct(response.data.data);
          setError(null);
          if (onApiCall) onApiCall(1);
        }
      } catch (err) {
        console.error("Error:", err);
        if (isMounted && err.name !== "CanceledError") {
          setError("Error loading product details");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProductDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <div className="product-detail">
        <div className="product-image-container">
          <img
            src={
              product.image ||
              `https://via.placeholder.com/600x400?text=${encodeURIComponent(
                product.name
              )}`
            }
            alt={product.name}
            className="product-detail-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(
                product.name
              )}`;
            }}
          />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>

          <div className="sustainability-metrics">
            <div className="sustainability-score">
              <span>Sustainability Score:</span>
              <div className="score-bar">
                <div
                  className="score-fill"
                  style={{ width: `${product.sustainabilityScore}%` }}
                ></div>
              </div>
              <span>{product.sustainabilityScore}%</span>
            </div>

            <div className="carbon-footprint">
              <FaLeaf className="icon" />
              <span>Carbon Footprint: {product.carbonFootprint}kg CO2e</span>
            </div>

            {product.recycledMaterials && (
              <div className="eco-badge">
                <FaRecycle />
                <span>Made with recycled materials</span>
              </div>
            )}
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>

      {/* Recommendations Section */}
      {product.recommendations && product.recommendations.length > 0 && (
        <div className="recommendations-section">
          <h2>You might also like</h2>
          <div className="recommendations-grid">
            {product.recommendations.map((rec) => (
              <Link
                to={`/product/${rec._id}`}
                key={rec._id}
                className="recommendation-card"
              >
                <img
                  src={
                    rec.image ||
                    `https://via.placeholder.com/200x150?text=${encodeURIComponent(
                      rec.name
                    )}`
                  }
                  alt={rec.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/200x150?text=${encodeURIComponent(
                      rec.name
                    )}`;
                  }}
                />
                <div className="recommendation-info">
                  <h3>{rec.name}</h3>
                  <p>${rec.price.toFixed(2)}</p>
                  <div className="eco-badge small">
                    <FaLeaf />
                    <span>{rec.sustainabilityScore}%</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
