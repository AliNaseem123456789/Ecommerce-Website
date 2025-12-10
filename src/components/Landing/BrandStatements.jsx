import mugbanner from "../../assets/banners/mugbanner.jpg";

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
        backgroundColor:"white"
      }}
    >
      {/* TEXT */}
      <div
        style={{
          flex: "1 1 400px",
          minWidth: "300px",
          
        }}
      >
        <h2
          style={{
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 20,
            lineHeight: 1.2,
          }}
        >
          Crafted With Passion.<br />Made for Your Lifestyle.
        </h2>

        <p
          style={{
            fontSize: 18,
            color: "#555",
            lineHeight: 1.7,
          }}
        >
          We blend premium materials, artistic flair and modern functionality
          to bring you products that elevate your everyday life.
        </p>
      </div>

      {/* IMAGE */}
      <div
        style={{
          flex: "1 1 400px",
          minWidth: "300px",
        }}
      >
        <img
          src={mugbanner}
          alt="brand statement"
          style={{
            width: "100%",
            borderRadius: 12,
            objectFit: "contain", // changed from 'cover' to 'contain'
            maxHeight: 450,
          }}
        />
      </div>
    </section>
  );
}
