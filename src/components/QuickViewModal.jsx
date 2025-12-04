import React from "react";
import { FaTimes } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function QuickViewModal({ product, onClose }) {
  const id = product.product_id;

  const getLocalImage = (id) => {
    try {
      return new URL(`/src/assets/products/${id}.jpeg`, import.meta.url).href;
    } catch {
      return "https://via.placeholder.com/400";
    }
  };

  // ⭐ Generate proper 5-star rating UI
  const renderStars = (rating = 4.5) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    let stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} size={18} color="#facc15" />); // yellow stars
    }

    if (halfStar) {
      stars.push(<FaStar key="half" size={18} color="#facc15" opacity={0.5} />);
    }

    return stars;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          width: "75%",           // reduced width
          maxWidth: "900px",      // smaller modal
          background: "white",
          borderRadius: "12px",
          display: "flex",
          padding: "25px",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <FaTimes
          size={22}
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            cursor: "pointer",
          }}
        />

        {/* LEFT — IMAGE */}
        <div style={{ flex: 1, paddingRight: "20px" }}>
          <img
            src={getLocalImage(id)}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* RIGHT — DETAILS */}
        <div style={{ flex: 1.4, paddingLeft: "10px" }}>
          {/* Title */}
          <h2 style={{ fontSize: "24px", marginBottom: "15px", fontWeight: 600 }}>
            {product.name}
          </h2>

          {/* PRICE + STARS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            {/* PRICE */}
            <h3 style={{ fontSize: "22px", color: "#ef4444", margin: 0 }}>
              ${product.price}
            </h3>

            {/* ⭐ RATING */}
            <div style={{ display: "flex", gap: "4px" }}>
              {renderStars(product.avg_rating)}
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
}
