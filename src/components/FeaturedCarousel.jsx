import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard"
export default function FeaturedCarousel({ products, addToCart }) {
  if (!products || products.length === 0) {
    return <div style={{ textAlign: "center", padding: "20px" }}>No products available</div>;
  }
  // Only show max 9 slides
  const limitedProducts = products.slice(0, 9);
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = limitedProducts.length;
  const timeoutRef = useRef(null);
  // Auto slide
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === length - 1 ? 0 : prevIndex + 1
        ),
      3000
    );
    return () => resetTimeout();
  }, [currentIndex, length]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <div style={{ overflow: "hidden", width: "100%" }}>
        <div
          style={{
            display: "flex",
            transition: "transform 0.7s ease-in-out",
            transform: `translateX(-${currentIndex * 260}px)`,  // Slide by card width
          }}
        >
          {limitedProducts.map((p, index) => (
            <div
              key={index}
              style={{
                flexShrink: 0,
                width: "260px",        // FIXED WIDTH → no empty slides
                paddingLeft: "8px",
                paddingRight: "8px",
              }}
            >
              <ProductCard product={p} addToCart={addToCart} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button onClick={prevSlide} style={arrowStyle("left")}>❮</button>
      <button onClick={nextSlide} style={arrowStyle("right")}>❯</button>

      {/* Dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
          gap: "8px",
        }}
      >
        {limitedProducts.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              cursor: "pointer",
              backgroundColor: idx === currentIndex ? "black" : "lightgray",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "8px",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  padding: "8px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
});
