import React, { useState } from "react";
import { IoRemoveOutline } from "react-icons/io5";
import { Typography } from "@mui/material";

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
      {/* MAIN TITLE */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          letterSpacing: "0.3px",
          mb: 3,
        }}
      >
        Filters
      </Typography>

      {/* CATEGORY HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
          marginBottom: "10px",
        }}
        onClick={() => setOpenCat(!openCat)}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "20px",
            color: "#111",
          }}
        >
          Categories
        </Typography>

        <IoRemoveOutline size={22} />
      </div>

      {openCat && (
        <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "5px" }}>
          {/* ALL */}
          <li
            onClick={() => setSelectedCategories([])}
            style={{ cursor: "pointer", marginBottom: "10px" }}
          >
            <Typography
              sx={{
                fontWeight: selectedCategories.length === 0 ? 700 : 500,
                color: selectedCategories.length === 0 ? "#000" : "#6b7280",
                fontSize: "16px",
              }}
            >
              All
            </Typography>
          </li>

          {/* Category list */}
          {categories.map((cat) => (
            <li
              key={cat.category_id}
              onClick={() => toggleCategory(cat.category_id)}
              style={{ cursor: "pointer", marginBottom: "8px" }}
            >
              <Typography
                sx={{
                  fontWeight: selectedCategories.includes(cat.category_id)
                    ? 700
                    : 500,
                  color: selectedCategories.includes(cat.category_id)
                    ? "#000"
                    : "#6b7280",
                  fontSize: "16px",
                }}
              >
                {cat.name}
              </Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
