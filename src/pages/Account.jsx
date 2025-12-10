import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { supabase } from "../pages/SupabaseClient";

// Tabs
import Sidebar from "../components/Accountx/Sidebar";
import DashboardTab from "../components/Accountx/DashboardTab";
import OrdersTab from "../components/Accountx/OrdersTab";
import DownloadsTab from "../components/Accountx/DownloadsTab";
import AddressesTab from "../components/Accountx/AddressesTab";
import AccountDetailsTab from "../components/Accountx/AccountDetailsTab";
import CompareTab from "../components/Accountx/CompareTab";
import WishlistTab from "../components/Accountx/WishlistTab";

export default function Account() {
  const { user, logout } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // ------------------------------------------------------
  // LOAD ORDERS
  // ------------------------------------------------------
  const loadOrders = async () => {
    if (!user?.id) return;

    setLoadingOrders(true);

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        order_id,
        total,
        created_at,
        order_items ( quantity, price, products(name) ),
        shipping_address (*)
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) setOrders(data || []);
    setLoadingOrders(false);
  };

  // ------------------------------------------------------
  // RENDER TAB LOGIC
  // ------------------------------------------------------
  const renderTab = () => {
    const key = activeTab.toLowerCase().trim(); // normalize

    switch (key) {
      case "dashboard":
        return <DashboardTab />;

      case "orders":
        return (
          <OrdersTab
            orders={orders}
            loading={loadingOrders}
            loadOrders={loadOrders}
          />
        );

      case "downloads":
        return <DownloadsTab />;

      case "addresses":
      case "address":
        return <AddressesTab />;

      case "account details":
      case "accountdetails":
      case "account-details":
        return <AccountDetailsTab />;

      case "compare":
        return <CompareTab />;

      case "wishlist":
        return <WishlistTab />;

      default:
        return <DashboardTab />;
    }
  };

  // ------------------------------------------------------
  // MAIN UI
  // ------------------------------------------------------
  return (
    <div style={{ display: "flex", minHeight: "80vh", background: "#fff" }}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        logout={logout}
        user={user}
      />

      <div style={{ flex: 1, padding: "40px 50px" }}>{renderTab()}</div>
    </div>
  );
}
