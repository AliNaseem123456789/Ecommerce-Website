import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({ onClose }) {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.products.price * item.quantity,
    0
  );

  const getLocalImage = (id) => {
    try {
      return new URL(`/src/assets/products/${id}.jpeg`, import.meta.url).href;
    } catch {
      return "https://via.placeholder.com/80";
    }
  };

  return (
    <>
      {/* --- OVERLAY --- */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.55)",
          zIndex: 2000,
        }}
      />

      {/* --- SIDEBAR CART DRAWER --- */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "380px",
          height: "100vh",
          background: "white",
          zIndex: 2100,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-4px 0 12px rgba(0,0,0,0.15)",
          animation: "slideIn 0.3s ease",
        }}
      >
        <style>
          {`
            @keyframes slideIn {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}
        </style>

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: 600 }}>Shopping Cart</h2>

          <X
            size={24}
            style={{ cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        {/* Message */}
        <p style={{ fontSize: "14px", marginBottom: "15px" }}>
          🔥 These products are limited, checkout within <strong>03m 50s</strong>
        </p>

        {/* CART ITEMS SCROLL AREA */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingRight: "5px",
          }}
        >
          {cartItems.map((item) => {
            const img = getLocalImage(item.products.product_id);

            return (
              <div
                key={item.cart_item_id}
                style={{
                  display: "flex",
                  marginBottom: "20px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                  gap: "12px",
                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "6px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, marginBottom: "4px" }}>
                    {item.products.name.slice(0, 50)}...
                  </p>

                  <p style={{ color: "#1a73e8", marginBottom: "8px" }}>
                    ${item.products.price}
                  </p>

                  {/* Quantity Controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      onClick={() =>
                        updateQuantity(item.cart_item_id, item.quantity - 1)
                      }
                      style={{
                        width: "28px",
                        height: "28px",
                        border: "1px solid #ddd",
                        borderRadius: "50%",
                        background: "white",
                      }}
                    >
                      –
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.cart_item_id, item.quantity + 1)
                      }
                      style={{
                        width: "28px",
                        height: "28px",
                        border: "1px solid #ddd",
                        borderRadius: "50%",
                        background: "white",
                      }}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.cart_item_id)}
                      style={{
                        background: "none",
                        color: "#777",
                        border: "none",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <span style={{ fontSize: "16px" }}>Subtotal</span>
            <span style={{ fontWeight: "bold", color: "#1a73e8" }}>
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <button
  onClick={() => {
    onClose();          // close sidebar
    navigate("/checkout"); // go to checkout page
  }}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "22px",
    background: "black",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "10px",
  }}
>
  CHECKOUT
</button>




          <button
            onClick={() => {
              onClose();
              navigate("/cart"); // go to main cart page
            }}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "22px",
              background: "white",
              border: "1px solid #ccc",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            VIEW CART
          </button>
        </div>
      </div>
    </>
  );
}
