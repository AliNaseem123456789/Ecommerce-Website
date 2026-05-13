import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../components/WishlistContext";
import { CartContext } from "../components/CartContext";
import { supabase } from "../pages/SupabaseClient";
import { X } from "lucide-react";

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

export default function Wishlist() {
  const { wishlist, removeWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({});

  // FETCH PRODUCT DETAILS FROM SUPABASE
  useEffect(() => {
    if (wishlist.length === 0) {
      setProducts([]);
      setProductImages({});
      return;
    }

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .in("product_id", wishlist);

      if (error) {
        console.error("Error fetching wishlist products:", error);
      } else {
        setProducts(data);
        
        // Fetch images for each product
        const images = {};
        for (const product of data) {
          const imageUrl = await getProductImage(product.product_id, product.asin);
          images[product.product_id] = imageUrl || "https://via.placeholder.com/100";
        }
        setProductImages(images);
      }
    };

    fetchProducts();
  }, [wishlist]);

  // Fallback local image function (only if needed)
  const getLocalImage = (id) => {
    try {
      return new URL(`/src/assets/products/${id}.jpeg`, import.meta.url).href;
    } catch {
      return "https://via.placeholder.com/100";
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <style>
        {`
          @media (max-width: 768px) {
            .wishlist-row {
              flex-direction: column;
              align-items: flex-start;
            }
            .right-column {
              width: 100%;
              margin-top: 10px;
              text-align: center;
            }
            .add-cart-btn {
              width: 100%;
            }
          }
        `}
      </style>
      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Wishlist</h2>

        {/* HEADINGS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            borderBottom: "2px solid #ddd",
            padding: "0 15px 10px 15px",
          }}
        >
          <div style={{ flex: 3 }}>Product</div>
          <div style={{ flex: 1, textAlign: "center" }}>Price</div>
          <div style={{ flex: 1, textAlign: "center" }}>Action</div>
        </div>

        {/* ITEMS */}
        {products.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Your wishlist is empty.
          </p>
        ) : (
          products.map((product) => {
            // Use Supabase image if available, fallback to local
            const imageUrl = productImages[product.product_id] || getLocalImage(product.product_id);
            
            return (
              <div
                key={product.product_id}
                className="wishlist-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ddd",
                  padding: "15px",
                  gap: "15px",
                }}
              >
                {/* PRODUCT DETAILS */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: 3,
                    gap: "15px",
                  }}
                >
                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => removeWishlist(product.product_id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    <X size={20} />
                  </button>

                  <img
                    src={imageUrl}
                    alt={product.name}
                    onError={(e) => {
                      console.error(`Failed to load: ${imageUrl}`);
                      e.target.src = "https://via.placeholder.com/100";
                    }}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />

                  <div>
                    <p style={{ fontSize: "16px", marginBottom: "6px" }}>
                      {product.name}
                    </p>
                  </div>
                </div>

                {/* PRICE */}
                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: "16px",
                    color: "#0095ff",
                  }}
                >
                  ${product.price}
                </div>

                {/* ADD TO CART */}
                <div
                  className="right-column"
                  style={{ flex: 1, textAlign: "center" }}
                >
                  <button
                    className="add-cart-btn"
                    onClick={() => addToCart(product)}
                    style={{
                      padding: "10px 18px",
                      background: "black",
                      color: "white",
                      borderRadius: "25px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      width: "140px",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}