import React, { createContext, useState, useEffect } from "react";
import { addToCart as addToCartDB } from "../api/cart";
import { supabase } from "../pages/SupabaseClient";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const user_id = 1;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const { data, error } = await supabase
        .from("cart_items")
        .select(`cart_item_id, quantity, products(*)`)
        .eq("user_id", user_id);
      if (!error && data) setCartItems(data);
    };
    fetchCart();
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const addToCart = async (product) => {
    await addToCartDB(user_id, product.product_id);

    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (item) => item.products.product_id === product.product_id
      );
      if (existing) {
        return prevItems.map((item) =>
          item.products.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { cart_item_id: Date.now(), products: product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = async (cart_item_id, newQty) => {
    if (newQty < 1) return;
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQty })
      .eq("cart_item_id", cart_item_id);

    if (!error) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.cart_item_id === cart_item_id ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const removeFromCart = async (cart_item_id) => {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_item_id", cart_item_id);

    if (!error) {
      setCartItems((prev) => prev.filter((item) => item.cart_item_id !== cart_item_id));
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
