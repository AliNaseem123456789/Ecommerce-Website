import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./SupabaseClient";
import { CartContext } from "../components/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("product_id", id)
      .single();

    setProduct(data);
  };

  // Multi-format loader
  const getLocalImage = (id) => {
    const exts = ["avif", "jpg", "jpeg", "png", "webp"];
    for (const ext of exts) {
      try {
        return new URL(`/src/assets/products/${id}.jpeg`, import.meta.url)
          .href;
      } catch {}
    }
    return "https://via.placeholder.com/600x600";
  };

  if (!product) return <p>Loading...</p>;

  const mainImage = getLocalImage(product.product_id);

  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        padding: "30px 40px",
        maxWidth: "1300px",
        margin: "auto",
      }}
    >
      {/* LEFT SIDE — IMAGES */}
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Small thumbnails */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "80px",
          }}
        >
          {[mainImage, mainImage, mainImage, mainImage].map((img, i) => (
            <img
              key={i}
              src={img}
              alt="thumb"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Main large image */}
        <img
          src={mainImage}
          alt={product.name}
          style={{
            width: "480px",
            height: "480px",
            borderRadius: "14px",
            objectFit: "contain",
            background: "#f3f4f6",
            padding: "20px",
            border: "1px solid #e5e7eb",
          }}
        />
      </div>

      {/* RIGHT SIDE — PRODUCT INFO */}
      <div style={{ flex: 1 }}>
        {/* Discount */}
        {product.discount && (
          <span
            style={{
              background: "#dc2626",
              color: "white",
              padding: "4px 10px",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            -{product.discount}%
          </span>
        )}

        <h1
          style={{
            marginTop: "10px",
            fontSize: "26px",
            fontWeight: 700,
          }}
        >
          {product.name}
        </h1>

        {/* Price */}
        <div style={{ margin: "15px 0", fontSize: "22px" }}>
          {product.discount ? (
            <>
              <span
                style={{
                  fontWeight: 700,
                  color: "#16a34a",
                  marginRight: "10px",
                }}
              >
                ${(product.price - (product.price * product.discount) / 100).toFixed(2)}
              </span>
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#6b7280",
                }}
              >
                ${product.price}
              </span>
            </>
          ) : (
            <span style={{ fontWeight: 700 }}>${product.price}</span>
          )}
        </div>

        {/* Rating */}
        <p style={{ color: "#4b5563", marginBottom: "20px" }}>
          ⭐ {product.avg_rating || "0.0"} (0 reviews)
        </p>

        {/* Quantity + Add to Cart */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button
            onClick={() => addToCart(product)}
            style={{
              background: "black",
              color: "white",
              padding: "12px 30px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            ADD TO CART
          </button>

          <button
            style={{
              background: "#f3f4f6",
              padding: "12px 30px",
              borderRadius: "8px",
              fontWeight: 600,
            }}
          >
            BUY NOW
          </button>
        </div>

        {/* Description */}
        <p style={{ marginTop: "25px", color: "#374151" }}>
          {product.description}
        </p>

        {/* Estimated delivery */}
        <p style={{ marginTop: "30px", color: "#6b7280" }}>
          📦 Estimated Delivery: <b>01 – 08 Dec, 2025</b>
        </p>

        {/* Payment logos */}
        <div style={{ marginTop: "15px" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt=""
            style={{ width: "60px", marginRight: "10px" }}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.png"
            alt=""
            style={{ width: "60px", marginRight: "10px" }}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5a/PayPal.svg"
            alt=""
            style={{ width: "60px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
