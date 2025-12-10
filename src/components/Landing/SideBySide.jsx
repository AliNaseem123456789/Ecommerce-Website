import Glassbanner from "../../assets/products/30.jpeg";

export default function SideBySide() {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 8%",
        gap: "50px",
        flexWrap: "wrap",
        backgroundColor:"white"
      }}
    >
      {/* LEFT IMAGE */}
      <div
        style={{
          flex: "1 1 400px",
          minWidth: "300px",
        }}
      >
        <img
          src={Glassbanner}
          alt="side section"
          style={{
            width: "100%",
            borderRadius: "12px",
            objectFit: "contain", // <-- changed from 'cover' to 'contain'
            maxHeight: "450px",
          }}
        />
      </div>

      {/* RIGHT TEXT */}
      <div
        style={{
          flex: "1 1 400px",
          minWidth: "300px",
        }}
      >
        <h2
          style={{
            fontSize: "38px",
            fontWeight: 800,
            marginBottom: "20px",
            lineHeight: "1.2",
          }}
        >
          Premium Quality Products
        </h2>

        <p
          style={{
            fontSize: "18px",
            color: "#555",
            lineHeight: "1.7",
            marginBottom: "20px",
          }}
        >
          We pride ourselves on delivering products crafted with precision,
          durability, and modern design.
        </p>

        <p
          style={{
            fontSize: "18px",
            color: "#555",
            lineHeight: "1.7",
          }}
        >
          From carefully sourced materials to our customer-first support, we
          aim to exceed expectations.
        </p>
      </div>
    </section>
  );
}
