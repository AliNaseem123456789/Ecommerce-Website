import React, { useState, useEffect } from "react";
import { supabase } from "../pages/SupabaseClient";

// Lucide Icons
import { Pencil, Truck, Ticket } from "lucide-react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const { data, error } = await supabase
      .from("cart_items")
      .select(`cart_item_id, quantity, products(*)`)
      .eq("user_id", 1);

    if (!error) setCartItems(data);
  };

  const updateQuantity = async (cart_item_id, newQty) => {
    if (newQty < 1) return;

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQty })
      .eq("cart_item_id", cart_item_id);

    if (!error) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.cart_item_id === cart_item_id
            ? { ...item, quantity: newQty }
            : item
        )
      );
    }
  };

  const removeItem = async (cart_item_id) => {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_item_id", cart_item_id);

    if (!error) {
      setCartItems((prev) =>
        prev.filter((item) => item.cart_item_id !== cart_item_id)
      );
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.products.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* ITEMS LIST */}
      <div>
        <h2 style={{ marginBottom: "20px" }}>Shopping Cart</h2>

        {cartItems.map((item) => {
          const imageUrl = `src/assets/products/${item.products.product_id}.jpeg`;
          return (
            <div
              key={item.cart_item_id}
              style={{
                display: "flex",
                borderBottom: "1px solid #ddd",
                padding: "20px 0",
                gap: "20px",
              }}
            >
              <img
                src={imageUrl}
                alt={item.products.name}
                style={{ width: "140px", height: "140px", objectFit: "cover" }}
              />

              <div style={{ flexGrow: 1 }}>
                <p style={{ fontSize: "16px", marginBottom: "10px" }}>
                  {item.products.name}
                </p>

                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                  ${item.products.price.toFixed(2)}
                </p>

                <button
                  onClick={() => removeItem(item.cart_item_id)}
                  style={{
                    background: "none",
                    color: "#007185",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  Remove
                </button>
              </div>

              <div style={{ textAlign: "right", width: "150px" }}>
                <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                  Quantity
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "8px",
                  }}
                >
                  <button
                    onClick={() =>
                      updateQuantity(item.cart_item_id, item.quantity - 1)
                    }
                    style={{
                      padding: "5px 10px",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                      background: "white",
                    }}
                  >
                    -
                  </button>

                  <span
                    style={{ fontSize: "16px", width: "30px", textAlign: "center" }}
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.cart_item_id, item.quantity + 1)
                    }
                    style={{
                      padding: "5px 10px",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                      background: "white",
                    }}
                  >
                    +
                  </button>
                </div>

                <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                  ${(item.products.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM-RIGHT CHECKOUT BOX */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            width: "320px",
            border: "1px solid #eee",
            borderRadius: "6px",
            padding: "20px",
          }}
        >
          {/* ICON TABS */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "center",
              marginBottom: "20px",
              borderBottom: "1px solid #eee",
              paddingBottom: "12px",
            }}
          >
            {/* NOTE */}
            <div style={{ flex: 1 }}>
              <Pencil size={18} />
              <p style={{ fontSize: "14px", marginTop: "6px" }}>Note</p>
            </div>

            <div style={{ width: "1px", background: "#ddd" }}></div>

            {/* SHIPPING */}
            <div style={{ flex: 1 }}>
              <Truck size={18} />
              <p style={{ fontSize: "14px", marginTop: "6px" }}>Shipping</p>
            </div>

            <div style={{ width: "1px", background: "#ddd" }}></div>

            {/* COUPON */}
            <div style={{ flex: 1 }}>
              <Ticket size={18} />
              <p style={{ fontSize: "14px", marginTop: "6px" }}>Coupon</p>
            </div>
          </div>

          {/* SUBTOTAL */}
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

          {/* TOTAL */}
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

          {/* CHECKOUT BUTTON */}
          <button
            style={{
              width: "100%",
              padding: "14px",
              background: "black",
              color: "white",
              borderRadius: "30px",
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
  );
}
