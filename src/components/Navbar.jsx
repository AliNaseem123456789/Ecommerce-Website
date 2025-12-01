import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaStar, FaShoppingCart, FaSearch } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      {/* Top Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 20px", // increased height
          backgroundColor: "white",
          boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
        }}
      >
        {/* Left - Logo */}
        <div
          style={{ fontSize: "28px", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          MyLogo
        </div>

        {/* Center - Search Bar */}
        <div style={{ flex: 1, margin: "0 10%" }}> {/* Reduced by ~20% from both sides */}
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search products..."
              style={{
                width: "100%",
                padding: "12px 40px 12px 15px", // taller & rounded
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

        {/* Right - Icons */}
        <div style={{ display: "flex", gap: "20px", fontSize: "22px" }}>
          <FaUser style={{ cursor: "pointer" }} title="Account" />
          <FaStar style={{ cursor: "pointer" }} title="Wishlist" />
          <Link to="/cart">
            <FaShoppingCart style={{ cursor: "pointer" }} title="Cart" />
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
            justifyContent: "center", // center text
          }}
        >
          <Link to="/home" style={{ color: "white", textDecoration: "none" }}>Home</Link>
          <Link to="/shop" style={{ color: "white", textDecoration: "none" }}>Shop</Link>
          <Link to="/shop" style={{ color: "white", textDecoration: "none" }}>All Accessories</Link>
          <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About Us</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
