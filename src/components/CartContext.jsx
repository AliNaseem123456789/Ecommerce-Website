import React, { createContext, useState } from "react";
import { addToCart as addToCartDB } from "../api/cart";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const user_id = 1; // Replace later with real auth user id

  const addToCart = async (product) => {
    await addToCartDB(user_id, product.product_id);

    // Optional: update React cart UI count
    console.log("Added to cart:", product.name);
  };

  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
