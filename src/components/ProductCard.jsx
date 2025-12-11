import React, { useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaBalanceScale, FaRegStar, FaStar } from "react-icons/fa";
import { WishlistContext } from "../components/WishlistContext";

export default function ProductCard({ product, addToCart, onQuickView }) {
  const [hover, setHover] = useState(false);
  const [iconHover, setIconHover] = useState(null);

  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const id = product.product_id;

  // ✅ Simple image loader for your exact pattern: 123.jpeg and 123-1.jpeg
  const createImageUrl = (filename) => {
    try {
      return new URL(`/src/assets/products/${filename}`, import.meta.url).href;
    } catch {
      return null;
    }
  };

  // ✅ SIMPLE VERSION: Only look for your exact pattern
  const images = useMemo(() => {
    const imageUrls = [];
    
    // Try main image: 123.jpeg
    const mainImage = createImageUrl(`${id}.jpeg`);
    if (mainImage) {
      imageUrls.push(mainImage);
    }
    
    // Try hover image: 123-1.jpeg
    const hoverImage = createImageUrl(`${id}-1.jpeg`);
    if (hoverImage) {
      imageUrls.push(hoverImage);
    }
    
    // Try alternative extension: 123.jpg and 123-1.jpg
    const mainImageAlt = createImageUrl(`${id}.jpg`);
    if (mainImageAlt && !imageUrls.includes(mainImageAlt)) {
      imageUrls.push(mainImageAlt);
    }
    
    const hoverImageAlt = createImageUrl(`${id}-1.jpg`);
    if (hoverImageAlt && !imageUrls.includes(hoverImageAlt)) {
      imageUrls.push(hoverImageAlt);
    }
    
    // Fallback to placeholder if no images found
    if (imageUrls.length === 0) {
      imageUrls.push("https://via.placeholder.com/300");
    }
    
    // console.log(`Product ${id} - Images found:`, imageUrls.length, imageUrls); // Debug
    return imageUrls;
  }, [id]);

  // ✅ Show 2nd image on hover if available
  const displayedImage = hover && images.length > 1 ? images[1] : images[0];

  const isWishlisted = wishlist.includes(id);

  const iconStyle = (name, active = false) => ({
    background: "white",
    padding: "8px",
    borderRadius: "50%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    position: "relative",
    cursor: "pointer",
    transform: iconHover === name ? "scale(1.1)" : "scale(1)",
    transition: "0.2s",
    color: active ? "#facc15" : iconHover === name ? "black" : "gray",
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
    fontFamily: "Inter, sans-serif",
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        cursor: "pointer",
        background: "white",
        borderRadius: "18px",
        transition: "0.3s",
        boxShadow: hover
          ? "0 8px 16px rgba(0,0,0,0.12)"
          : "0 2px 6px rgba(0,0,0,0.05)",
        fontFamily: "Inter, Poppins, sans-serif",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setIconHover(null);
      }}
    >
      {/* HOVER ICONS */}
      {hover && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
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
            {iconHover === "compare" && <div style={tooltipStyle}>Compare</div>}
            <FaBalanceScale size={16} />
          </div>

          {/* QUICK VIEW */}
          <div
            style={iconStyle("quick")}
            onMouseEnter={() => setIconHover("quick")}
            onMouseLeave={() => setIconHover(null)}
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
          >
            {iconHover === "quick" && <div style={tooltipStyle}>Quick View</div>}
            <FaEye size={16} />
          </div>

          {/* WISHLIST */}
          <div
            style={iconStyle("wishlist", isWishlisted)}
            onMouseEnter={() => setIconHover("wishlist")}
            onMouseLeave={() => setIconHover(null)}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(id);
            }}
          >
            {iconHover === "wishlist" && (
              <div style={tooltipStyle}>
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </div>
            )}
            {isWishlisted ? (
              <FaStar size={16} color="#facc15" />
            ) : (
              <FaRegStar size={16} />
            )}
          </div>
        </div>
      )}

      {/* PRODUCT LINK */}
      <Link to={`/product/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div>
          {/* PRODUCT IMAGE */}
          <div
            style={{
              width: "100%",
              height: "260px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "0.3s",
              position: "relative", // Added for debugging
            }}
          >
           
            {/* <div style={{
              position: "absolute",
              top: "5px",
              left: "5px",
              background: "rgba(0,0,0,0.7)",
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "10px",
              zIndex: 5,
              display: hover ? "block" : "none",
            }}>
              {images.length > 1 ? `Hover: ${images[1]}` : "No hover image"}
            </div> */}
            
            <img
              src={displayedImage}
              alt={product.name}
              onError={(e) => {
                console.error(`Failed to load: ${displayedImage}`);
                e.target.src = "https://via.placeholder.com/300";
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: "16px",
                opacity: hover ? 0.85 : 1,
                transition: "opacity 0.3s ease",
              }}
            />
          </div>

          {/* PRODUCT INFO */}
          <div style={{ padding: "16px" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "#6b7280",
                marginBottom: "6px",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
              }}
            >
              {product.categoryName || "Uncategorized"}
            </p>

            <h3
              style={{
                fontSize: "17px",
                fontWeight: 600,
                color: "#1f2937",
                lineHeight: "1.35",
                marginBottom: "8px",
                fontFamily: "Poppins, sans-serif",
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
                fontSize: "18px",
                fontWeight: 600,
                color: "#ef4444",
                margin: 0,
              }}
            >
              ${product.price}
            </p>
          </div>
        </div>
      </Link>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={(e) => {
          e.preventDefault();
          addToCart(product);
        }}
        style={{
          position: "absolute",
          bottom: "14px",
          right: "14px",
          background: "#111",
          color: "white",
          padding: "10px 20px",
          fontSize: "14px",
          borderRadius: "10px",
          opacity: hover ? 1 : 0,
          transition: "0.3s",
          pointerEvents: hover ? "auto" : "none",
          fontWeight: 500,
          fontFamily: "Inter, sans-serif",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
