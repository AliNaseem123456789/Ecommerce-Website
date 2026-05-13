import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { CartContext } from "../components/CartContext";
import { supabase } from "../pages/SupabaseClient";
import { useLocation } from "react-router-dom";
import QuickViewModal from "../components/QuickViewModal";
// MUI IMPORTS
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

// Helper function to convert relative paths to full Supabase URLs
const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Your Supabase storage base URL (NO trailing quote!)
  const SUPABASE_STORAGE_URL = 'https://ypoubhaujgmpxrzhbwpt.supabase.co/storage/v1/object/public';
  
  // Remove leading slash if present
  let cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Return full URL
  return `${SUPABASE_STORAGE_URL}/${cleanPath}`;
};
// ========== Fetch all images for a product ==========
const getProductImages = async (productId, asin) => {
  console.log(`\n📸 getProductImages called for:`, { productId, asin });
  
  try {
    let query = supabase
      .from("product_images")
      .select("*")
      .order("image_number", { ascending: true });
    
    if (asin) {
      query = query.eq("asin", asin);
      console.log(`   Querying by ASIN: ${asin}`);
    } else {
      query = query.eq("product_id", productId);
      console.log(`   Querying by product_id: ${productId}`);
    }
    
    const { data, error } = await query;
    
    console.log(`   Query returned ${data?.length || 0} records`);
    
    if (data && !error) {
      // Log each image found
      data.forEach((img, idx) => {
        console.log(`   📷 Image ${idx + 1}: type=${img.image_type}, number=${img.image_number}, url=${img.image_url}`);
      });
      
      // Convert relative paths to full Supabase URLs
      const imageUrls = data.map(img => getFullImageUrl(img.image_url));
      console.log(`   ✅ Returning ${imageUrls.length} full image URLs:`, imageUrls);
      return imageUrls;
    }
    
    console.log(`   ❌ No images found or error occurred`);
    return [];
  } catch (error) {
    console.error(`   ❌ Error fetching product images:`, error);
    return [];
  }
};

// ========== Get single image URL (fallback) ==========
const getProductImageUrl = async (productId, asin, imageType = 'main', imageNumber = 1) => {
  console.log(`🔍 getProductImageUrl called with:`, { productId, asin, imageType, imageNumber });
  
  try {
    let query = supabase
      .from("product_images")
      .select("image_url, old_naming, asin")
      .eq("image_type", imageType);
    
    if (asin) {
      query = query.eq("asin", asin);
      console.log(`   Querying by ASIN: ${asin}`);
    } else {
      query = query.eq("product_id", productId);
      console.log(`   Querying by product_id: ${productId}`);
    }
    
    const { data, error } = await query.maybeSingle();
    
    console.log(`   Query result:`, { data, error });
    
    if (data && !error) {
      // Convert to full URL
      const fullUrl = getFullImageUrl(data.image_url);
      console.log(`   ✅ Found image URL: ${fullUrl}`);
      return fullUrl;
    }
    
    return null;
  } catch (error) {
    console.error(`   ❌ Error fetching image URL:`, error);
    return null;
  }
};

// MAIN SHOP COMPONENT
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
    console.log("🔄 Shop component mounted, fetching categories...");
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log("🔄 Categories or filters changed, fetching products...");
    if (categories.length > 0) fetchProducts();
  }, [categories, selectedCategories, sort]);

  const fetchCategories = async () => {
    console.log("📁 Fetching categories...");
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
      console.error("❌ Error fetching categories:", error);
    } else {
      console.log(`✅ Fetched ${data?.length || 0} categories:`, data?.map(c => c.name));
      setCategories(data);
    }
  };

  const fetchProducts = async () => {
    console.log("\n🛒 Fetching products with filters...");
    console.log("   Selected categories:", selectedCategories);
    console.log("   Sort option:", sort);
    
    let query = supabase.from("products").select("*");

    if (selectedCategories.length > 0) {
      query = query.in("category_id", selectedCategories);
      console.log(`   Filtering by categories: ${selectedCategories.join(', ')}`);
    }

    if (sort === "price_asc") {
      query = query.order("price", { ascending: true });
      console.log("   Sorting by price: low to high");
    }
    if (sort === "price_desc") {
      query = query.order("price", { ascending: false });
      console.log("   Sorting by price: high to low");
    }
    if (sort === "rating") {
      query = query.order("avg_rating", { ascending: false });
      console.log("   Sorting by rating: highest first");
    }

    const { data, error } = await query;
    
    if (error) {
      console.error("❌ Error fetching products:", error);
      return;
    }
    
    console.log(`✅ Fetched ${data?.length || 0} products from database`);
    console.log("   Product IDs:", data?.map(p => `${p.product_id} (ASIN: ${p.asin || 'none'})`));

    // Process products with Supabase images
    console.log("\n🖼️ Processing images for each product...");
    const extended = await Promise.all((data || []).map(async (p, index) => {
      console.log(`\n--- Processing product ${index + 1}/${data.length} ---`);
      console.log(`   Product ID: ${p.product_id}`);
      console.log(`   ASIN: ${p.asin || 'none'}`);
      console.log(`   Name: ${p.name?.substring(0, 50)}...`);
      
      const category = categories.find((c) => c.category_id === p.category_id);
      console.log(`   Category: ${category?.name || 'Uncategorized'}`);
      
      // Get images from Supabase product_images table
      const productImages = await getProductImages(p.product_id, p.asin);
      
      // Create image URLs array (main + additional)
      let imageUrls = [];
      if (productImages.length > 0) {
        imageUrls = productImages;
        console.log(`   ✅ Using ${imageUrls.length} images from product_images table`);
      } else {
        console.log(`   ⚠️ No images found in product_images, trying fallback...`);
        const mainImage = await getProductImageUrl(p.product_id, p.asin, 'main');
        if (mainImage) {
          imageUrls = [mainImage];
          console.log(`   ✅ Fallback found main image: ${mainImage}`);
        } else {
          console.log(`   ❌ No fallback image found`);
        }
      }
      
      console.log(`   Final image URLs for this product:`, imageUrls);
      
      const extendedProduct = {
        ...p,
        images: imageUrls,
        categoryName: category ? category.name : "Uncategorized",
      };
      
      return extendedProduct;
    }));

    console.log("\n✅ All products processed!");
    console.log(`📊 Total products with images: ${extended.filter(p => p.images?.length > 0).length}/${extended.length}`);
    
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
        {!isMobile && (
          <Box width="22%">
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </Box>
        )}

        <Box flex={1}>
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

          <Box
            display="grid"
            gridTemplateColumns={grid === 1 ? "1fr" : `repeat(${grid}, 1fr)`}
            gap={3}
            mt={3}
          >
            {products.map((p) => (
              <ProductCard
                key={p.product_id}
                product={{ ...p, images: p.images }}
                addToCart={addToCart}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </Box>
        </Box>
      </Box>

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