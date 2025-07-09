// frontend/providers/ThemeProvider.tsx

"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { ThemeContextType } from "@/types";


 //Props interface for the ThemeProvider component
 
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Main theme state - can be either 'light' or 'dark'
  // Default to 'light' to prevent hydration mismatches during SSR
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Effect to set the initial theme from localStorage or system preference
  useEffect(() => {
    // Attempt to retrieve previously stored theme preference
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    
    // Check if user's system prefers dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Effect to apply the theme class to the body element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
