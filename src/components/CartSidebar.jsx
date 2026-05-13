import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../pages/SupabaseClient";

// Helper function to convert relative paths to full Supabase URLs
const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Your Supabase storage base URL
  const SUPABASE_STORAGE_URL = 'https://ypoubhaujgmpxrzhbwpt.supabase.co/storage/v1/object/public';
  
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Return full URL
  return `${SUPABASE_STORAGE_URL}/${cleanPath}`;
};

// ========== Fetch image for a product ==========
const getProductImage = async (productId, asin) => {
  try {
    let query = supabase
      .from("product_images")
      .select("image_url")
      .eq("image_type", "main");
    
    if (asin) {
      query = query.eq("asin", asin);
    } else {
      query = query.eq("product_id", productId);
    }
    
    const { data, error } = await query.maybeSingle();
    
    if (data && !error && data.image_url) {
      return getFullImageUrl(data.image_url);
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching product image:", error);
    return null;
  }
};

export default function CartSidebar({ onClose }) {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    // Fetch images for all cart items
    const fetchImages = async () => {
      const images = {};
      for (const item of cartItems) {
        const product = item.products;
        const imageUrl = await getProductImage(product.product_id, product.asin);
        images[product.product_id] = imageUrl || "https://via.placeholder.com/80";
      }
      setProductImages(images);
    };
    
    if (cartItems.length > 0) {
      fetchImages();
    }
  }, [cartItems]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.products.price * item.quantity,
    0
  );

  // Fallback local image function (only if needed)
  const getLocalImage = (id) => {
    try {
      return new URL(`/src/assets/products/${id}.jpeg`, import.meta.url).href;
    } catch {
      return "https://via.placeholder.com/80";
    }
  };

  return (
    <>
      {/* --- OVERLAY --- */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.55)",
          zIndex: 2000,
        }}
      />

      {/* --- SIDEBAR CART DRAWER --- */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "380px",
          height: "100vh",
          background: "white",
          zIndex: 2100,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-4px 0 12px rgba(0,0,0,0.15)",
          animation: "slideIn 0.3s ease",
        }}
      >
        <style>
          {`
            @keyframes slideIn {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}
        </style>

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: 600 }}>Shopping Cart</h2>

          <X
            size={24}
            style={{ cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        {/* Message */}
        <p style={{ fontSize: "14px", marginBottom: "15px" }}>
          🔥 These products are limited, checkout within <strong>03m 50s</strong>
        </p>

        {/* CART ITEMS SCROLL AREA */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingRight: "5px",
          }}
        >
          {cartItems.map((item) => {
            const product = item.products;
            // Use Supabase image if available, fallback to local
            const img = productImages[product.product_id] || getLocalImage(product.product_id);
            
            return (
              <div
                key={item.cart_item_id}
                style={{
                  display: "flex",
                  marginBottom: "20px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                  gap: "12px",
                }}
              >
                <img
                  src={img}
                  alt={product.name}
                  onError={(e) => {
                    console.error(`Failed to load: ${img}`);
                    e.target.src = "https://via.placeholder.com/80";
                  }}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "6px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, marginBottom: "4px" }}>
                    {product.name.slice(0, 50)}...
                  </p>

                  <p style={{ color: "#1a73e8", marginBottom: "8px" }}>
                    ${product.price}
                  </p>

                  {/* Quantity Controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      onClick={() =>
                        updateQuantity(item.cart_item_id, item.quantity - 1)
                      }
                      style={{
                        width: "28px",
                        height: "28px",
                        border: "1px solid #ddd",
                        borderRadius: "50%",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      –
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.cart_item_id, item.quantity + 1)
                      }
                      style={{
                        width: "28px",
                        height: "28px",
                        border: "1px solid #ddd",
                        borderRadius: "50%",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.cart_item_id)}
                      style={{
                        background: "none",
                        color: "#777",
                        border: "none",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <span style={{ fontSize: "16px" }}>Subtotal</span>
            <span style={{ fontWeight: "bold", color: "#1a73e8" }}>
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => {
              onClose();          // close sidebar
              navigate("/checkout"); // go to checkout page
            }}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "22px",
              background: "black",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            CHECKOUT
          </button>
          <button
            onClick={() => {
              onClose();
              navigate("/cart"); 
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "22px",
              background: "white",
              border: "1px solid #ccc",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            VIEW CART
          </button>
        </div>
      </div>
    </>
  );
}