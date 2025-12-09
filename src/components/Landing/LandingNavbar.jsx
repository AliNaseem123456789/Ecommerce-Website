import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logos/logo2.png";

export default function LandingNavbar({ onOpenAuth }) {
  const navigate = useNavigate();

  const styles = {
    nav: {
      width: "100%",
      background: "white",
      padding: "10px 25px", // smaller padding
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      height: "70px", // control navbar height
    },
    logo: {
      height: "45px", // reduced from 55px → makes navbar slimmer
      cursor: "pointer",
    },
    authText: {
      fontSize: "16px",
      fontWeight: 500,
      cursor: "pointer",
      color: "#333",
      transition: "0.2s",
    },
  };

  return (
    <>
      {/* Top Mini Bar */}
      <div
        style={{
          width: "100%",
          background: "black",
          color: "white",
          textAlign: "center",
          padding: "8px 0",
          fontSize: "14px",
          letterSpacing: "0.5px",
        }}
      >
        Free Shipping on Orders up to <b>$150</b> — Shop Now!
      </div>

      {/* Navbar */}
      <div style={styles.nav}>
        {/* LEFT: LOGO */}
        <img
          src={logo}
          alt="Logo"
          style={styles.logo}
          onClick={() => navigate("/")}
        />

        {/* RIGHT: SIMPLE LOGIN/SIGNUP TEXT */}
        <div
          style={styles.authText}
          onClick={onOpenAuth}
          onMouseEnter={(e) => (e.target.style.color = "black")}
          onMouseLeave={(e) => (e.target.style.color = "#333")}
        >
          Login / Sign Up
        </div>
      </div>
    </>
  );
}
