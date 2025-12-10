import React, { useState, useEffect } from "react";

// Sample testimonials
const testimonials = [
  {
    name: "Alice Johnson",
    text: "Amazing service! The products are top-notch and the delivery was super fast.",
    role: "Fashion Enthusiast",
  },
  {
    name: "Michael Smith",
    text: "I love the design and quality. Highly recommended store for anyone!",
    role: "Tech Lover",
  },
  {
    name: "Sara Lee",
    text: "Fast shipping and excellent customer support. Will buy again!",
    role: "Home Decor Lover",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = testimonials.length;

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <section
      style={{
        padding: "80px 6%",
        background: "#f9fafb",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: 34,
          fontWeight: 700,
          marginBottom: 50,
          color: "#222",
        }}
      >
        What Our Customers Say
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            style={{
              position: idx === currentIndex ? "relative" : "absolute",
              opacity: idx === currentIndex ? 1 : 0,
              transform: idx === currentIndex ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease-in-out",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px 20px", // Increased top padding to compensate for removed image
              background: "white",
              borderRadius: 15,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            {/* Removed Image — Replaced with spacing */}
            <div style={{ height: 60, marginBottom: 10 }}></div>

            <p
              style={{
                fontSize: 20,
                fontStyle: "italic",
                color: "#555",
                lineHeight: 1.6,
                marginBottom: 15,
              }}
            >
              "{t.text}"
            </p>

            <p
              style={{
                fontWeight: 700,
                color: "#111",
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              {t.name}
            </p>

            <p style={{ color: "#777", fontSize: 14 }}>{t.role}</p>
          </div>
        ))}
      </div>

      {/* Dots / Indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginTop: 30,
        }}
      >
        {testimonials.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: idx === currentIndex ? "#111" : "#ccc",
              cursor: "pointer",
              transform: idx === currentIndex ? "scale(1.3)" : "scale(1)",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </section>
  );
}
