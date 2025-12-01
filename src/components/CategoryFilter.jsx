import React, { useState } from "react";
import { IoRemoveOutline } from "react-icons/io5";

export default function CategoryFilter({
  categories,
  selectedCategories,
  setSelectedCategories
}) {
  const [openCat, setOpenCat] = useState(true);

  const toggleCategory = (catID) => {
    if (selectedCategories.includes(catID)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== catID));
    } else {
      setSelectedCategories([...selectedCategories, catID]);
    }
  };

  return (
    <div style={{ width: "250px", padding: "20px" }}>
      <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "24px" }}>
        Filters
      </h2>

      {/* Categories */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
          marginBottom: "10px",
        }}
        onClick={() => setOpenCat(!openCat)}
      >
        <h3 style={{ fontSize: "18px", fontWeight: "600" }}>Categories</h3>
        <IoRemoveOutline size={22} />
      </div>

      {openCat && (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {/* ALL */}
          <li
            onClick={() => setSelectedCategories([])}
            style={{
              cursor: "pointer",
              marginBottom: "10px",
              color: selectedCategories.length === 0 ? "#000" : "#6b7280",
              fontWeight: selectedCategories.length === 0 ? "600" : "400",
            }}
          >
            All
          </li>

          {/* Category list */}
          {categories.map((cat) => (
            <li
              key={cat.category_id}
              onClick={() => toggleCategory(cat.category_id)}
              style={{
                cursor: "pointer",
                marginBottom: "8px",
                color: selectedCategories.includes(cat.category_id)
                  ? "#000"
                  : "#6b7280",
                fontWeight: selectedCategories.includes(cat.category_id)
                  ? "600"
                  : "400",
              }}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
