import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { CartContext } from "../components/CartContext";
import { supabase } from "../pages/SupabaseClient";
import { useLocation } from "react-router-dom";

function Shop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category"); // category_id from Navbar

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [Number(initialCategory)] : []
  );
  const [grid, setGrid] = useState(3);
  const [sort, setSort] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { addToCart } = useContext(CartContext);

  // Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products whenever selectedCategories or sort changes
  useEffect(() => {
    fetchProducts();
  }, [selectedCategories, sort, categories]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    if (data) setCategories(data);
  };

  // Fetch products from supabase
  const fetchProducts = async () => {
    let query = supabase.from("products").select("*");

    // Apply category filter
    if (selectedCategories.length > 0) {
      query = query.in("category_id", selectedCategories);
    }

    // Apply sorting
    if (sort === "price_asc") query = query.order("price", { ascending: true });
    if (sort === "price_desc") query = query.order("price", { ascending: false });
    if (sort === "rating") query = query.order("avg_rating", { ascending: false });

    const { data } = await query;

    // Extend products with staticImages and categoryName
    const extended = (data || []).map((p) => {
      const formats = ["avif", "webp", "jpg", "jpeg", "png"];
      const maxImages = 6;
      const staticImages = Array.from({ length: maxImages }).flatMap((_, index) =>
        formats.map(
          (ext) => `/assets/products/${p.product_id}/${index === 0 ? "main" : index}.${ext}`
        )
      );

      const category = categories.find((c) => c.category_id === p.category_id);

      return {
        ...p,
        staticImages,
        categoryName: category ? category.name : "Uncategorized",
      };
    });

    setProducts(extended);
  };

  // Remove single category filter
  const removeCategory = (id) =>
    setSelectedCategories(selectedCategories.filter((c) => c !== id));

  // Clear all filters
  const clearAll = () => {
    setSelectedCategories([]);
    setSort("");
  };

  const gridOptions = isMobile ? [2, "list"] : [2, 3, 4, "list"];
  const getIcon = (item) => {
    if (item === "list") return "≡"; 
    if (item === 2) return "▦"; 
    if (item === 3) return "▤"; 
    if (item === 4) return "▧"; 
    return item;
  };

  return (
    <div style={{ width: "100%", padding: "20px", position: "relative" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "40px",
        }}
      >
        Shop
      </h1>

      <div style={{ display: "flex", gap: "20px", position: "relative" }}>
        {/* DESKTOP FILTER SIDEBAR */}
        {!isMobile && (
          <div style={{ width: "22%", padding: "10px" }}>
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        )}

        {/* MOBILE FILTER TAB */}
        {isMobile && !sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(true)}
            style={{
              position: "fixed",
              top: "200px",
              left: "0px",
              background: "#f3f4f6",
              padding: "10px 6px",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              borderRadius: "6px 6px 0 0",
              fontWeight: "600",
              cursor: "pointer",
              zIndex: 2500,
              boxShadow: "0 0 6px rgba(0,0,0,0.15)",
            }}
          >
            Filters
          </div>
        )}

        {/* MOBILE SLIDE-IN SIDEBAR */}
        {isMobile && sidebarOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100%",
              width: "75%",
              background: "#fff",
              zIndex: 3000,
              paddingTop: "80px",
              paddingLeft: "15px",
              paddingRight: "15px",
              overflowY: "auto",
              boxShadow: "2px 0 10px rgba(0,0,0,0.25)",
              transition: "transform 0.3s ease",
            }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "absolute",
                top: "60px",
                right: "15px",
                fontSize: "32px",
                fontWeight: "bold",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                zIndex: 3100,
              }}
            >
              ×
            </button>

            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        )}

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, padding: "10px" }}>
          {/* TOP BAR: count + grid + sort */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div style={{ fontSize: "16px", color: "#4b5563" }}>
              Showing {products.length} results
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {/* GRID ICON BUTTONS */}
              <div style={{ display: "flex", gap: "10px" }}>
                {gridOptions.map((item) => {
                  const isActive = grid === item || (grid === 1 && item === "list");
                  return (
                    <button
                      key={item}
                      onClick={() => setGrid(item === "list" ? 1 : item)}
                      style={{
                        padding: "8px 12px",
                        fontSize: "18px",
                        borderRadius: "8px",
                        border: isActive ? "2px solid #0284c7" : "1px solid #d1d5db",
                        background: isActive ? "#e0f2fe" : "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {getIcon(item)}
                    </button>
                  );
                })}
              </div>

              {/* SORT */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                }}
              >
                <option value="">Default</option>
                <option value="price_asc">Price Low → High</option>
                <option value="price_desc">Price High → Low</option>
                <option value="rating">Top Rating</option>
              </select>
            </div>
          </div>

          {/* ACTIVE FILTER TAGS */}
          {selectedCategories.length > 0 && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {selectedCategories.map((id) => {
                const cat = categories.find((c) => c.category_id === id);
                return (
                  <div
                    key={id}
                    style={{
                      padding: "6px 12px",
                      background: "#f3f4f6",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {cat?.name}
                    <span onClick={() => removeCategory(id)} style={{ cursor: "pointer" }}>
                      ×
                    </span>
                  </div>
                );
              })}

              <span
                onClick={clearAll}
                style={{
                  color: "#0284c7",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Clear All
              </span>
            </div>
          )}

          {/* PRODUCT GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: grid === 1 ? "1fr" : `repeat(${grid}, 1fr)`,
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {products.map((p) => (
              <ProductCard
                key={p.product_id}
                product={{ ...p, images: p.staticImages }}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
