// src/components/WishlistContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../pages/SupabaseClient";
import { AuthContext } from "../components/AuthContext";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext); // <-- GET LOGGED IN USER
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist whenever user logs in / logs out
  useEffect(() => {
    if (user?.id) {
      fetchWishlist(user.id);
    } else {
      setWishlist([]); // Empty wishlist for guests
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

  // Add item
  const addWishlist = async (productId) => {
    if (!user) return alert("Please log in to add items to wishlist.");

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
    if (!user) return alert("Please log in to use wishlist.");

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





// // src/components/WishlistContext.jsx
// import { createContext, useEffect, useState } from "react";
// import { supabase } from "../pages/SupabaseClient";

// export const WishlistContext = createContext();

// const HARDCODED_USER_ID = 1; // <---- your fixed user

// export function WishlistProvider({ children }) {
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     fetchWishlist(HARDCODED_USER_ID);
//   }, []);

//   const fetchWishlist = async (userId) => {
//     const { data, error } = await supabase
//       .from("wishlist")
//       .select("product_id")
//       .eq("user_id", userId);

//     if (error) console.log(error);
//     setWishlist(data?.map((x) => x.product_id) || []);
//   };

//   const addWishlist = async (productId) => {
//     await supabase.from("wishlist").insert({
//       user_id: HARDCODED_USER_ID,
//       product_id: productId,
//     });

//     setWishlist((prev) => [...prev, productId]);
//   };

//   const removeWishlist = async (productId) => {
//     await supabase
//       .from("wishlist")
//       .delete()
//       .eq("user_id", HARDCODED_USER_ID)
//       .eq("product_id", productId);

//     setWishlist((prev) => prev.filter((id) => id !== productId));
//   };

//   const toggleWishlist = async (productId) => {
//     if (wishlist.includes(productId)) {
//       removeWishlist(productId);
//     } else {
//       addWishlist(productId);
//     }
//   };

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, toggleWishlist, addWishlist, removeWishlist }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// }
