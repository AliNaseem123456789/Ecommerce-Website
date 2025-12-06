import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { supabase } from "../pages/SupabaseClient";
import Logout from "../components/Logout";

export default function Account() {
  const { user, logout } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // --------------------------------------------------------
  // LOAD ORDERS FROM DATABASE
  // --------------------------------------------------------
  const loadOrders = async () => {
    if (!user?.id) return;

    setLoadingOrders(true);

    const { data, error } = await supabase
      .from("orders")
      .select(`
        order_id,
        total,
        created_at,
        order_items (
          quantity,
          price,
          products ( name )
        ),
        shipping_address (*)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Order fetch error:", error);
    } else {
      setOrders(data);
    }

    setLoadingOrders(false);
  };

  useEffect(() => {
    if (activeTab === "Orders") {
      loadOrders();
    }
  }, [activeTab]);

  // --------------------------------------------------------
  // RIGHT SIDE CONTENT
  // --------------------------------------------------------
  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div>
            <h2 style={{ marginBottom: "10px" }}>Welcome back!</h2>
            <p style={{ lineHeight: "1.7" }}>
              From your dashboard you can view your recent orders, manage your
              addresses, update account details, and more.
            </p>
          </div>
        );

      case "Orders":
        return (
          <div>
            <h2 style={{ marginBottom: "25px", fontSize: "26px", fontWeight: "700" }}>
              Your Orders
            </h2>

            {loadingOrders ? (
              <p style={{ fontSize: "16px" }}>Loading orders...</p>
            ) : orders.length === 0 ? (
              <p style={{ fontSize: "16px" }}>You haven't placed any orders yet.</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.order_id}
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "12px",
                    padding: "25px",
                    marginBottom: "25px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                    background: "#ffffff",
                    transition: "transform 0.2s ease",
                  }}
                >
                  {/* ORDER HEADER */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
                      Order #{order.order_id}
                    </h3>

                    <div
                      style={{
                        padding: "5px 12px",
                        background: "#f1f8ff",
                        borderRadius: "8px",
                        fontSize: "14px",
                        color: "#0070f3",
                      }}
                    >
                      Placed on{" "}
                      {new Date(order.created_at).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <p style={{ margin: "5px 0", fontSize: "16px" }}>
                    <strong>Total:</strong>{" "}
                    <span style={{ fontSize: "17px", color: "#111" }}>
                      ${order.total}
                    </span>
                  </p>

                  <hr style={{ margin: "20px 0", borderColor: "#eee" }} />

                  {/* ITEMS */}
                  <h4 style={{ marginBottom: "10px", fontSize: "18px" }}>Items</h4>

                  {order.order_items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "15px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      <div>
                        <p style={{ fontSize: "16px", fontWeight: "600" }}>
                          {item.products?.name}
                        </p>
                        <p style={{ fontSize: "14px", color: "#666" }}>
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p style={{ fontSize: "16px", fontWeight: "600" }}>
                        ${item.price}
                      </p>
                    </div>
                  ))}

                  {/* SHIPPING ADDRESS */}
                  <h4 style={{ marginTop: "25px", marginBottom: "10px", fontSize: "18px" }}>
                    Shipping Address
                  </h4>

                  {order.shipping_address ? (
                    <div style={{ lineHeight: "1.7", fontSize: "15px", color: "#444" }}>
                      <p>
                        {order.shipping_address.first_name}{" "}
                        {order.shipping_address.last_name}
                      </p>
                      <p>{order.shipping_address.street}</p>
                      <p>
                        {order.shipping_address.city},{" "}
                        {order.shipping_address.state}
                      </p>
                      <p>{order.shipping_address.postal_code}</p>
                    </div>
                  ) : (
                    <p>No address available.</p>
                  )}
                </div>
              ))
            )}
          </div>
        );

      case "Downloads":
        return <h2>Downloads (coming soon)</h2>;

      case "Addresses":
        return <h2>Manage Addresses (coming soon)</h2>;

      case "Account details":
        return <h2>Account Details (coming soon)</h2>;

      case "Compare":
        return <h2>Compare Products (coming soon)</h2>;

      case "Wishlist":
        return <h2>Your Wishlist (coming soon)</h2>;

      default:
        return null;
    }
  };

  // --------------------------------------------------------
  // MAIN UI
  // --------------------------------------------------------
  return (
    <div style={{ display: "flex", minHeight: "80vh", background: "#fff" }}>
      {/* LEFT SIDEBAR */}
      <div
        style={{
          width: "260px",
          borderRight: "1px solid #eee",
          padding: "30px 20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "#f2f2f2",
              margin: "0 auto",
            }}
          ></div>

          <p
            style={{
              marginTop: "15px",
              fontSize: "17px",
              fontWeight: "600",
              textTransform: "lowercase",
            }}
          >
            {user?.user_metadata?.name || "User"}
          </p>
        </div>

        {/* SIDEBAR MENU */}
        <div style={{ marginTop: "30px" }}>
          {[
            "Dashboard",
            "Orders",
            "Downloads",
            "Addresses",
            "Account details",
            "Compare",
            "Wishlist",
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveTab(item)}
              style={{
                padding: "12px 15px",
                borderRadius: "6px",
                cursor: "pointer",
                marginBottom: "5px",
                fontSize: "15px",
                color: "#444",
                background: activeTab === item ? "#f7f7f7" : "transparent",
              }}
            >
              {item}
            </div>
          ))}

          {/* LOGOUT BUTTON */}
          <div
            onClick={logout}
            style={{
              marginTop: "20px",
              padding: "14px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "700",
              background: "#ff4d4f",
              color: "#fff",
              textAlign: "center",
              transition: "0.2s",
              boxShadow: "0 3px 10px rgba(255,77,79,0.3)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e63b3c")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ff4d4f")}
          >
            Logout
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div style={{ flex: 1, padding: "40px 50px" }}>{renderContent()}</div>
    </div>
  );
}
