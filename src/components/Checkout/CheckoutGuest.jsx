// components/CheckoutGuest.jsx
import React, { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";

export default function CheckoutGuest() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;
  if (user) return null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "20px auto",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap", // stacks on mobile
      }}
    >
      {/* LEFT SIDE — SIGN IN BOX */}
      <div
        style={{
          flex: "1",
          minWidth: "320px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 4px rgba(0,0,0,0.1)",
          padding: "20px",
          height: "fit-content",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: "700", margin: 0 }}>
          Checkout
        </h2>

        <p
          style={{
            marginTop: "6px",
            fontSize: "14px",
            color: "#666",
            lineHeight: 1.4,
          }}
        >
          Have an Account? 🐾 <br />
          Sign in to check out faster or continue as a guest.
        </p>

        <button
          style={{
            marginTop: "15px",
            width: "100%",
            background: "#f97316",
            color: "#fff",
            fontWeight: "600",
            padding: "12px 0",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#ea580c")}
          onMouseLeave={(e) => (e.target.style.background = "#f97316")}
        >
          Sign In or Create Account
        </button>
      </div>

      {/* RIGHT SIDE — GUEST CHECKOUT */}
      <div
        style={{
          flex: "1.4",
          minWidth: "320px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 4px rgba(0,0,0,0.1)",
          padding: "20px",
        }}
      >
        <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "3px" }}>
          Guest Checkout
        </h3>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
          Enter your contact information to continue.
        </p>

        {/* Name Input */}
        <input
          placeholder="First and Last Name"
          style={{
            width: "100%",
            marginBottom: "12px",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "15px",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #fb923c")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        {/* Email Input */}
        <input
          placeholder="Email"
          style={{
            width: "100%",
            marginBottom: "15px",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "15px",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #fb923c")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        {/* Continue Button */}
        <button
          style={{
            width: "100%",
            background: "#e5e5e5",
            color: "#333",
            fontWeight: "600",
            padding: "12px 0",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#d4d4d4")}
          onMouseLeave={(e) => (e.target.style.background = "#e5e5e5")}
        >
          Checkout As Guest
        </button>

        {/* Divider */}
        <div
          style={{
            margin: "18px 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          
        </div>

      
      </div>
    </div>
  );
}
