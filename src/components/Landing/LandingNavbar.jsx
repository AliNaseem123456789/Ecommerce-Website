import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logos/logo2.png";

export default function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 25px",
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      {/* Logo click navigates to main page */}
      <img
        src={logo}
        alt="Logo"
        style={{ height: "45px", cursor: "pointer" }}
        onClick={() => navigate("/home")}
      />

      {/* Login / Sign Up click also navigates to main page */}
      <div
        style={{ cursor: "pointer", fontWeight: 500, color: "#333" }}
        onClick={() => navigate("/home")}
      >
        Login / Sign Up
      </div>
    </div>
  );
}
