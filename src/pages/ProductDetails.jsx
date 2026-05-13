import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./SupabaseClient";
import { CartContext } from "../components/CartContext";
import { WishlistContext } from "../components/WishlistContext";
import ReviewModal from "../components/ReviewModal";
import QuestionModal from "../components/QuestionModal";
import logo from "../assets/Logos/paycard2.png";
import LiveViewers from "../components/LiveViewers";
import Breadcrumbs from "../components/Breadcrumbs";

// MUI
import {
  Box,
  Button,
  Tabs,
  Tab,
  Typography,
  Paper,
  Rating,
  Stack,
  IconButton,
} from "@mui/material";

import { FaStar, FaRegStar, FaQuestionCircle, FaShareAlt } from "react-icons/fa";

// Helper function to convert relative paths to full Supabase URLs
const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  const SUPABASE_STORAGE_URL = 'https://ypoubhaujgmpxrzhbwpt.supabase.co/storage/v1/object/public';
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  return `${SUPABASE_STORAGE_URL}/${cleanPath}`;
};

// ========== Fetch ALL images for a product from Supabase ==========
const getProductImagesFromDB = async (productId, asin) => {
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
      // Convert all images to full URLs
      const imageUrls = data.map(img => getFullImageUrl(img.image_url));
      return imageUrls;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching product images:", error);
    return [];
  }
};

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const isWishlisted = wishlist.includes(Number(id));

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    fetchQuestions();
  }, [id]);

  const fetchProduct = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("product_id", id)
      .single();
    setProduct(data);
    await loadProductImages(data);
  };

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("product_reviews")
      .select("*")
      .eq("product_id", id)
      .order("created_at", { ascending: false });
    setReviews(data || []);
  };

  const fetchQuestions = async () => {
    const { data } = await supabase
      .from("product_questions")
      .select("*")
      .eq("product_id", id)
      .order("created_at", { ascending: false });
    setQuestions(data || []);
  };

  // NEW: Load images from Supabase storage (handles both legacy and ASIN)
  const loadProductImages = async (product) => {
    if (!product) return;
    
    // Fetch images from product_images table
    const images = await getProductImagesFromDB(product.product_id, product.asin);
    
    if (images.length > 0) {
      console.log(`Found ${images.length} images for product ${product.product_id}`);
      setProductImages(images);
    } else {
      // Fallback to placeholder
      console.log(`No images found for product ${product.product_id}`);
      setProductImages(["https://via.placeholder.com/600x600"]);
    }
  };

  if (!product)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  const modernButtonStyles = {
    borderRadius: "50px",
    textTransform: "none",
    fontWeight: 700,
    height: "52px",
  };

  return (
    <Box sx={{ maxWidth: 1300, mx: "auto", p: 3 }}>
      <Breadcrumbs productName={product.name} />
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        
        {/* LEFT SIDE - IMAGES */}
        <Box sx={{ display: "flex", gap: 2, flex: "1 1 300px", minWidth: 280 }}>
          
          {/* THUMBNAIL STRIP - Shows ALL images */}
          {productImages.length > 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: 80, maxHeight: 500, overflowY: "auto" }}>
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    border: selectedImageIndex === index
                      ? "2px solid #1976d2"
                      : "1px solid #e0e0e0",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    console.error(`Failed to load thumbnail: ${img}`);
                    e.target.style.display = "none";
                  }}
                />
              ))}
            </Box>
          )}

          {/* MAIN IMAGE */}
          <Paper sx={{ p: 2, borderRadius: 3, flexGrow: 1 }}>
            <img
              src={productImages[selectedImageIndex] || "https://via.placeholder.com/600x600"}
              alt={product.name}
              style={{
                width: "100%",
                maxWidth: 500,
                borderRadius: 14,
                background: "#f5f5f5",
              }}
              onError={(e) => {
                console.error(`Failed to load main image: ${e.target.src}`);
                e.target.src = "https://via.placeholder.com/600x600";
              }}
            />
            
            {/* Image Counter */}
            {productImages.length > 1 && (
              <Typography 
                variant="caption" 
                sx={{ 
                  display: "block", 
                  textAlign: "center", 
                  mt: 1,
                  color: "gray"
                }}
              >
                {selectedImageIndex + 1} / {productImages.length} images
              </Typography>
            )}
          </Paper>
        </Box>

        {/* RIGHT PRODUCT INFO */}
        <Box sx={{ flex: "1 1 300px", minWidth: 280 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h4" fontWeight={700}>
              {product.name}
            </Typography>

            <IconButton
              onClick={() => toggleWishlist(product.product_id)}
              sx={{
                color: isWishlisted ? "#facc15" : "gray",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.1)", color: "black" },
              }}
            >
              {isWishlisted ? (
                <FaStar size={22} color="#facc15" />
              ) : (
                <FaRegStar size={22} />
              )}
            </IconButton>
          </Box>

          <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
            ${product.price}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
            <Rating value={product.avg_rating || 0} precision={0.5} readOnly />
            <Typography>({reviews.length} reviews)</Typography>
          </Stack>
          <LiveViewers />

          {/* QUANTITY + ADD TO CART BUTTONS */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                fullWidth
                variant="contained"
                onClick={() => addToCart({ ...product, quantity })}
                sx={{
                  ...modernButtonStyles,
                  background: "#f1f1f1",
                  color: "black",
                  boxShadow: "none",
                }}
              >
                ADD TO CART
              </Button>
            </Stack>

            <Button
              fullWidth
              variant="contained"
              sx={{
                ...modernButtonStyles,
                mt: 2,
                background: "black",
                color: "white",
                ":hover": { background: "#333" },
              }}
            >
              BUY NOW
            </Button>

            {/* ACTION BUTTON ROW */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3,
                mb: 3,
                flexWrap: "wrap",
              }}
            >
              <Box
                onClick={() => toggleWishlist(product.product_id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  px: 2,
                  py: 1,
                  borderRadius: "25px",
                  transition: "0.2s",
                  "&:hover": { background: "#f3f4f6" },
                }}
              >
                {isWishlisted ? (
                  <FaStar size={20} color="black" />
                ) : (
                  <FaRegStar size={20} color="black" />
                )}
                <Typography sx={{ fontSize: 15, fontWeight: 600, color: "black" }}>
                  Wishlist
                </Typography>
              </Box>

              <Box
                onClick={() => setShowQuestionModal(true)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  px: 2,
                  py: 1,
                  borderRadius: "25px",
                  transition: "0.2s",
                  "&:hover": { background: "#f3f4f6" },
                }}
              >
                <FaQuestionCircle size={20} color="black" />
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>Ask a Question</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  px: 2,
                  py: 1,
                  borderRadius: "25px",
                  transition: "0.2s",
                  "&:hover": { background: "#f3f4f6" },
                }}
                onClick={() => navigator.share?.({ title: product.name })}
              >
                <FaShareAlt size={20} color="black" />
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>Share</Typography>
              </Box>
            </Box>

            {/* DIVIDER LINE */}
            <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 2 }} />

            {/* ESTIMATED DELIVERY */}
            <Box sx={{ mt: 2, mb: 3 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                Estimated Delivery:
              </Typography>
              <Typography sx={{ fontSize: 15, color: "gray" }}>
                04 - 11 Dec, 2025
              </Typography>
            </Box>

            {/* PAYMENT LOGOS */}
            <Box
              sx={{
                background: "#f3f4f6",
                borderRadius: "12px",
                p: 2,
                textAlign: "center",
                width: "100%",
              }}
            >
              <img
                src={logo}
                alt="Payment Methods"
                style={{
                  width: "220px",
                  height: "auto",
                  marginBottom: "8px",
                }}
              />
              <Typography sx={{ fontSize: 14, color: "#555" }}>
                Guaranteed safe & secure checkout
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* TABS SECTION */}
      <Box sx={{ mt: 6 }}>
        <Tabs
          value={tabIndex}
          onChange={(e, idx) => setTabIndex(idx)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
        >
          <Tab label="Description" />
          <Tab label="Reviews" />
          <Tab label="Questions" />
        </Tabs>

        {/* DESCRIPTION */}
        {tabIndex === 0 && (
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography fontSize={18} lineHeight={1.8}>
              {product.description}
            </Typography>
          </Paper>
        )}

        {/* REVIEWS */}
        {tabIndex === 1 && (
          <Box>
            <Button
              variant="contained"
              sx={{
                mb: 3,
                background: "black",
                color: "white",
                borderRadius: "50px",
                px: 4,
                py: 1.4,
                textTransform: "none",
                fontWeight: 600,
              }}
              onClick={() => setShowReviewModal(true)}
            >
              Write a Review
            </Button>

            {reviews.length === 0 && <Typography>No reviews yet.</Typography>}

            <Stack spacing={2}>
              {reviews.map((r) => (
                <Paper key={r.review_id} sx={{ p: 3, borderRadius: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={700}>{r.title}</Typography>
                    <Rating value={r.rating} readOnly />
                  </Stack>
                  <Typography sx={{ mt: 1 }}>{r.review}</Typography>
                  <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                    {r.name} – {new Date(r.created_at).toLocaleDateString()}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* QUESTIONS */}
        {tabIndex === 2 && (
          <Box>
            <Button
              variant="contained"
              sx={{
                mb: 3,
                background: "#f1f1f1",
                color: "black",
                borderRadius: "50px",
                px: 4,
                py: 1.4,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "none",
              }}
              onClick={() => setShowQuestionModal(true)}
            >
              Ask a Question
            </Button>

            {questions.length === 0 && <Typography>No questions yet.</Typography>}

            <Stack spacing={2}>
              {questions.map((q) => (
                <Paper key={q.question_id} sx={{ p: 3, borderRadius: 3 }}>
                  <Typography fontWeight={700}>{q.name} asks:</Typography>
                  <Typography sx={{ mt: 1 }}>{q.question}</Typography>
                  <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                    {new Date(q.created_at).toLocaleDateString()}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      {/* MODALS */}
      {showReviewModal && (
        <ReviewModal
          productId={id}
          onClose={() => setShowReviewModal(false)}
          onAdded={(newReview) => setReviews([newReview, ...reviews])}
        />
      )}

      {showQuestionModal && (
        <QuestionModal
          productId={id}
          onClose={() => setShowQuestionModal(false)}
          onAdded={(newQ) => setQuestions([newQ, ...questions])}
        />
      )}
    </Box>
  );
}

export default ProductDetails;