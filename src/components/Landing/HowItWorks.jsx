// import React from "react";
import addtocart from "../../assets/Logos/cart.jpeg"
import browseproducts from "../../assets/Logos/browseproduct.jpeg"
import fastsecure from "../../assets/Logos/fastsecure.png"
import logo from "../../assets/Logos/logo2.png";
const steps = [
  {
    title: "Browse Products",
    description:
      "Explore our wide range of products and find the ones that suit your needs.",
    image: browseproducts,
  },
  {
    title: "Add to Cart",
    description:
      "Select your favorite items and add them to your cart with a single click.",
    image: addtocart,
  },
  {
    title: "Fast & Secure Checkout",
    description:
      "Enjoy a seamless, secure, and quick checkout process with multiple payment options.",
    image:fastsecure ,
  },
];

export default function HowItWorks() {
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
        How It Works
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          flexWrap: "nowrap", // Keep all cards in one row
        }}
      >
        {steps.map((step, idx) => (
          <div
            key={idx}
            style={{
              background: "white",
              padding: "30px 20px",
              borderRadius: 12,
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              flex: "0 0 250px", // fixed width for one-row layout
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.3s",
              cursor: "default",
            }}
          >
            <img
              src={step.image}
              alt={step.title}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                marginBottom: 20,
              }}
            />
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
              {step.title}
            </h3>
            <p style={{ fontSize: 16, color: "#555", lineHeight: 1.6 }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
