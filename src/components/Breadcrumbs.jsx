// components/Breadcrumbs.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function Breadcrumbs({ productName }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap = {
    "": "Home",
    shop: "Products",
    cart: "Cart",
    wishlist: "Wishlist",
    product: "Product",
    "about-us": "About Us",
    "privacy-policy": "Privacy Policy",
    "terms-and-conditions": "Terms & Conditions",
    "contact-us": "Contact Us",
    "refund-returns": "Refund & Returns",
    account: "Account",
    checkout: "Checkout",
    "login-required": "Login Required",
  };

  const container = {
    fontSize: "15px",
    margin: "20px 20px 25px 40px",
    color: "#333",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#444",
    fontWeight: 500,
  };

  const separator = {
    margin: "0 8px",
    color: "#999",
  };

  return (
    <div style={container}>
      <Link to="/" style={linkStyle}>Home</Link>

      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;

        const to = "/" + pathnames.slice(0, index + 1).join("/");

        // Default name
        let name =
          breadcrumbNameMap[value] ||
          value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

        // ⭐ FIX #1: Detect "product" parent segment → make it "Products"
        if (value === "product") {
          name = "Products";
        }

        // ⭐ FIX #2: Product breadcrumb link should ALWAYS lead to "/shop"
        const correctedTo = value === "product" ? "/shop" : to;

        // ⭐ FIX #3: Last breadcrumb shows productName instead of ID
        if (isLast && productName) {
          name = productName;
        }

        return (
          <React.Fragment key={to}>
            <span style={separator}>{">"}</span>

            {isLast ? (
              <Typography
                component="span"
                sx={{ fontWeight: 600, color: "#111" }}
              >
                {name}
              </Typography>
            ) : (
              <Link to={correctedTo} style={linkStyle}>
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
