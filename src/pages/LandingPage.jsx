import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import ProductCard from "../components/ProductCard";
import { supabase } from "../pages/SupabaseClient";
import HeroBanner from "../components/Landing/HeroSection";
import BrandStatement from "../components/Landing/BrandStatements";
import Testimonials from "../components/Landing/Testimonials";
import WhyShopWithUs from "../components/Landing/WhyShopWithUs";

// Hero images
import hero3 from "../assets/banners/flowers.jpeg";
import hero4 from "../assets/banners/hero4.jpeg";
import hero5 from "../assets/banners/hero5.jpeg";
import hero6 from "../assets/banners/hero6.jpeg";
import hero7 from "../assets/banners/hero7.jpeg";

import product1 from "../assets/banners/product1banner.png";
import product2 from "../assets/banners/product2banner.png";
import product3 from "../assets/banners/product3banner.png";

import SideBySide from "../components/Landing/SideBySide";
import LandingNavbar from "../components/Landing/LandingNavbar";
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

  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p) => String(p.category_id) === String(selectedCategory)
        );

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
      <LandingNavbar />

      <MainBanner
        heroImages={[
          {
            image: product1,
            title: "Discover elegance for Every Moment",
            subtitle: "Premium Products",
            description: "Thoughtfully curated items elevate your lifestyle.",
            productId: 25,
          },
          {
            image: product2,
            title: "Luxury Meets Comfort",
            subtitle: "Handpicked Items for Your Home",
            description: "Transform your living space into a masterpiece.",
            productId: 31,
          },
          {
            image: product3,
            title: "Style That Inspires",
            subtitle: "Modern Designs for Modern Living",
            description: "Experience beauty, quality, and elegance.",
            productId: 30,
          },
        ]}
      />

      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {/* CATEGORY FILTER */}
        <section style={{ marginTop: 30 }}>
          {isMobile ? (
            /* MOBILE 2-ROW BUBBLE SELECTOR */
            <div style={styles.mobileBubbleWrapper}>
              {["all", ...categories.map((c) => String(c.category_id))].map(
                (catId, index) => {
                  const catName =
                    catId === "all"
                      ? "All"
                      : categories.find((c) => String(c.category_id) === catId)
                          ?.name;
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedCategory(catId)}
                      style={{
                        ...styles.mobileBubble,
                        backgroundColor:
                          selectedCategory === catId ? "#000" : "#f0f0f0",
                        color: selectedCategory === catId ? "#fff" : "#333",
                      }}
                    >
                      {catName}
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            /* DESKTOP CATEGORY TABS */
            <div style={styles.tabsWrapper}>
              <div style={styles.tabsContainer}>
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

                {categories.map((cat) => (
                  <div
                    key={cat.category_id}
                    onClick={() => {
                      setSelectedCategory(String(cat.category_id));
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
          )}
        </section>

        {/* SECTION TITLE */}
        <section style={{ textAlign: "center", marginTop: 40 }}>
          <h2 style={styles.sectionTitle}>Products</h2>
        </section>

        {/* RESPONSIVE PRODUCT LAYOUT */}
        <section
          style={{
            marginTop: 20,
            marginLeft: 20,
            width: "95%",
            padding: "0 16px",
            boxSizing: "border-box",
          }}
        >
          {/* MOBILE — 2x2 GRID */}
          {isMobile ? (
            <div style={styles.mobileGrid}>
              {filteredProducts.slice(0, 4).map((product) => (
                <div key={product.product_id} style={styles.mobileCardWrapper}>
                  <ProductCard product={product} addToCart={addToCart} />
                </div>
              ))}
            </div>
          ) : (
            /* DESKTOP SLIDER */
            <div style={styles.sliderRow}>
              {getVisibleProducts().map((product) => (
                <div
                  key={product.product_id}
                  style={{
                    minWidth: `${100 / visibleCount}%`,
                    padding: "0 8px",
                    marginBottom: 10,
                    boxSizing: "border-box",
                  }}
                >
                  <ProductCard product={product} addToCart={addToCart} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <SideBySide />
      <BrandStatement />
      <Testimonials />
      <WhyShopWithUs />
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

  tabsWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    overflowX: "auto",
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
    whiteSpace: "nowrap",
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 20,
  },

  sliderRow: {
    display: "flex",
    overflow: "hidden",
  },

  // MOBILE GRID
  mobileGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    padding: "0 10px",
  },

  mobileCardWrapper: {
    transform: "scale(0.85)",
    width: "100%",
  },

  // MOBILE BUBBLE NAV
  mobileBubbleWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridAutoRows: "50px",
    gap: "8px",
    padding: "0 10px",
    justifyContent: "center",
  },

  mobileBubble: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    padding: "8px 12px",
    fontSize: 14,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "0.2s",
  },
};
