import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaBalanceScale, FaRegStar } from "react-icons/fa";

export default function ProductCard({ product, addToCart, onQuickView }) {
  const [hover, setHover] = useState(false);
  const [iconHover, setIconHover] = useState(null);

  const id = product.product_id;

  const getLocalImage = (id) => {
    try {
      return new URL(`/src/assets/products/${id}.jpeg`, import.meta.url).href;
    } catch {
      return "https://via.placeholder.com/300";
    }
  };

  const iconStyle = (name) => ({
    background: "white",
    padding: "8px",
    borderRadius: "50%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    position: "relative",
    cursor: "pointer",
    transform: iconHover === name ? "scale(1.1)" : "scale(1)",
    transition: "0.2s",
    color: iconHover === name ? "black" : "gray",
  });

  const tooltipStyle = {
    position: "absolute",
    top: "-28px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "black",
    color: "white",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    whiteSpace: "nowrap",
    zIndex: 10,
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        cursor: "pointer",
        background: "white",
        borderRadius: "16px",
        transition: "0.3s",
        boxShadow: hover ? "0 4px 12px rgba(0,0,0,0.12)" : "none",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setIconHover(null);
      }}
    >
      {/* Hover Icons */}
      {hover && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            gap: "10px",
            zIndex: 10,
          }}
        >
          {/* COMPARE */}
          <div
            style={iconStyle("compare")}
            onMouseEnter={() => setIconHover("compare")}
            onMouseLeave={() => setIconHover(null)}
          >
            {iconHover === "compare" && (
              <div style={tooltipStyle}>Compare</div>
            )}
            <FaBalanceScale size={16} />
          </div>

          {/* QUICK VIEW — new code added here */}
          <div
            style={iconStyle("quick")}
            onMouseEnter={() => setIconHover("quick")}
            onMouseLeave={() => setIconHover(null)}
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
          >
            {iconHover === "quick" && (
              <div style={tooltipStyle}>Quick View</div>
            )}
            <FaEye size={16} />
          </div>

          {/* WISHLIST */}
          <div
            style={iconStyle("wishlist")}
            onMouseEnter={() => setIconHover("wishlist")}
            onMouseLeave={() => setIconHover(null)}
          >
            {iconHover === "wishlist" && (
              <div style={tooltipStyle}>Add to Wishlist</div>
            )}
            <FaRegStar size={16} />
          </div>
        </div>
      )}

      <Link
        to={`/product/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div>
          <div
            style={{
              width: "100%",
              height: "260px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "0.3s",
            }}
          >
            <img
              src={getLocalImage(id)}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: "16px",
                opacity: hover ? 0.85 : 1,
                transition: "0.3s",
              }}
            />
          </div>

          <div style={{ padding: "16px" }}>
            {/* CATEGORY NAME */}
            <p
              style={{
                fontSize: "12px",
                fontWeight: 400,
                color: "#6b7280",
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {product.categoryName || "Uncategorized"}
            </p>

            {/* PRODUCT NAME */}
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111",
                marginBottom: "8px",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: "48px",
              }}
            >
              {product.name}
            </h3>

            {/* PRICE */}
            <p
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#ef4444",
                margin: 0,
                fontFamily: "Inter, Poppins, sans-serif",
              }}
            >
              ${product.price}
            </p>
          </div>
        </div>
      </Link>

      {/* Add to Cart */}
      <button
        onClick={(e) => {
          e.preventDefault();
          addToCart(product);
        }}
        style={{
          position: "absolute",
          bottom: "12px",
          right: "12px",
          background: "black",
          color: "white",
          padding: "10px 18px",
          fontSize: "14px",
          borderRadius: "8px",
          opacity: hover ? 1 : 0,
          transition: "0.3s",
          pointerEvents: hover ? "auto" : "none",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
