

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

export default function LandingProductCard({ product }) {
  const [hover, setHover] = useState(false);
  const id = product.product_id;

  // ⭐ Same image loader used in ProductCard
  const createImageUrl = (filename) => {
    try {
      return new URL(`/src/assets/products/${filename}`, import.meta.url).href;
    } catch {
      return null;
    }
  };

  // ⭐ EXACT SAME LOGIC as your ProductCard
  const images = useMemo(() => {
    const imageUrls = [];

    const mainImage = createImageUrl(`${id}.jpeg`);
    if (mainImage) imageUrls.push(mainImage);

    const hoverImage = createImageUrl(`${id}-1.jpeg`);
    if (hoverImage) imageUrls.push(hoverImage);

    const mainImageAlt = createImageUrl(`${id}.jpg`);
    if (mainImageAlt && !imageUrls.includes(mainImageAlt))
      imageUrls.push(mainImageAlt);

    const hoverImageAlt = createImageUrl(`${id}-1.jpg`);
    if (hoverImageAlt && !imageUrls.includes(hoverImageAlt))
      imageUrls.push(hoverImageAlt);

    if (imageUrls.length === 0) {
      imageUrls.push("https://via.placeholder.com/300");
    }

    return imageUrls;
  }, [id]);

  const displayedImage = hover && images.length > 1 ? images[1] : images[0];

  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "14px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        fontFamily: "Inter, Poppins, sans-serif",
        transition: "0.25s",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/product/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        {/* IMAGE */}
        <div
          style={{
            width: "100%",
            height: "220px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            borderRadius: "12px",
            transition: "0.25s",
          }}
        >
          <img
            src={displayedImage}
            alt={product.name}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300";
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: hover ? 0.85 : 1,
              transition: "opacity 0.3s ease",
            }}
          />
        </div>

        {/* INFO */}
        <div style={{ marginTop: "12px" }}>
          <p
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              fontWeight: 500,
              letterSpacing: "0.8px",
              color: "#9CA3AF",
              marginBottom: "4px",
            }}
          >
            {product.categoryName || "Category"}
          </p>

          <h3
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#1F2937",
              marginBottom: "6px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </h3>

          <p
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#ef4444",
              margin: 0,
            }}
          >
            ${product.price}
          </p>
        </div>
      </Link>
    </div>
  );
}



