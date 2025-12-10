// src/components/Accountx/WishlistTab.jsx
import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../WishlistContext";
import { CartContext } from "../CartContext";
import { supabase } from "../../pages/SupabaseClient";
import { X } from "lucide-react";

export default function WishlistTab() {
  const { wishlist, removeWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);

  // FETCH PRODUCT DETAILS FROM SUPABASE
  useEffect(() => {
    if (wishlist.length === 0) {
      setProducts([]);
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
      }
    };

    fetchProducts();
  }, [wishlist]);

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

      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Wishlist</h2>

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

      {products.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Your wishlist is empty.
        </p>
      ) : (
        products.map((product) => {
          const imageUrl = getLocalImage(product.product_id);
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
              <div className="right-column" style={{ flex: 1, textAlign: "center" }}>
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
  );
}
