import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

export default function LiveViewers() {
  const [viewers, setViewers] = useState(0);

  const generateRandom = () => {
    // realistic e-commerce range (12–87)
    return Math.floor(Math.random() * 75) + 12;
  };

  useEffect(() => {
    setViewers(generateRandom());

    // refresh count every 7–12 seconds so it looks real
    const interval = setInterval(() => {
      setViewers(generateRandom());
    }, Math.floor(Math.random() * 5000) + 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "10px",
        fontSize: "16px",
        fontWeight: 600,
        color: "#000000ff", // nice red highlight
      }}
    >
      <FaEye size={18} />
      <span>{viewers} people are viewing this right now</span>
    </div>
  );
}
