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
import { supabase } from "../pages/SupabaseClient"; // ✅ Add this
import logo from "../assets/Logos/logo2.png";

function Navbar() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // ✅ cart count

  // Fetch cart items count
  useEffect(() => {
    fetchCartCount();

    // Optional: poll every 10s for live updates
    const interval = setInterval(fetchCartCount, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchCartCount = async () => {
    const { data, error } = await supabase
      .from("cart_items")
      .select("cart_item_id")
      .eq("user_id", 1);

    if (!error) setCartCount(data.length); // unique items count
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
                
                {/* Badge */}
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-10px",
                      background: "red",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      minWidth: "18px",
                      textAlign: "center",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

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

      {/* Mobile Bottom Bar */}
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
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
               onClick={() => navigate("/")}>
            <FaHome size={22} />
            <span style={{ fontSize: "12px" }}>Home</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
               onClick={() => navigate("/shop")}>
            <FaStore size={22} />
            <span style={{ fontSize: "12px" }}>Shop</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", position: "relative" }}
               onClick={() => navigate("/cart")}>
            <FaShoppingCart size={22} />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-10px",
                  background: "red",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  minWidth: "18px",
                  textAlign: "center",
                }}
              >
                {cartCount}
              </span>
            )}
            <span style={{ fontSize: "12px" }}>Cart</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
               onClick={() => navigate("/wishlist")}>
            <FaStar size={22} />
            <span style={{ fontSize: "12px" }}>Wishlist</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
