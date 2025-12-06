import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { CartContext } from "../components/CartContext";
import { supabase } from "../pages/SupabaseClient";
import { useLocation } from "react-router-dom";
import QuickViewModal from "../components/QuickViewModal";

// ---------------------
// MUI IMPORTS
// ---------------------
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  IconButton,
  Paper,
} from "@mui/material";

// ---------------------
// ICONS (SVG COMPONENTS)
// ---------------------
const TwoLineIcon = (props) => (
  <svg width="20" height="20" fill="none" {...props}>
    <rect x="5" y="5" width="3" height="10" rx="1" fill="currentColor" />
    <rect x="12" y="5" width="3" height="10" rx="1" fill="currentColor" />
  </svg>
);

const ThreeLineIcon = (props) => (
  <svg width="20" height="20" fill="none" {...props}>
    <rect x="3" y="5" width="3" height="10" rx="1" fill="currentColor" />
    <rect x="8.5" y="5" width="3" height="10" rx="1" fill="currentColor" />
    <rect x="14" y="5" width="3" height="10" rx="1" fill="currentColor" />
  </svg>
);

const FourLineIcon = (props) => (
  <svg width="20" height="20" fill="none" {...props}>
    <rect x="2" y="5" width="2.7" height="10" rx="1" fill="currentColor" />
    <rect x="6.5" y="5" width="2.7" height="10" rx="1" fill="currentColor" />
    <rect x="11" y="5" width="2.7" height="10" rx="1" fill="currentColor" />
    <rect x="15.5" y="5" width="2.7" height="10" rx="1" fill="currentColor" />
  </svg>
);

const HamburgerIcon = (props) => (
  <svg width="24" height="24" fill="none" {...props}>
    <rect x="4" y="6" width="16" height="2.2" rx="1" fill="currentColor" />
    <rect x="4" y="11" width="16" height="2.2" rx="1" fill="currentColor" />
    <rect x="4" y="16" width="16" height="2.2" rx="1" fill="currentColor" />
  </svg>
);

// ---------------------
// MAIN SHOP COMPONENT
// ---------------------
function Shop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get("category");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [Number(initialCategory)] : []
  );

  const [grid, setGrid] = useState(3);
  const [sort, setSort] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) fetchProducts();
  }, [categories, selectedCategories, sort]);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    if (data) setCategories(data);
  };

  const fetchProducts = async () => {
    let query = supabase.from("products").select("*");

    if (selectedCategories.length > 0) {
      query = query.in("category_id", selectedCategories);
    }

    if (sort === "price_asc") query = query.order("price", { ascending: true });
    if (sort === "price_desc") query = query.order("price", { ascending: false });
    if (sort === "rating") query = query.order("avg_rating", { ascending: false });

    const { data } = await query;

    const extended = (data || []).map((p) => {
      const formats = ["avif", "webp", "jpg", "jpeg", "png"];
      const maxImages = 6;

      const staticImages = Array.from({ length: maxImages }).flatMap((_, index) =>
        formats.map(
          (ext) =>
            `/assets/products/${p.product_id}/${index === 0 ? "main" : index}.${ext}`
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const removeCategory = (id) =>
    setSelectedCategories(selectedCategories.filter((c) => c !== id));

  const clearAll = () => {
    setSelectedCategories([]);
    setSort("");
  };

  const gridOptions = isMobile ? [2, "list"] : [2, 3, 4, "list"];

  const getIconComponent = (item) => {
    if (item === "list") return <HamburgerIcon />;
    if (item === 2) return <TwoLineIcon />;
    if (item === 3) return <ThreeLineIcon />;
    if (item === 4) return <FourLineIcon />;
    return null;
  };

  return (
    <Box width="100%" px={3} pb={5}>
      <Typography
        variant="h3"
        align="center"
        fontWeight={700}
        mb={5}
        sx={{ fontFamily: "Inter, sans-serif" }}
      >
        Shop
      </Typography>

      <Box display="flex" gap={3}>
        {/* ---------------- Sidebar (Desktop Only) ---------------- */}
        {!isMobile && (
          <Box width="22%">
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </Box>
        )}

        {/* ---------------- Main Content ---------------- */}
        <Box flex={1}>
          {/* ---------------- Sorting + Icons Bar ---------------- */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
            flexWrap="wrap"
            gap={2}
          >
            <Typography fontSize="18px" color="grey.700" fontWeight={500}>
              Showing {products.length} results
            </Typography>

            <Box display="flex" alignItems="center" gap={2}>
              {/* GRID ICONS */}
              <Box display="flex" gap={1}>
                {gridOptions.map((item) => {
                  const isActive = grid === item || (grid === 1 && item === "list");
                  return (
                    <Paper
                      key={item}
                      elevation={isActive ? 3 : 0}
                      sx={{
                        p: 1,
                        borderRadius: "10px",
                        border: isActive
                          ? "2px solid #0284c7"
                          : "1px solid #d1d5db",
                        cursor: "pointer",
                        bgcolor: isActive ? "#e0f2fe" : "#fff",
                      }}
                      onClick={() => setGrid(item === "list" ? 1 : item)}
                    >
                      {getIconComponent(item)}
                    </Paper>
                  );
                })}
              </Box>
              {/* SORT SELECT */}
              <Select
                size="small"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                sx={{
                  minWidth: 150,
                  borderRadius: "10px",
                  fontSize: "15px",
                }}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="price_asc">Price Low → High</MenuItem>
                <MenuItem value="price_desc">Price High → Low</MenuItem>
                <MenuItem value="rating">Top Rating</MenuItem>
              </Select>
            </Box>
          </Box>

          {/* ---------------- Selected Filter Pills ---------------- */}
          {selectedCategories.length > 0 && (
            <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
              {selectedCategories.map((id) => {
                const cat = categories.find((c) => c.category_id === id);
                return (
                  <Paper
                    key={id}
                    sx={{
                      px: 2,
                      py: 1,
                      background: "#f3f4f6",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {cat?.name}
                    <span
                      onClick={() => removeCategory(id)}
                      style={{
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      ×
                    </span>
                  </Paper>
                );
              })}

              <Typography
                sx={{ color: "#0284c7", cursor: "pointer", fontWeight: 600 }}
                onClick={clearAll}
              >
                Clear All
              </Typography>
            </Box>
          )}

          {/* ---------------- PRODUCT GRID ---------------- */}
          <Box
            display="grid"
            gridTemplateColumns={grid === 1 ? "1fr" : `repeat(${grid}, 1fr)`}
            gap={3}
            mt={3}
          >
            {products.map((p) => (
              <ProductCard
                key={p.product_id}
                product={{ ...p, images: p.staticImages }}
                addToCart={addToCart}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* ---------------- QUICK VIEW MODAL ---------------- */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </Box>
  );
}

export default Shop;
