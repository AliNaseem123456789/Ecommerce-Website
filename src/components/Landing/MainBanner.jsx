import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MainBanner({ heroImages }) {
  const navigate = useNavigate();
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

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
    <section style={styles.bannerContainer}>
      {/* BACKGROUND IMAGE */}
      {heroImages.map((slide, index) => (
        <motion.img
          key={index}
          src={slide.image}
          alt=""
          style={styles.heroImage}
          animate={{ opacity: index === currentHero ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        />
      ))}

      {/* LEFT SIDE TEXT */}
      <div style={styles.leftTextBox}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero}
            variants={sentenceVariant}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* TITLE */}
            <motion.h1 style={styles.bigTitle}>
              {heroImages[currentHero].title.split("").map((char, i) => (
                <motion.span key={i} variants={letterVariant}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* SUBTITLE */}
            <motion.h2 style={styles.subTitle}>
              {heroImages[currentHero].subtitle.split("").map((char, i) => (
                <motion.span key={i} variants={letterVariant}>
                  {char}
                </motion.span>
              ))}
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.p style={styles.description}>
              {heroImages[currentHero].description.split("").map((char, i) => (
                <motion.span key={i} variants={letterVariant}>
                  {char}
                </motion.span>
              ))}
            </motion.p>

            {/* BUTTONS */}
            <div style={styles.buttonRow}>
             <button
  style={styles.primaryButton}
  onClick={() => navigate(`/product/${heroImages[currentHero].productId}`)}
>
  Shop Now
</button>
              <button
                style={styles.secondaryButton}
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
    height: "100vh",
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
  },

  leftTextBox: {
    position: "absolute",
    top: "50%",
    left: "6%",
    transform: "translateY(-50%)",
    zIndex: 5,
    width: "40%",
    color: "#fff",
  },

  bigTitle: {
    fontSize: "62px",
    fontWeight: "800",
    marginBottom: "10px",
    fontFamily: "'Poppins', sans-serif",
    color: "white",
  },

  subTitle: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#dedede",
  },

  description: {
    fontSize: "18px",
    lineHeight: 1.6,
    marginBottom: "25px",
    color: "#e6e6e6",
    maxWidth: "500px",
  },

  buttonRow: {
    display: "flex",
    gap: "12px",
  },

  primaryButton: {
    background: "black",
    color: "white",
    padding: "12px 28px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },

  secondaryButton: {
    background: "white",
    color: "black",
    padding: "12px 28px",
    borderRadius: "6px",
    border: "2px solid black",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
};
