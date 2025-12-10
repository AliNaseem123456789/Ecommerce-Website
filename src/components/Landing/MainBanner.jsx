import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MainBanner({ heroImages }) {
  const navigate = useNavigate();
  const [currentHero, setCurrentHero] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 768;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sentenceVariant = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.03 },
    },
    exit: { opacity: 0, y: -20 },
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      style={{
        ...styles.bannerContainer,
        height: isMobile ? "70vh" : "100vh", // ⭐ Mobile height reduced
      }}
    >
      {/* BACKGROUND IMAGE */}
      {heroImages.map((slide, index) => (
        <motion.img
          key={index}
          src={slide.image}
          alt=""
          style={{
            ...styles.heroImage,
            objectPosition: isMobile ? "85% center" : "right center", // ⭐ Focus image on right
            transform: isMobile ? "translateX(0%)" : "none", // ⭐ Slight left push on mobile
          }}
          animate={{ opacity: index === currentHero ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        />
      ))}

      {/* LEFT SIDE TEXT */}
      <div
        style={{
          ...styles.leftTextBox,
          width: isMobile ? "88%" : "40%",
          left: isMobile ? "5%" : "6%",
          top: isMobile ? "55%" : "50%",
          transform: "translateY(-50%)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero}
            variants={sentenceVariant}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* TITLE */}
            <motion.h1
              style={{
                ...styles.bigTitle,
                fontSize: isMobile ? "32px" : "62px",
              }}
            >
              {heroImages[currentHero].title.split("").map((char, i) => (
                <motion.span key={i} variants={letterVariant}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* SUBTITLE */}
            <motion.h2
              style={{
                ...styles.subTitle,
                fontSize: isMobile ? "18px" : "28px",
              }}
            >
              {heroImages[currentHero].subtitle.split("").map((char, i) => (
                <motion.span key={i} variants={letterVariant}>
                  {char}
                </motion.span>
              ))}
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.p
              style={{
                ...styles.description,
                fontSize: isMobile ? "14px" : "18px",
                maxWidth: isMobile ? "100%" : "500px",
              }}
            >
              {heroImages[currentHero].description.split("").map((char, i) => (
                <motion.span key={i} variants={letterVariant}>
                  {char}
                </motion.span>
              ))}
            </motion.p>

            {/* BUTTONS */}
            <div
              style={{
                ...styles.buttonRow,
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "8px" : "12px",
              }}
            >
              <button
                style={{
                  ...styles.primaryButton,
                  padding: isMobile ? "10px 20px" : "12px 28px",
                  fontSize: isMobile ? "14px" : "16px",
                }}
                onClick={() =>
                  navigate(`/product/${heroImages[currentHero].productId}`)
                }
              >
                Shop Now
              </button>

              <button
                style={{
                  ...styles.secondaryButton,
                  padding: isMobile ? "10px 20px" : "12px 28px",
                  fontSize: isMobile ? "14px" : "16px",
                }}
                onClick={() => navigate("/shop")}
              >
                Shop More
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* STYLES */
const styles = {
  bannerContainer: {
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },

  heroImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    top: 0,
    left: 0,
    zIndex: 1,
    transition: "transform 0.4s ease",
  },

  leftTextBox: {
    position: "absolute",
    zIndex: 5,
    color: "#fff",
  },

  bigTitle: {
    fontWeight: "800",
    marginBottom: "10px",
    fontFamily: "'Poppins', sans-serif",
    color: "white",
  },

  subTitle: {
    fontWeight: "600",
    marginBottom: "15px",
    color: "#dedede",
  },

  description: {
    lineHeight: 1.6,
    marginBottom: "25px",
    color: "#e6e6e6",
  },

  buttonRow: {
    display: "flex",
  },

  primaryButton: {
    background: "black",
    color: "white",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  },

  secondaryButton: {
    background: "white",
    color: "black",
    borderRadius: "6px",
    border: "2px solid black",
    cursor: "pointer",
    fontWeight: "600",
  },
};
