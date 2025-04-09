import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

// Energy-efficient practice: Use lazy loading for all components
// This reduces initial bundle size and saves energy on page load
const ProductList = lazy(() => import("./components/products/ProductList"));
const ProductDetail = lazy(() => import("./components/products/ProductDetail"));
const Cart = lazy(() => import("./components/cart/Cart"));
const Checkout = lazy(() => import("./components/cart/Checkout"));
const Receipt = lazy(() => import("./components/cart/Receipt"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const GreenMetrics = lazy(() => import("./components/dashboard/GreenMetrics"));
const SustainableChat = lazy(() => import("./components/chat/SustainableChat"));

// We'll need to create these new page components

// Simple energy-efficient loading component
const EcoLoading = () => (
  <div className="eco-loading">
    <div className="eco-loading-spinner"></div>
    <p>Loading efficiently...</p>
  </div>
);

function App() {
  // Energy-efficient practice: Track and display energy consumption metrics
  const [resourceMetrics, setResourceMetrics] = useState({
    pageLoads: 0,
    apiCalls: 0,
    dataTransferred: 0, // in KB
  });

  useEffect(() => {
    // Increment page load counter
    setResourceMetrics((prev) => ({
      ...prev,
      pageLoads: prev.pageLoads + 1,
    }));

    // Log metrics for energy-efficient software monitoring
    console.log("Energy-Efficient E-commerce App initialized");

    // Clean up event listeners on unmount to prevent memory leaks
    return () => {
      console.log("App cleanup performed");
    };
  }, []);

  // Intercept API calls to track metrics
  const trackApiCall = (size = 1) => {
    setResourceMetrics((prev) => ({
      ...prev,
      apiCalls: prev.apiCalls + 1,
      dataTransferred: prev.dataTransferred + size,
    }));
  };

  return (
    <ThemeProvider>
      <Router>
        <CartProvider>
          <div className="app-container">
            <Header metrics={resourceMetrics} />

            <div className="app-layout">
              {/* Sidebar for navigation on larger screens */}
              <aside className="app-sidebar">
                <nav className="sidebar-nav">
                  <ul>
                    <li>
                      <a href="/">Products</a>
                    </li>
                    <li>
                      <a href="/energy-efficiency">Energy Efficiency</a>
                    </li>
                    <li>
                      <a href="/dashboard">Dashboard</a>
                    </li>
                    <li>
                      <a href="/about">About</a>
                    </li>
                  </ul>
                </nav>

                {/* Energy usage metrics display */}
                <div className="energy-metrics-widget">
                  <h3>Energy Usage</h3>
                  <p>Page Loads: {resourceMetrics.pageLoads}</p>
                  <p>API Calls: {resourceMetrics.apiCalls}</p>
                  <p>Data: {resourceMetrics.dataTransferred.toFixed(2)} KB</p>
                </div>
              </aside>

              <main className="main-content">
                <Suspense fallback={<EcoLoading />}>
                  <Routes>
                    {/* Product routes */}
                    <Route
                      path="/"
                      element={<ProductList onApiCall={trackApiCall} />}
                    />
                    <Route
                      path="/products"
                      element={<Navigate to="/" replace />}
                    />
                    <Route
                      path="/product/:id"
                      element={<ProductDetail onApiCall={trackApiCall} />}
                    />

                    {/* Cart routes */}
                    <Route
                      path="/cart"
                      element={<Cart onApiCall={trackApiCall} />}
                    />
                    <Route
                      path="/checkout"
                      element={<Checkout onApiCall={trackApiCall} />}
                    />
                    <Route path="/receipt" element={<Receipt />} />

                    {/* Dashboard routes */}
                    <Route
                      path="/dashboard"
                      element={<Dashboard metrics={resourceMetrics} />}
                    />
                    <Route path="/green-metrics" element={<GreenMetrics />} />
                    <Route
                      path="/energy-efficiency"
                      element={<GreenMetrics />}
                    />

                    {/* Chat route */}
                    <Route
                      path="/chat"
                      element={<SustainableChat onApiCall={trackApiCall} />}
                    />

                    {/* New routes */}
                    <Route
                      path="/about"
                      element={
                        <div className="placeholder-page">
                          <h1>About Us</h1>
                          <p>
                            We are committed to energy-efficient e-commerce.
                          </p>
                        </div>
                      }
                    />
                    <Route
                      path="/contact"
                      element={
                        <div className="placeholder-page">
                          <h1>Contact Us</h1>
                          <p>Email: contact@eco-shop.com</p>
                        </div>
                      }
                    />

                    {/* 404 route */}
                    <Route
                      path="*"
                      element={
                        <div className="placeholder-page">
                          <h1>Page Not Found</h1>
                          <p>
                            The page you're looking for doesn't exist or has
                            been moved.
                          </p>
                        </div>
                      }
                    />
                  </Routes>
                </Suspense>
              </main>
            </div>

            <Footer />
          </div>
        </CartProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
