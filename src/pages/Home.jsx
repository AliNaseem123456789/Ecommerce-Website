import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import ProductCard from "../components/ProductCard";
import { supabase } from "../pages/SupabaseClient";

// Hero images
import hero3 from "../assets/banners/hero3.jpeg";
import hero4 from "../assets/banners/hero4.jpeg";
import hero5 from "../assets/banners/hero5.jpeg";
import hero6 from "../assets/banners/hero6.jpeg";
import hero7 from "../assets/banners/hero7.jpeg";

export default function Home() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentHero, setCurrentHero] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const isMobile = windowWidth < 768;
  const heroImages = [hero3, hero4, hero5, hero6, hero7];

  useEffect(() => {
    fetchData();
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (featuredProducts.length > 0) {
        handleNext();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [featuredProducts, carouselIndex]);

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

  const heroHeight = isMobile ? 260 : windowWidth < 1340 ? 300 : 350;
  const buttonStyle = isMobile
    ? { padding: "8px 16px", fontSize: "14px" }
    : { padding: "12px 24px", fontSize: "16px" };
  const buttonTop = isMobile ? "45%" : "50%";

  // Reorder categories: Kitchen and Home (category_id 4) first
  const orderedCategories = [...categories].sort((a, b) =>
    a.category_id === 4 ? -1 : b.category_id === 4 ? 1 : 0
  );

  const carouselVisible = isMobile ? 2 : windowWidth < 1024 ? 3 : 4;

  const handlePrev = () => {
    setCarouselIndex(
      (prev) =>
        (prev - 1 + featuredProducts.length) % featuredProducts.length
    );
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const getVisibleProducts = () => {
    const productsToShow = [];
    for (let i = 0; i < carouselVisible; i++) {
      productsToShow.push(
        featuredProducts[(carouselIndex + i) % featuredProducts.length]
      );
    }
    return productsToShow;
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: heroHeight,
          overflow: "hidden",
        }}
      >
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Hero ${index}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              transition: "opacity 2s ease-in-out",
              opacity: index === currentHero ? 1 : 0,
            }}
          />
        ))}

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
          {orderedCategories.map((category) => (
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

      {/* FEATURED PRODUCTS CAROUSEL */}
      <section style={{ marginTop: 48, padding: "0 16px", position: "relative" }}>
        <h2
          style={{
            fontSize: isMobile ? 24 : 32,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          Featured Products
        </h2>

        <button
          onClick={handlePrev}
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "rgba(0,0,0,0.5)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 40,
            height: 40,
            cursor: "pointer",
          }}
        >
          ◀
        </button>

        <button
          onClick={handleNext}
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "rgba(0,0,0,0.5)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 40,
            height: 40,
            cursor: "pointer",
          }}
        >
          ▶
        </button>

        <div
          style={{
            display: "flex",
            gap: 16,
            overflow: "hidden",
          }}
        >
          {getVisibleProducts().map((product) => (
            <div
              key={product.product_id}
              style={{ minWidth: `${100 / carouselVisible}%` }}
            >
              <ProductCard product={product} addToCart={addToCart} />
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      {orderedCategories.map((category) => {
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

  
    </div>
  );
}
