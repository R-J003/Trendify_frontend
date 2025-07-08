// frontend/context/ThemeContext.ts

import { createContext } from "react";
import { ThemeContextType } from "@/types";

// Create a context with a default value.
// The default values are placeholders and will be replaced by the provider.
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
