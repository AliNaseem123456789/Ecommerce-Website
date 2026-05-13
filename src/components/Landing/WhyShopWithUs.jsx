import { FaCheckCircle, FaTruck, FaUndo, FaLock } from "react-icons/fa";

export default function ShopWithConfidence() {
  const features = [
    {
      title: "Premium Quality",
      desc: "Handpicked, durable & modern products for your everyday needs.",
      icon: <FaCheckCircle size={40} color="#4CAF50" />,
    },
    {
      title: "Fast Delivery",
      desc: "Receive your orders quickly with reliable shipping.",
      icon: <FaTruck size={40} color="#2196F3" />,
    },
    {
      title: "Easy Returns",
      desc: "Hassle-free 7-day return policy on all products.",
      icon: <FaUndo size={40} color="#FF9800" />,
    },
    {
      title: "Secure Payments",
      desc: "SSL encrypted transactions for safe and secure checkout.",
      icon: <FaLock size={40} color="#9C27B0" />,
    },
  ];

  return (
    <section
      style={{
        width: "100%",
        padding: "80px 6%",
        background: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Page Header */}
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 20 }}>
        Shop With Confidence
      </h1>
      <p style={{ fontSize: 18, color: "#555", maxWidth: 700, marginBottom: 50 }}>
        We ensure the best shopping experience with premium products, fast delivery, easy returns, and secure payment options.
      </p>

      {/* Feature Cards - Now in one row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "20px",
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              flex: "1",
              background: "white",
              borderRadius: "12px",
              padding: "30px 20px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.3s",
              cursor: "default",
              minHeight: "250px",
            }}
          >
            <div style={{ marginBottom: 20 }}>{f.icon}</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
              {f.title}
            </h3>
            <p style={{ fontSize: 16, color: "#555", lineHeight: 1.6 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}