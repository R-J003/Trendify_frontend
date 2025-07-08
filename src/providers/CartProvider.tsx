// frontend/providers/CartProvider.tsx

"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { CartContext } from "@/context/CartContext";
import { CartItem, Product } from "@/types";

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      setCartItems([]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, size: string) => {
    setCartItems((prevItems) => {
      // Check if the item with the same ID and size already exists
      const existingItem = prevItems.find(
        (item) => item._id === product._id && item.selectedSize === size
      );

      if (existingItem) {
        // If it exists, increase the quantity
        return prevItems.map((item) =>
          item._id === product._id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it doesn't exist, add the new item to the cart
        const newItem: CartItem = {
          ...product,
          quantity: 1,
          selectedSize: size,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const updateQuantity = (
    productId: string,
    size: string,
    newQuantity: number
  ) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item._id === productId && item.selectedSize === size
              ? { ...item, quantity: newQuantity }
              : item
          )
          .filter((item) => item.quantity > 0) // Also remove if quantity is 0
    );
  };

  const removeFromCart = (productId: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item._id === productId && item.selectedSize === size)
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    // We count the number of unique items (product + size), not the total quantity.
    return cartItems.length;
  };

  /*confetti function*/
  const clearCart = () => {
    setCartItems([]);
    // The useEffect hook will automatically clear localStorage
  };


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        getCartTotal,
        getCartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
