// frontend/hooks/useCart.ts

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

// Custom hook to access the CartContext
// Provides access to cart items and functions for manipulating the cart
export const useCart = () => {
  const context = useContext(CartContext);

  // Ensure hook is used within CartProvider
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
