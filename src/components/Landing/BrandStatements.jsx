import mugbanner from "../../assets/banners/mugbanner.jpg"
export default function BrandStatement() {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 8%",
        gap: "50px",
        flexWrap: "wrap",
        marginTop: 40,
      }}
    >
      <div style={{ flex: "1 1 400px" }}>
        <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 20 }}>
          Crafted With Passion.<br />Made for Your Lifestyle.
        </h2>

        <p style={{ fontSize: 18, color: "#555", lineHeight: 1.7 }}>
          We blend premium materials, artistic flair and modern functionality
          to bring you products that elevate your everyday life.
        </p>
      </div>

      <div style={{ flex: "1 1 400px" }}>
        <img
          src={mugbanner}
          style={{
            width: "100%",
            borderRadius: 12,
            objectFit: "cover",
            maxHeight: 450,
          }}
        />
      </div>
    </section>
  );
}
