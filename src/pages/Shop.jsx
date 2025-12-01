import React, { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { CartContext } from "../components/CartContext";
import { supabase } from "../pages/SupabaseClient";

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [grid, setGrid] = useState(3);
  const [sort, setSort] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategories, sort]);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (!error) setCategories(data);
  };

  const fetchProducts = async () => {
    let query = supabase.from("products").select("*, product_images(image_url)");

    if (selectedCategories.length > 0) {
      query = query.in("category_id", selectedCategories);
    }

    if (sort === "price_asc") query = query.order("price", { ascending: true });
    if (sort === "price_desc") query = query.order("price", { ascending: false });
    if (sort === "rating") query = query.order("avg_rating", { ascending: false });

    const { data } = await query;

    // 🔥 Inject static image paths here:
    const extended = (data || []).map((p) => {
      const formats = ["avif", "webp", "jpg", "jpeg", "png"];
      const maxImages = 6;

      const staticImages = Array.from({ length: maxImages }).flatMap((_, index) =>
        formats.map(
          (ext) =>
            `/assets/products/${p.product_id}/${index === 0 ? "main" : index}.${ext}`
        )
      );

      return {
        ...p,
        staticImages,
      };
    });

    setProducts(extended);
  };

  const removeCategory = (catID) => {
    setSelectedCategories(selectedCategories.filter((id) => id !== catID));
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSort("");
  };

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "40px",
        }}
      >
        Shop
      </h1>

      <div style={{ display: "flex" }}>
        {/* LEFT FILTER */}
        <div style={{ width: "22%", padding: "10px" }}>
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        {/* RIGHT PRODUCT GRID */}
        <div style={{ width: "78%", padding: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div style={{ fontSize: "16px", color: "#4b5563" }}>
              Showing {products.length} results
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                {[2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setGrid(n)}
                    style={{
                      padding: "6px 10px",
                      border: grid === n ? "2px solid black" : "1px solid #ddd",
                      background: "white",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <select
                style={{
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Default</option>
                <option value="price_asc">Price Low → High</option>
                <option value="price_desc">Price High → Low</option>
                <option value="rating">Top Rating</option>
              </select>
            </div>
          </div>

          {selectedCategories.length > 0 && (
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
              {selectedCategories.map((catID) => {
                const cat = categories.find((c) => c.category_id === catID);

                return (
                  <div
                    key={catID}
                    style={{
                      padding: "6px 12px",
                      background: "#f3f4f6",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                    }}
                  >
                    {cat?.name}
                    <span
                      onClick={() => removeCategory(catID)}
                      style={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        paddingLeft: "4px",
                      }}
                    >
                      ×
                    </span>
                  </div>
                );
              })}

              <div
                onClick={clearAll}
                style={{
                  padding: "6px 12px",
                  cursor: "pointer",
                  color: "#0284c7",
                  fontSize: "14px",
                }}
              >
                Clear All
              </div>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${grid}, 1fr)`,
              gap: "20px",
            }}
          >
            {products.map((p) => (
              <ProductCard
                key={p.product_id}
                product={{
                  ...p,

                  // 🔥 Send static images to ProductCard
                  images: p.staticImages,
                }}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
 