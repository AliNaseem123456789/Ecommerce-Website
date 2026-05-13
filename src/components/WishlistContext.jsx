// src/components/WishlistContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../pages/SupabaseClient";
import { AuthContext } from "../components/AuthContext";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import withReactContent from "sweetalert2-react-content";

export const WishlistContext = createContext();
const MySwal = withReactContent(Swal); // Optional: for React components inside Swal

export function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist whenever user logs in / logs out
  useEffect(() => {
    if (user?.id) {
      fetchWishlist(user.id);
    } else {
      setWishlist([]);
      setLoading(false);
    }
  }, [user]);

  // Fetch wishlist for the logged in user
  const fetchWishlist = async (userId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("wishlist_test")
      .select("product_id")
      .eq("user_id", userId);

    if (error) {
      console.log("Wishlist fetch error:", error);
      setLoading(false);
      return;
    }

    setWishlist(data.map((x) => x.product_id));
    setLoading(false);
  };

  // ✅ SweetAlert helper
  const showLoginAlert = () => {
    Swal.fire({
  title: "Login Required",
  text: "Please log in to continue.",
  icon: "undefined",
  confirmButtonText: "OK",
  confirmButtonColor: "#000000ff"  // ← change color here
});
  };

  // Add item
  const addWishlist = async (productId) => {
    if (!user) return showLoginAlert();

    const { error } = await supabase.from("wishlist_test").insert({
      user_id: user.id,
      product_id: productId,
    });

    if (error) console.log(error);

    setWishlist((prev) => [...prev, productId]);
  };

  // Remove item
  const removeWishlist = async (productId) => {
    if (!user) return;

    await supabase
      .from("wishlist_test")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  // Toggle item (add/remove)
  const toggleWishlist = async (productId) => {
    if (!user) return showLoginAlert();

    if (wishlist.includes(productId)) {
      removeWishlist(productId);
    } else {
      addWishlist(productId);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        addWishlist,
        removeWishlist,
        loading,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}