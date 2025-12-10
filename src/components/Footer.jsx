import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate();

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "customer",
      title: "Customer Care",
      content: (
        <>
          <p>6 Hazlewood Ct, Jericho, New York, 11753</p>
          <p>New York, NY 10006 </p>
          <p style={{ marginTop: "0.8rem" }}>+1 (732) 474-3377‬</p>
          <p>sales@3sproshop.com</p>
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.2rem" }}>
  {[
    { Icon: FaFacebook, url: "https://www.facebook.com/" },
    { Icon: FaInstagram, url: "https://www.instagram.com/" },
    { Icon: FaTwitter, url: "https://twitter.com/" },
    { Icon: FaYoutube, url: "https://www.youtube.com/" },
  ].map(({ Icon, url }, index) => (
    <a
      key={index}
      href={url}
      target="_blank"        // opens in new tab
      rel="noopener noreferrer"  // security
      style={{
        padding: "0.5rem",
        borderRadius: "50%",
        backgroundColor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon size={18} color="#111827" />
    </a>
  ))}
</div>

        </>
      ),
    },
    {
      id: "find",
      title: "Find It Fast",
      content: [
        { label: "About Us", path: "/about-us" },
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Terms and Conditions", path: "/terms-and-conditions" },
        { label: "Contact Us", path: "/contact-us" },
      ].map((item, i) => (
        <p
          key={i}
          style={{ marginBottom: "0.4rem", cursor: "pointer" }}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </p>
      )),
    },
    {
      id: "other",
      title: "Other Business",
      content: [
        { label: "My Account", path: "/account" },
        { label: "Track Order", path: "/track-order" },
        { label: "Wishlist", path: "/wishlist" },
         { label: "FAQ", path: "/faq" },   
        { label: "Returns / Refund", path: "/refund-returns" },
      ].map((item, i) => (
        <p
          key={i}
          style={{ marginBottom: "0.4rem", cursor: "pointer" }}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </p>
      )),
    },
    {
      id: "newsletter",
      title: "Stay Updated",
      content: (
        <>
          <p style={{ marginBottom: "1rem" }}>Subscribe to get updates on offers and deals.</p>
          <div
            style={{
              display: "flex",
              backgroundColor: "#f3f4f6",
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: "0.6rem 0.8rem",
                border: "none",
                outline: "none",
                background: "transparent",
              }}
            />
            <button
              style={{
                backgroundColor: "#111827",
                color: "white",
                padding: "0.6rem 1rem",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Subscribe
            </button>
          </div>
        </>
      ),
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: "white",
        color: "#4b5563",
        paddingTop: "3rem",
        paddingBottom: "2rem",
      }}
    >
      {/* Media query for accordion icons */}
      <style>
        {`
          @media (min-width: 769px) {
            .accordion-icon {
              display: none;
            }
          }
        `}
      </style>

      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {sections.map((section) => (
          <div
            key={section.id}
            style={{
              minWidth: "180px",
              flex: "1 1 200px",
            }}
          >
            {/* Section Header */}
            <h3
              onClick={() => toggleSection(section.id)}
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "#111827",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {section.title}
              <span className="accordion-icon">
                {openSection === section.id ? "-" : "+"}
              </span>
            </h3>

            {/* Section Content */}
            <div
              style={{
                display:
                  openSection === section.id || window.innerWidth > 768
                    ? "block"
                    : "none",
              }}
            >
              {section.content}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div
        style={{
          marginTop: "2rem",
          paddingTop: "1rem",
          textAlign: "center",
          color: "#6b7280",
          fontSize: "0.875rem",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        © {new Date().getFullYear()} 2025 3S Smart Solutions Star, Inc ---All rights reserved
      </div>
    </footer>
  );
}
