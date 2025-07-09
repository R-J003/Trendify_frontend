// frontend/providers/CartProvider.tsx

"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { CartContext } from "@/context/CartContext";
import { CartItem, Product } from "@/types";


 // Props interface for the CartProvider component

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  // Main cart state - array of cart items with product details and quantities
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
      // Reset to empty cart if stored data is corrupted
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
        // If it exists, increase the quantity by 1
        return prevItems.map((item) =>
          item._id === product._id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it doesn't exist, add the new item to the cart with quantity 1
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
          .filter((item) => item.quantity > 0) // Automatically remove items with quantity 0 or less
    );
  };

  // Remove an item from the cart based on product ID and size
  // This function filters out the item that matches both the product ID and size
  const removeFromCart = (productId: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item._id === productId && item.selectedSize === size)
      )
    );
  };

  // Calculate the total price of all items in the cart
  // This function multiplies each item's price by its quantity and sums them up
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Get the number of unique items in the cart
  const getCartCount = () => {
    // We count the number of unique items (product + size), not the total quantity
    return cartItems.length;
  };

  //confetti function
  const clearCart = () => {
    setCartItems([]);
    // The useEffect hook will automatically clear localStorage
  };

  // Provide the cart context to children components
  // This includes the cart items, functions to manipulate the cart, and computed values
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
