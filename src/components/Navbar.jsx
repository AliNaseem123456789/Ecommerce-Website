import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaStar,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaHome,
  FaStore,
  FaTimes,
} from "react-icons/fa";
import { supabase } from "../pages/SupabaseClient";
import logo from "../assets/Logos/logo2.png";

function Navbar() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // total quantity of cart items

  // Detect window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch cart total quantity
  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    const { data, error } = await supabase
      .from("cart_items")
      .select("quantity")
      .eq("user_id", 1); // replace 1 with dynamic user id if needed

    if (!error && data) {
      const totalQty = data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQty);
    }
  };

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      {/* Desktop Navbar */}
      {!isMobile && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 20px",
              backgroundColor: "white",
              boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img src={logo} alt="Logo" style={{ height: "50px" }} />

            <div style={{ flex: 1, margin: "0 10%" }}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 15px",
                    borderRadius: "30px",
                    border: "1px solid #ccc",
                  }}
                />
                <FaSearch
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#888",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", fontSize: "22px", position: "relative" }}>
              <FaUser style={{ cursor: "pointer" }} title="Account" />
              <FaStar style={{ cursor: "pointer" }} title="Wishlist" />
              <Link to="/cart" style={{ position: "relative" }}>
                <FaShoppingCart style={{ cursor: "pointer" }} title="Cart" />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-10px",
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Bottom Navbar Strip */}
          <div style={{ backgroundColor: "#111", padding: "12px 20px" }}>
            <div
              style={{
                display: "flex",
                gap: "40px",
                color: "white",
                justifyContent: "center",
              }}
            >
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Home
              </Link>
              <Link to="/shop" style={{ color: "white", textDecoration: "none" }}>
                Shop
              </Link>
              <Link to="/shop" style={{ color: "white", textDecoration: "none" }}>
                All Accessories
              </Link>
              <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
                About Us
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Mobile Top Bar */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            backgroundColor: "white",
            boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1001,
          }}
        >
          <FaBars
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={() => setSidebarOpen(true)}
          />
          <img src={logo} alt="Logo" style={{ height: "30px" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative" }}>
            {/* Search Icon */}
            <FaSearch
              style={{ fontSize: "24px", cursor: "pointer" }}
              onClick={() => navigate("/search")}
            />

            {/* Cart Icon with Badge */}
            <div style={{ position: "relative" }}>
              <FaShoppingCart
                style={{ fontSize: "24px", cursor: "pointer" }}
                onClick={() => navigate("/cart")}
              />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-10px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Drawer */}
      {isMobile && sidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "70%",
            background: "#fff",
            zIndex: 1002,
            padding: "20px",
            boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
            overflowY: "auto",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <FaTimes
              style={{ fontSize: "24px", cursor: "pointer" }}
              onClick={() => setSidebarOpen(false)}
            />
          </div>

          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              fontSize: "18px",
              marginTop: "20px",
            }}
          >
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: "none", color: "#111" }}
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: "none", color: "#111" }}
            >
              Shop
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: "none", color: "#111" }}
            >
              Wishlist
            </Link>
            <Link
              to="/about"
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: "none", color: "#111" }}
            >
              About Us
            </Link>
          </nav>
        </div>
      )}

      {/* Bottom Navbar for Mobile */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            borderTop: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "10px 0",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <FaHome size={22} />
            <span style={{ fontSize: "12px" }}>Home</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/shop")}
          >
            <FaStore size={22} />
            <span style={{ fontSize: "12px" }}>Shop</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart size={22} />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-10px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {cartCount}
              </span>
            )}
            <span style={{ fontSize: "12px" }}>Cart</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/wishlist")}
          >
            <FaStar size={22} />
            <span style={{ fontSize: "12px" }}>Wishlist</span>
          </div>
        </div>
      )}

      {/* Spacer for Mobile */}
      {isMobile && <div style={{ height: "56px" }}></div>}
    </div>
  );
}

export default Navbar;
