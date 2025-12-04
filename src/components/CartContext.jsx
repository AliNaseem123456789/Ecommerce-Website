import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../pages/SupabaseClient";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const user_id = 1; // Replace with dynamic user ID in real app
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from Supabase
  const fetchCart = async () => {
    const { data, error } = await supabase
      .from("cart_items")
      .select(`cart_item_id, quantity, products(*)`)
      .eq("user_id", user_id);

    if (!error && data) setCartItems(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Total number of items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Add product to cart
  const addToCart = async (product) => {
    // Check if product exists in cart
    const existing = cartItems.find(
      (item) => item.products.product_id === product.product_id
    );

    if (existing) {
      // Update quantity in Supabase
      const { error } = await supabase
        .from("cart_items")
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
      // Insert new item in Supabase
      const { data, error } = await supabase
        .from("cart_items")
        .insert({ user_id, product_id: product.product_id, quantity: 1 })
        .select(`cart_item_id, quantity, products(*)`)
        .single();

      if (!error && data) {
        setCartItems((prev) => [...prev, data]);
      }
    }
  };

  // Update quantity of a cart item
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

  // Remove item from cart
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
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, totalItems, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
