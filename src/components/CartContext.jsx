import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../pages/SupabaseClient";
import { v4 as uuidv4 } from "uuid";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // UUID for logged-in or guest
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 1️⃣ Identify logged-in user
  const getCurrentUserId = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      setUserId(user.id); // UUID of logged-in user
      return user.id;
    }

    // Guest user
    let guestId = localStorage.getItem("guest_user_id");
    if (!guestId) {
      guestId = uuidv4();
      localStorage.setItem("guest_user_id", guestId);
    }
    setUserId(guestId);
    return guestId;
  };
  // 2️⃣ Fetch cart items
  const fetchCart = async (id = userId) => {
    if (!id) return;

    const { data, error } = await supabase 
      .from("cart_items_test")
      .select(`cart_item_id, quantity, products(*)`)
      .eq("user_id", id);

    if (!error && data) setCartItems(data);
  };

  useEffect(() => {
    (async () => {
      const id = await getCurrentUserId();
      await fetchCart(id);
    })();
  }, []);

  // 3️⃣ Add item to cart 
  const addToCart = async (product) => {
    if (!userId) return;

    const existing = cartItems.find(
      (item) => item.products.product_id === product.product_id
    );

    if (existing) {
      const { error } = await supabase
        .from("cart_items_test")
        .update({ quantity: existing.quantity + 1 })
        .eq("cart_item_id", existing.cart_item_id);

      if (!error) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.cart_item_id === existing.cart_item_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      }
    } else {
      // Add new item
      const { data, error } = await supabase
        .from("cart_items_test")
        .insert({
          user_id: userId,
          product_id: product.product_id,
          quantity: 1,
        })
        .select(`cart_item_id, quantity, products(*)`)
        .single();

      if (!error && data) setCartItems((prev) => [...prev, data]);
    }

    if (window.location.pathname !== "/cart") setIsSidebarOpen(true);
  };

  // 4️⃣ Update quantity
  const updateQuantity = async (cart_item_id, newQty) => {
    if (newQty < 1) return;

    const { error } = await supabase
      .from("cart_items_test")
      .update({ quantity: newQty })
      .eq("cart_item_id", cart_item_id);

    if (!error) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.cart_item_id === cart_item_id
            ? { ...item, quantity: newQty }
            : item
        )
      );
    }
  };
  // 5️⃣ Remove from cart

  const removeFromCart = async (cart_item_id) => {
    const { error } = await supabase
      .from("cart_items_test")
      .delete()
      .eq("cart_item_id", cart_item_id);

    if (!error) {
      setCartItems((prev) =>
        prev.filter((item) => item.cart_item_id !== cart_item_id)
      );
    }
  };
  // Merge guest cart into logged-in user's cart
const mergeCart = async (guestId, userId) => {
  if (!guestId || !userId) return;

  // 1. Fetch guest cart
  const { data: guestCart } = await supabase
    .from("cart_items_test")
    .select("*")
    .eq("user_id", guestId);

  if (!guestCart || guestCart.length === 0) return;

  // 2. Fetch user cart
  const { data: userCart } = await supabase
    .from("cart_items_test")
    .select("*")
    .eq("user_id", userId);

  // 3. Loop through guest items and merge
  for (const item of guestCart) {
    const existing = userCart?.find(
      (uc) => uc.product_id === item.product_id
    );

    if (existing) {
      // Product exists → update quantity
      await supabase
        .from("cart_items_test")
        .update({ quantity: existing.quantity + item.quantity })
        .eq("cart_item_id", existing.cart_item_id);
    } else {
      // Product doesn't exist → reassign to userId
      await supabase
        .from("cart_items_test")
        .update({ user_id: userId })
        .eq("cart_item_id", item.cart_item_id);
    }
  }

  // 4. Remove guestId from localStorage
  localStorage.removeItem("guest_user_id");

  // 5. Refresh local cart state
  fetchCart(userId);
};


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        fetchCart,
        isSidebarOpen,
        openSidebar: () => setIsSidebarOpen(true),
        closeSidebar: () => setIsSidebarOpen(false),
        mergeCart,
        userId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};



// import React, { createContext, useState, useEffect } from "react";
// import { supabase } from "../pages/SupabaseClient";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const user_id = 1;
//   const [cartItems, setCartItems] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const openSidebar = () => {
//     // ⭐ FIX: Check if we're NOT on the cart page before opening sidebar
//     if (window.location.pathname !== "/cart") {
//       setIsSidebarOpen(true);
//     }
//   };
  
//   const closeSidebar = () => setIsSidebarOpen(false);

//   const fetchCart = async () => {
//     const { data, error } = await supabase
//       .from("cart_items")
//       .select(`cart_item_id, quantity, products(*)`)
//       .eq("user_id", user_id);

//     if (!error && data) setCartItems(data);
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const totalItems = cartItems.reduce(
//     (sum, item) => sum + (item.quantity || 1),
//     0
//   );

//   const addToCart = async (product) => {
//     const existing = cartItems.find(
//       (item) => item.products.product_id === product.product_id
//     );

//     if (existing) {
//       const { error } = await supabase
//         .from("cart_items")
//         .update({ quantity: existing.quantity + 1 })
//         .eq("cart_item_id", existing.cart_item_id);

//       if (!error) {
//         setCartItems((prev) =>
//           prev.map((item) =>
//             item.cart_item_id === existing.cart_item_id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           )
//         );
//       }
//     } else {
//       const { data, error } = await supabase
//         .from("cart_items")
//         .insert({
//           user_id,
//           product_id: product.product_id,
//           quantity: 1,
//         })
//         .select(`cart_item_id, quantity, products(*)`)
//         .single();

//       if (!error && data) {
//         setCartItems((prev) => [...prev, data]);
//       }
//     }

//     // ⭐ FIXED: Only open sidebar if not on cart page
//     if (window.location.pathname !== "/cart") {
//       openSidebar();
//     }
//   };

//   const updateQuantity = async (cart_item_id, newQty) => {
//     if (newQty < 1) return;

//     const { error } = await supabase
//       .from("cart_items")
//       .update({ quantity: newQty })
//       .eq("cart_item_id", cart_item_id);

//     if (!error) {
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.cart_item_id === cart_item_id
//             ? { ...item, quantity: newQty }
//             : item
//         )
//       );
//     }
//   };

//   const removeFromCart = async (cart_item_id) => {
//     const { error } = await supabase
//       .from("cart_items")
//       .delete()
//       .eq("cart_item_id", cart_item_id);

//     if (!error) {
//       setCartItems((prev) =>
//         prev.filter((item) => item.cart_item_id !== cart_item_id)
//       );
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         updateQuantity,
//         removeFromCart,
//         totalItems,
//         fetchCart,
//         isSidebarOpen,
//         openSidebar,
//         closeSidebar,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
