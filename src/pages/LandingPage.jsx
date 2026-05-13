import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import ProductCard from "../components/ProductCard";
import { supabase } from "../pages/SupabaseClient";

import LandingNavbar from "../components/Landing/LandingNavbar";
import MainBanner from "../components/Landing/MainBanner";
import LandingProductCard from "../components/Landing/LandingProductCard";

import SideBySide from "../components/Landing/SideBySide";
import BrandStatement from "../components/Landing/BrandStatements";
import WhyShopWithUs from "../components/Landing/WhyShopWithUs";

import product1 from "../assets/banners/product1banner.png";
import product2 from "../assets/banners/product2banner.png";
import product3 from "../assets/banners/product3banner.png";

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

// ========== Fetch all images for a product ==========
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
      // Convert relative paths to full Supabase URLs
      const imageUrls = data.map(img => getFullImageUrl(img.image_url));
      return imageUrls;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching product images:", error);
    return [];
  }
};

export default function LandingPage() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;

  const [slideIndex, setSlideIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const visibleCount = isMobile ? 2 : 4;
  const featuredVisibleCount = isMobile ? 2 : 4;

  const [selectedCategory, setSelectedCategory] = useState("all");

  const FEATURED_IDS = [1, 2, 5, 23, 25, 26, 13, 8];

  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
    fetchFeaturedProducts();

    const resizeHandler = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  async function fetchCategories() {
    const { data } = await supabase.from("categories").select("*");
    setCategories(data || []);
  }

  async function fetchAllProducts() {
    setIsLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    // Process products with images
    const productsWithImages = await Promise.all((data || []).map(async (product) => {
      const productImages = await getProductImages(product.product_id, product.asin);
      return {
        ...product,
        images: productImages
      };
    }));

    setAllProducts(productsWithImages);
    setIsLoading(false);
  }

  async function fetchFeaturedProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .in("product_id", FEATURED_IDS);

    // Process featured products with images
    const featuredWithImages = await Promise.all((data || []).map(async (product) => {
      const productImages = await getProductImages(product.product_id, product.asin);
      return {
        ...product,
        images: productImages
      };
    }));

    setFeaturedProducts(featuredWithImages);
  }

  const filteredAllProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter(
          (p) => String(p.category_id) === String(selectedCategory)
        );

  const getVisibleProducts = () => {
    if (filteredAllProducts.length === 0) return [];
    return Array.from({ length: visibleCount }).map(
      (_, i) =>
        filteredAllProducts[(slideIndex + i) % filteredAllProducts.length]
    );
  };

  const getVisibleFeatured = () => {
    if (featuredProducts.length === 0) return [];
    const result = [];
    for (let i = 0; i < featuredVisibleCount; i++) {
      const index = (featuredIndex + i) % featuredProducts.length;
      result.push(featuredProducts[index]);
    }
    return result;
  };

  const handleNextFeatured = () => {
    if (featuredProducts.length <= featuredVisibleCount) return;
    setFeaturedIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const handlePrevFeatured = () => {
    if (featuredProducts.length <= featuredVisibleCount) return;
    setFeaturedIndex((prev) => 
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    if (featuredProducts.length <= featuredVisibleCount) return;
    
    const interval = setInterval(() => {
      handleNextFeatured();
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredProducts.length, featuredVisibleCount, featuredIndex]);

  if (isLoading) {
    return <div style={styles.loader}>Loading products...</div>;
  }

  return (
    <>
      <LandingNavbar />

      {/* HERO BANNER */}
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

      {/* ALL PRODUCTS SECTION */}
      <section style={{ textAlign: "center", marginTop: 40, marginBottom: 10 }}>
        <h2 style={styles.sectionTitle}>All Products</h2>
      </section>

      {/* CATEGORY NAVBAR */}
      <section style={{ marginTop: 30 }}>
        {isMobile ? (
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
                    onClick={() => {
                      setSelectedCategory(catId);
                      setSlideIndex(0);
                    }}
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
                All
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

      {/* ALL PRODUCTS SLIDER */}
      <section style={{ marginTop: 20, marginBottom: 10, padding: "0 0px" }}>
        {isMobile ? (
          <div style={styles.mobileGrid}>
            {filteredAllProducts.slice(0, 4).map((product) => (
              <div key={product.product_id} style={styles.mobileCardWrapper}>
                <ProductCard product={product} addToCart={addToCart} />
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.sliderRow}>
            {getVisibleProducts().map((product) => (
              <div
                key={product.product_id}
                style={{ 
                  minWidth: `${100 / visibleCount}%`, 
                  padding: "0 8px",
                  marginBottom: "30px"
                }}
              >
                <ProductCard product={product} addToCart={addToCart} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MAIN GRAY BACKGROUND SECTION */}
      <section style={styles.graySection}>
        <SideBySide />
        <div style={styles.sectionSpacing}>
          <BrandStatement />
        </div>

        {/* BEST SELLERS */}
        <section style={styles.bestSellersSection}>
          <h2 style={styles.bestTitle}>Best Sellers</h2>
          <p style={styles.bestSubtitle}>
            Our most loved products, hand-picked and trending right now.
          </p>

          {/* Slider Container */}
          <div style={styles.sliderContainer}>
            {featuredProducts.length > featuredVisibleCount && (
              <button 
                onClick={handlePrevFeatured}
                style={styles.arrowButton}
                className="arrow-left"
              >
                ‹
              </button>
            )}

            <div style={styles.sliderRow}>
              {getVisibleFeatured().map((product, index) => (
                <div
                  key={`${product.product_id}-${index}`}
                  style={{
                    minWidth: `${100 / featuredVisibleCount}%`,
                    padding: "0 8px",
                    transition: "transform 0.5s ease",
                    marginBottom: "30px"
                  }}
                >
                  <LandingProductCard product={product} />
                </div>
              ))}
            </div>

            {featuredProducts.length > featuredVisibleCount && (
              <button 
                onClick={handleNextFeatured}
                style={styles.arrowButton}
                className="arrow-right"
              >
                ›
              </button>
            )}
          </div>

          {/* Dots Indicator */}
          {featuredProducts.length > featuredVisibleCount && (
            <div style={styles.dotsContainer}>
              {Array.from({ 
                length: Math.ceil(featuredProducts.length / featuredVisibleCount)
              }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const startIndex = i * featuredVisibleCount;
                    setFeaturedIndex(startIndex);
                  }}
                  style={{
                    ...styles.dot,
                    backgroundColor: 
                      Math.floor(featuredIndex / featuredVisibleCount) === i 
                        ? '#000' 
                        : '#ccc'
                  }}
                />
              ))}
            </div>
          )}
        </section>

        <div style={styles.sectionSpacing}>
          <WhyShopWithUs />
        </div>
      </section>
    </>
  );
}

/* ---------------- Styles ---------------- */
const styles = {
  loader: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    color: "#666",
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 20,
  },

  graySection: {
    background: "#f9fafb",
    width: "100%",
    paddingTop: "60px",
    paddingBottom: "60px",
  },

  bestSellersSection: {
    background: "white",
    width: "100%",
    padding: "60px 20px",
    textAlign: "center",
    marginTop: "60px",
    marginBottom: "60px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    position: "relative",
  },

  sectionSpacing: {
    marginTop: "60px",
    marginBottom: "60px",
  },

  sliderContainer: {
    position: "relative",
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 0",
  },

  arrowButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    fontSize: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    zIndex: 10,
  },

  dotsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginTop: "40px",
  },

  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },

  sliderRow: {
    display: "flex",
    overflow: "hidden",
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
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

  mobileGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
  },

  mobileCardWrapper: {
    transform: "scale(0.9)",
    marginBottom: "20px",
  },

  bestTitle: {
    fontSize: "34px",
    fontWeight: "700",
    fontFamily: "Poppins, sans-serif",
    marginBottom: "10px",
    color: "#111",
  },

  bestSubtitle: {
    fontSize: "16px",
    fontWeight: "400",
    color: "#555",
    maxWidth: "500px",
    margin: "0 auto 40px auto",
    lineHeight: "1.6",
  },
};

// Add CSS for arrow positioning
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .arrow-left {
    left: -24px;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .arrow-right {
    right: -24px;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  .arrow-left:hover, .arrow-right:hover {
    background: #f8f8f8;
    border-color: #999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`, styleSheet.cssRules.length);