import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import ProductCard from "../components/ProductCard";
import { supabase } from "../pages/SupabaseClient";
import HeroBanner from "../components/Landing/HeroSection";
import BrandStatement from "../components/Landing/BrandStatements";
// import MiniTopBar from "../components/Landing/MiniTopBAr";
import Testimonials from "../components/Landing/Testimonials";
import WhyShopWithUs from "../components/Landing/WhyShopWithUs";
// Hero images
import hero3 from "../assets/banners/flowers.jpeg";
import hero4 from "../assets/banners/hero4.jpeg";
import hero5 from "../assets/banners/hero5.jpeg";
import hero6 from "../assets/banners/hero6.jpeg";
import hero7 from "../assets/banners/hero7.jpeg";

import product1 from "../assets/banners/product1banner.png"


import SideBySide from "../components/Landing/SideBySide";
import LandingNavbar from "../components/Landing/LandingNavbar";
import HowItWorks from "../components/Landing/HowItWorks";
import MainBanner from "../components/Landing/MainBanner";

export default function LandingPage() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;

  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = [hero3, hero4, hero5, hero6, hero7];

  // Filter state (ALWAYS STRING)
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Slider state
  const visibleCount = isMobile ? 2 : 4;
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    fetchData();

    const resizeHandler = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: catData } = await supabase.from("categories").select("*");
      setCategories(catData || []);

      const { data: prodData } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      const categoryMap = {};
      (catData || []).forEach((cat) => {
        categoryMap[cat.category_id] = cat.name;
      });

      const extended = (prodData || []).map((p) => ({
        ...p,
        staticImages: [`/assets/products/${p.product_id}/main.jpeg`],
        categoryName: categoryMap[p.category_id] || "Uncategorized",
      }));

      setProducts(extended);
    } catch (err) {
      console.error("Error loading:", err);
    }
    setIsLoading(false);
  };

  /* 🔥 FIXED FILTER — category_id converted to STRING */
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p) => String(p.category_id) === String(selectedCategory)
        );

  // Slider navigation
  const handleNext = () => {
    setSlideIndex((prev) =>
      prev + 1 >= filteredProducts.length ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setSlideIndex((prev) =>
      prev - 1 < 0 ? filteredProducts.length - 1 : prev - 1
    );
  };

  const getVisibleProducts = () => {
    if (filteredProducts.length === 0) return [];
    const arr = [];
    for (let i = 0; i < visibleCount; i++) {
      arr.push(filteredProducts[(slideIndex + i) % filteredProducts.length]);
    }
    return arr;
  };

  if (isLoading) {
    return <div style={styles.loader}>Loading products...</div>;
  }

  return (
    <>
    <LandingNavbar/>
    <MainBanner
    heroImages={[
      {
        image: product1,
        title: "Discover legance for Every Moment",
        subtitle: "Premium Products, Delivered With Love",
        description: "Our thoughtfully curated items elevate your lifestyle."
      },
      {
        image: hero4,
        title: "Luxury Meets Comfort",
        subtitle: "Handpicked Items for Your Home",
        description: "Transform your living space into a masterpiece."
      },
      {
        image: hero5,
        title: "Style That Inspires",
        subtitle: "Modern Designs for Modern Living",
        description: "Experience beauty, quality, and elegance."
      }
    ]}
  />

    
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      

      {/* CATEGORY FILTER TABS */}
      <section style={{ marginTop: 30 }}>
        <div style={styles.tabsWrapper}>
          <div style={styles.tabsContainer}>
            {/* ALL TAB */}
            <div
              onClick={() => {
                setSelectedCategory("all");
                setSlideIndex(0);
              }}
              style={{
                ...styles.tab,
                borderBottom:
                  selectedCategory === "all"
                    ? "3px solid black"
                    : "3px solid transparent",
                color: selectedCategory === "all" ? "black" : "#777",
              }}
            >
              All Products
            </div>

            {/* CATEGORY TABS */}
            {categories.map((cat) => (
              <div
                key={cat.category_id}
                onClick={() => {
                  setSelectedCategory(String(cat.category_id)); // 🔥 FIXED
                  setSlideIndex(0);
                }}
                style={{
                  ...styles.tab,
                  borderBottom:
                    selectedCategory === String(cat.category_id)
                      ? "3px solid black"
                      : "3px solid transparent",
                  color:
                    selectedCategory === String(cat.category_id)
                      ? "black"
                      : "#777",
                }}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SLIDER */}
       <section style={{ marginTop: 40,marginLeft:10 }}><h2 style={styles.sectionTitle}>Products</h2></section>
        
      <section style={{ marginTop: 40,marginLeft:10, padding: "0 16px", position: "relative" }}>
      

        {filteredProducts.length > 0 ? (
          <>
            <button style={styles.arrowLeft} onClick={handlePrev}>
              ◀
            </button>
            <button style={styles.arrowRight} onClick={handleNext}>
              ▶
            </button>

            <div style={styles.sliderRow}>
              {getVisibleProducts().map((product) => (
                <div
                  key={product.product_id}
                  style={{ minWidth: `${100 / visibleCount}%` }}
                >
                  <ProductCard product={product} addToCart={addToCart} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center", color: "#777" }}>
            No products in this category.
          </p>
        )}
      </section>
    </div>
  

    <SideBySide/>
  <BrandStatement/>
  <Testimonials/>
    <HowItWorks/>
    <WhyShopWithUs/> 
    </>
  );
}

/* ---------------- Styles ---------------- */
const styles = {
  loader: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    color: "#666",
  },

  heroFullScreen: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
  heroImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    transition: "opacity 1.5s ease-in-out",
  },
  heroButtonWrapper: {
    position: "absolute",
    bottom: "10%",
    left: "50%",
    transform: "translateX(-50%)",
  },
  heroButton: {
    background: "black",
    color: "white",
    padding: "14px 32px",
    fontSize: 18,
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
  },

  tabsWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  tabsContainer: {
    display: "flex",
    gap: 30,
    borderBottom: "1px solid #ddd",
    paddingBottom: 10,
  },
  tab: {
    fontSize: 16,
    cursor: "pointer",
    paddingBottom: 8,
    transition: "0.2s",
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 20,
  },
  sliderRow: {
    display: "flex",
    gap: 16,
    overflow: "hidden",
  },
  arrowLeft: {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    zIndex: 2,
    background: "rgba(0,0,0,0.5)",
    color: "white",
    border: "none",
    width: 40,
    height: 40,
    borderRadius: "50%",
    cursor: "pointer",
  },
  arrowRight: {
    position: "absolute",
    top: "50%",
    right: 0,
    transform: "translateY(-50%)",
    zIndex: 2,
    background: "rgba(0,0,0,0.5)",
    color: "white",
    border: "none",
    width: 40,
    height: 40,
    borderRadius: "50%",
    cursor: "pointer",
  },

  footer: {
    marginTop: 40,
    padding: "20px 0",
    textAlign: "center",
    background: "#f5f5f5",
    color: "#666",
    fontSize: 14,
  },
};
