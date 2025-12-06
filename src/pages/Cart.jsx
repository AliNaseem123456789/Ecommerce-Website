import React, { useContext } from "react";
import { CartContext } from "../components/CartContext";
import { Pencil, Truck, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Cart() {
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
      return "https://via.placeholder.com/100";
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <style>
        {`
          @media (max-width: 768px) {
            .cart-row {
              flex-direction: column;
              align-items: flex-start;
            }
            .right-column {
              flex-direction: row;
              justify-content: space-between;
              width: 100%;
              margin-top: 10px;
            }
            .right-column div {
              flex: 1;
              text-align: center;
            }
            .checkout-box {
              width: 100%;
              max-width: 400px;
              margin-top: 20px;
            }
          }
        `}
      </style>

      <div
        className="cart-container"
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Shopping Cart
        </h2>

        {/* HEADINGS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            borderBottom: "2px solid #ddd",
            padding: "0 15px 10px 15px",
          }}
        >
          <div style={{ flex: 3 }}>Product</div>
          <div style={{ flex: 1, textAlign: "center" }}>Price</div>
          <div style={{ flex: 1, textAlign: "center" }}>Quantity</div>
          <div style={{ flex: 1, textAlign: "center" }}>Subtotal</div>
        </div>

        {/* PRODUCTS */}
        {cartItems.map((item) => {
          const imageUrl = getLocalImage(item.products.product_id);
          return (
            <div
              key={item.cart_item_id}
              className="cart-row"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
                padding: "15px",
                gap: "15px",
              }}
            >
              {/* Product info */}
              <div style={{ display: "flex", alignItems: "center", flex: 3, gap: "15px" }}>
                <img
                  src={imageUrl}
                  alt={item.products.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
                <div>
                  <p style={{ fontSize: "16px", marginBottom: "6px" }}>
                    {item.products.name}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.cart_item_id)}
                    style={{
                      background: "none",
                      color: "#007185",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Right column */}
              <div
                className="right-column"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "10px",
                }}
              >
                <div>${item.products.price.toFixed(2)}</div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <button
                    onClick={() =>
                      updateQuantity(item.cart_item_id, item.quantity - 1)
                    }
                    style={{
                      padding: "3px 8px",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                      background: "white",
                    }}
                  >
                    -
                  </button>
                  <span style={{ width: "25px", textAlign: "center" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.cart_item_id, item.quantity + 1)
                    }
                    style={{
                      padding: "3px 8px",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                      background: "white",
                    }}
                  >
                    +
                  </button>
                </div>

                <div style={{ fontWeight: "bold", color: "#0095ff" }}>
                  ${(item.products.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}

        {/* CHECKOUT BOX */}
        <div
          className="checkout-box"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "280px",
              border: "1px solid #eee",
              borderRadius: "6px",
              padding: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
                marginBottom: "18px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <div style={{ flex: 1 }}>
                <Pencil size={18} />
                <p style={{ fontSize: "14px", marginTop: "6px" }}>Note</p>
              </div>
              <div style={{ width: "1px", background: "#ddd" }}></div>
              <div style={{ flex: 1 }}>
                <Truck size={18} />
                <p style={{ fontSize: "14px", marginTop: "6px" }}>Shipping</p>
              </div>
              <div style={{ width: "1px", background: "#ddd" }}></div>
              <div style={{ flex: 1 }}>
                <Ticket size={18} />
                <p style={{ fontSize: "14px", marginTop: "6px" }}>Coupon</p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>Subtotal</span>
              <span style={{ color: "#0095ff" }}>${subtotal.toFixed(2)}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                borderTop: "1px solid #eee",
                paddingTop: "10px",
              }}
            >
              <strong>Total</strong>
              <strong style={{ color: "#0095ff" }}>${subtotal.toFixed(2)}</strong>
            </div>

            <button
            onClick={()=>navigate("/checkout")}
              style={{
                width: "100%",
                padding: "12px",
                background: "black",
                color: "white",
                borderRadius: "25px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
