// frontend/hooks/useTheme.ts

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

// Custom hook to access the ThemeContext
// Provides access to current theme and toggle function
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
