import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../pages/SupabaseClient";

// Helper function to convert relative paths to full Supabase URLs
const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  const SUPABASE_STORAGE_URL = 'https://ypoubhaujgmpxrzhbwpt.supabase.co/storage/v1/object/public';
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  return `${SUPABASE_STORAGE_URL}/${cleanPath}`;
};

// Fetch images for a product from Supabase
const getProductImages = async (productId, asin) => {
  try {
    let query = supabase
      .from("product_images")
      .select("*")
      .order("image_number", { ascending: true });
    
    if (asin) {
      query = query.eq("asin", asin);
    } else {
      query = query.eq("product_id", productId);
    }
    
    const { data, error } = await query;
    
    if (data && !error && data.length > 0) {
      const imageUrls = data.map(img => getFullImageUrl(img.image_url));
      return imageUrls;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching product images:", error);
    return [];
  }
};

export default function LandingProductCard({ product }) {
  const [hover, setHover] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const id = product.product_id;

  useEffect(() => {
    const loadImages = async () => {
      const images = await getProductImages(product.product_id, product.asin);
      setProductImages(images);
      setIsLoading(false);
    };
    
    loadImages();
  }, [product.product_id, product.asin]);

  // Use the images from Supabase
  const images = useMemo(() => {
    if (productImages.length > 0) {
      return productImages;
    }
    return ["https://via.placeholder.com/300"];
  }, [productImages]);

  const displayedImage = hover && images.length > 1 ? images[1] : images[0];

  if (isLoading) {
    return (
      <div
        style={{
          background: "white",
          borderRadius: "18px",
          padding: "14px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          fontFamily: "Inter, Poppins, sans-serif",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#9CA3AF" }}>Loading...</p>
      </div>
    );
  }

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
              console.error(`Failed to load: ${displayedImage}`);
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