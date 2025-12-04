import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaStar,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaHome,
  FaStore,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { supabase } from "../pages/SupabaseClient";
import logo from "../assets/Logos/logo2.png";
import { CartContext } from "../components/CartContext";
import CartSidebar from "../components/CartSidebar";

function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useContext(CartContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    if (data) setCategories(data);
  };

  const handleCategoryClick = (category_id) => {
    navigate(`/shop?category=${category_id}`);
    setDropdownOpen(false);
    setSidebarOpen(false);
  };

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      {/* Desktop Navbar */}
      {!isMobile && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 20px",
              backgroundColor: "white",
              boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img src={logo} alt="Logo" style={{ height: "50px" }} />

            <div style={{ flex: 1, margin: "0 10%", position: "relative" }}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 15px",
                    borderRadius: "30px",
                    border: "1px solid #ccc",
                  }}
                />
                <FaSearch
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#888",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "20px",
                fontSize: "22px",
                position: "relative",
              }}
            >
              <FaUser style={{ cursor: "pointer" }} title="Account" />
              <FaStar style={{ cursor: "pointer" }} title="Wishlist" />
              <div style={{ position: "relative" }}>
                <FaShoppingCart
                  style={{ cursor: "pointer" }}
                  title="Cart"
                  onClick={() => setCartOpen(true)}
                />
                {totalItems > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-10px",
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Navbar Strip */}
          <div style={{ backgroundColor: "#111", padding: "12px 20px" }}>
            <div
              style={{
                display: "flex",
                gap: "40px",
                color: "white",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Home
              </Link>
              <Link
                to="/shop"
                style={{ color: "white", textDecoration: "none" }}
              >
                Shop
              </Link>

              {/* Categories Dropdown */}
              <div
                style={{ position: "relative", cursor: "pointer" }}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <span style={{ color: "white", fontWeight: "500" }}>
                  All Categories ▼
                </span>

                {dropdownOpen && (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      background: "white",
                      color: "#111",
                      borderRadius: "6px",
                      listStyle: "none",
                      padding: "8px 0",
                      margin: 0,
                      minWidth: "180px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                      zIndex: 100,
                    }}
                  >
                    {categories.map((cat) => (
                      <li
                        key={cat.category_id}
                        onClick={() => handleCategoryClick(cat.category_id)}
                        style={{
                          padding: "8px 16px",
                          cursor: "pointer",
                        }}
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link
                to="/about"
                style={{ color: "white", textDecoration: "none" }}
              >
                About Us
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Mobile Navbar */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            backgroundColor: "white",
            boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1001,
          }}
        >
          <FaBars
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={() => setSidebarOpen(true)}
          />
          <img src={logo} alt="Logo" style={{ height: "30px" }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              position: "relative",
            }}
          >
            <FaSearch
              style={{ fontSize: "24px", cursor: "pointer" }}
              onClick={() => navigate("/search")}
            />

            <div style={{ position: "relative" }}>
              <FaShoppingCart
                style={{ fontSize: "24px", cursor: "pointer" }}
                onClick={() => setCartOpen(true)}
              />
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-10px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Drawer */}
      {isMobile && sidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "70%",
            background: "#fff",
            zIndex: 1002,
            padding: "20px",
            boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <FaTimes
              style={{ fontSize: "24px", cursor: "pointer" }}
              onClick={() => setSidebarOpen(false)}
            />
          </div>

          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              fontSize: "18px",
              marginTop: "20px",
            }}
          >
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: "none", color: "#111" }}
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: "none", color: "#111" }}
            >
              Shop
            </Link>

            {/* Mobile Categories Dropdown */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  cursor: "pointer",
                  color: "#111",
                  fontWeight: "500",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Categories{" "}
                {dropdownOpen ? (
                  <FaChevronUp size={14} />
                ) : (
                  <FaChevronDown size={14} />
                )}
              </span>

              {dropdownOpen && (
                <div
                  style={{
                    marginTop: "8px",
                    paddingLeft: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {categories.map((cat) => (
                    <span
                      key={cat.category_id}
                      onClick={() => handleCategoryClick(cat.category_id)}
                      style={{ cursor: "pointer", color: "#111" }}
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/wishlist"
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: "none", color: "#111" }}
            >
              Wishlist
            </Link>
            <Link
              to="/about"
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: "none", color: "#111" }}
            >
              About Us
            </Link>
          </nav>
        </div>
      )}

      {/* Bottom Navbar for Mobile */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            borderTop: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "10px 0",
            zIndex: 1000,
          }}
        >
          <div
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <FaHome size={22} />
            <span style={{ fontSize: "12px" }}>Home</span>
          </div>

          <div
            onClick={() => navigate("/shop")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <FaStore size={22} />
            <span style={{ fontSize: "12px" }}>Shop</span>
          </div>

          <div
            onClick={() => setCartOpen(true)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <FaShoppingCart size={22} />
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-10px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {totalItems}
              </span>
            )}
            <span style={{ fontSize: "12px" }}>Cart</span>
          </div>

          <div
            onClick={() => navigate("/wishlist")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <FaStar size={22} />
            <span style={{ fontSize: "12px" }}>Wishlist</span>
          </div>
        </div>
      )}

      {/* Spacer for Mobile */}
      {isMobile && <div style={{ height: "56px" }}></div>}

      {/* Cart Sidebar */}
      {cartOpen && <CartSidebar onClose={() => setCartOpen(false)} />}
    </div>
  );
}

export default Navbar;
