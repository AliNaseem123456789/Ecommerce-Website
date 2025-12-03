import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import ProductCard from "../components/ProductCard";
import { supabase } from "../pages/SupabaseClient";
import FeaturedCarousel from "../components/FeaturedCarousel";
import hero from "../assets/banners/hero3.jpeg";

export default function LandingPage() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    fetchData();
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await fetchCategories();
      await fetchProducts();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }
    setCategories(data || []);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setFeaturedProducts([]);
      return;
    }

    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.category_id] = cat.name;
    });

    const extendedProducts = (data || []).map((product) => ({
      ...product,
      staticImages: [`/assets/products/${product.product_id}/main.jpeg`],
      categoryName: categoryMap[product.category_id] || "Uncategorized",
    }));

    setProducts(extendedProducts);
    setFeaturedProducts(extendedProducts);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#666",
        }}
      >
        Loading products...
      </div>
    );
  }

  // Hero height
  const heroHeight = isMobile ? 260 : windowWidth < 1340 ? 300 : 350;

  // Button size
  const buttonStyle = isMobile
    ? { padding: "8px 16px", fontSize: "14px" }
    : { padding: "12px 24px", fontSize: "16px" };

  // Button vertical position adjustment for mobile
  const buttonTop = isMobile ? "45%" : "50%";

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: heroHeight,
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={hero}
          alt="Hero Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "top",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: buttonTop,
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <button
            style={{
              background: "black",
              borderRadius: 8,
              fontWeight: "600",
              color: "white",
              cursor: "pointer",
              transition: "0.3s",
              ...buttonStyle,
            }}
            onMouseEnter={(e) => (e.target.style.background = "#333")}
            onMouseLeave={(e) => (e.target.style.background = "black")}
            onClick={() => navigate("/shop")}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* CATEGORY SCROLL */}
      <section style={{ marginTop: 16, padding: "0 16px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
          Shop by Category
        </h2>
        <div
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            padding: "8px 0",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 transparent",
          }}
        >
          {categories.map((category) => (
            <a
              key={category.category_id}
              href={`#category-${category.category_id}`}
              style={{
                flexShrink: 0,
                padding: "12px 24px",
                borderRadius: 50,
                background: "#f5f5f5",
                fontWeight: 500,
                cursor: "pointer",
                transition: "0.2s",
                textDecoration: "none",
                color: "inherit",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#e5e5e5")}
              onMouseLeave={(e) => (e.target.style.background = "#f5f5f5")}
            >
              {category.name}
            </a>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ marginTop: 48, padding: "0 16px" }}>
        <h2
          style={{
            fontSize: isMobile ? 24 : 32,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          Featured Products
        </h2>
        {featuredProducts.length > 0 ? (
          <FeaturedCarousel products={featuredProducts} addToCart={addToCart} />
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              background: "#f9f9f9",
              borderRadius: "8px",
              color: "#666",
            }}
          >
            No products available at the moment.
          </div>
        )}
      </section>

      {/* CATEGORY SECTIONS */}
      {categories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.category_id === category.category_id
        );
        if (categoryProducts.length === 0) return null;

        return (
          <section
            id={`category-${category.category_id}`}
            key={category.category_id}
            style={{ padding: "48px 16px" }}
          >
            <h2
              style={{
                fontSize: isMobile ? 24 : 32,
                fontWeight: 600,
                marginBottom: 24,
              }}
            >
              {category.name}
            </h2>

            <div
              style={{
                display: "grid",
                gap: 24,
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : "repeat(6, 1fr)",
              }}
            >
              {categoryProducts.slice(0, 6).map((product) => (
                <ProductCard
                  key={product.product_id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* FOOTER NOTE */}
      <div
        style={{
          marginTop: 48,
          padding: "20px 16px",
          textAlign: "center",
          background: "#f5f5f5",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Showing all {products.length} products
      </div>
    </div>
  );
}
