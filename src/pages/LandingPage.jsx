import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../components/CartContext";
import ProductCard from "../components/ProductCard";
import { supabase } from "../pages/SupabaseClient";

import heroMobile from "../assets/banners/hero1.jpeg";
import pic1 from "../assets/banners/pic1.jpeg";
import pic2 from "../assets/banners/pic2.jpeg";
import promoMobile1 from "../assets/banners/promo1.jpeg";
import promoMobile2 from "../assets/banners/hero2.jpeg";

export default function LandingPage() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (!error) setCategories(data);
  };

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    const extended = (data || []).map((p) => ({
      ...p,
      staticImages: [`/assets/products/${p.product_id}/main.jpeg`],
    }));
    setProducts(extended);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {/* Dynamic Navbar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          width: "100%",
          background: "white",
          boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          padding: "16px 0",
          fontSize: "14px",
          fontWeight: 500,
          overflowX: "auto",
        }}
      >
        {categories.map((c) => (
          <a
            key={c.category_id}
            href={`#category-${c.category_id}`}
            style={{
              textDecoration: "none",
              cursor: "pointer",
              color: "#000",
              whiteSpace: "nowrap",
            }}
          >
            {c.name.toUpperCase()}
          </a>
        ))}
      </div>

      {/* HERO SECTION: Large Left Image, Text Right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "500px", // increased height to reduce stretching
        }}
      >
        {/* Left: Banner Image */}
        <div
          style={{
            backgroundImage: `url(${heroMobile})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
          }}
        ></div>

        {/* Right: Caption */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px",
            background: "white",
          }}
        >
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "16px" }}>
            Latest Mobile Phones & Electronics
          </h2>
          <p style={{ color: "#4b5563", marginBottom: "24px", fontSize: "18px" }}>
            Explore top smartphones, gadgets, and accessories at unbeatable prices.
          </p>
          <button
            style={{
              background: "black",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "16px",
              width: "fit-content",
            }}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Two-Square Mobile Promotions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          padding: "32px 24px",
        }}
      >
        {/* Left Square */}
        <div
          style={{
            backgroundImage: `url(${pic1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <button
            style={{
              background: "black",
              color: "white",
              padding: "12px 24px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Shop Now →
          </button>
        </div>

        {/* Right Square */}
        <div
          style={{
            backgroundImage: `url(${pic2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <button
            style={{
              background: "black",
              color: "white",
              padding: "12px 24px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Shop Now →
          </button>
        </div>
      </div>

      {/* Promotional Banner 1 */}
      <div
        style={{
          width: "100%",
          height: "300px",
          backgroundImage: `url(${promoMobile1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          marginTop: "32px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "32px", fontWeight: 700 }}>Hot Deals on Kitchen stuff</h2>
          <p style={{ fontSize: "18px", marginTop: "8px" }}>Grab the latest items at amazing prices</p>
          <button
            style={{
              marginTop: "16px",
              background: "black",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Shop Now →
          </button>
        </div>
      </div>

      {/* Promotional Banner 2 */}
      <div
        style={{
          width: "100%",
          height: "300px",
          backgroundImage: `url(${promoMobile2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          marginTop: "32px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "32px", fontWeight: 700 }}>Latest Gadgets & Accessories</h2>
          <p style={{ fontSize: "18px", marginTop: "8px" }}>Everything you need for your devices</p>
          <button
            style={{
              marginTop: "16px",
              background: "black",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Shop Now →
          </button>
        </div>
      </div>

      {/* Featured Categories Sections */}
      {categories.map((c) => (
        <div key={c.category_id} id={`category-${c.category_id}`} style={{ padding: "56px 24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "32px" }}>{c.name}</h2>
          <div style={{ display: "flex", overflowX: "auto", gap: "24px", paddingBottom: "16px" }}>
            {products
              .filter((p) => p.category_id === c.category_id)
              .slice(0, 6)
              .map((p) => (
                <ProductCard key={p.product_id} product={p} addToCart={addToCart} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
