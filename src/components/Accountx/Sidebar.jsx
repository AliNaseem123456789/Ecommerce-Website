import React from "react";

export default function Sidebar({ activeTab, setActiveTab, logout, user }) {
  const tabs = [
    "Dashboard",
    "Orders",
    "Downloads",
    "Addresses",
    "Account details",
    "Compare",
    "Wishlist",
  ];

  return (
    <div
      style={{
        width: "260px",
        borderRight: "1px solid #eee",
        padding: "30px 20px",
      }}
    >
      {/* PROFILE */}
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

      {/* MENU */}
      <div style={{ marginTop: "30px" }}>
        {tabs.map((item) => (
          <div
            key={item}
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

        {/* LOGOUT */}
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
  );
}
