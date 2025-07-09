// frontend/context/CartContext.ts

import { createContext } from "react";
import { CartContextType } from "@/types";

/*
 Cart Context:
  Creates a React context for managing shopping cart state across the application.
  Provides cart items, quantities, and cart manipulation functions to all child components.
 
  @default undefined - Ensures CartProvider wrapper is required for proper usage
 */
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
