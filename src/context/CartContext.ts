// frontend/context/CartContext.ts

import { createContext } from "react";
import { CartContextType } from "@/types";

// Create the context with a default undefined value.
// The actual implementation and value will be provided by CartProvider.
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
