// frontend/components/ui/ThemeToggle.tsx

"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";

// Theme toggle component - button to switch between light and dark themes
const ThemeToggle = () => {
  // Get current theme and toggle function from theme context
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-light-secondary dark:bg-dark-secondary hover:bg-light-secondary/80 dark:hover:bg-dark-secondary/80 transition-colors"
      aria-label="Toggle theme"
    >
      {/* Show sun icon in light mode, moon icon in dark mode */}
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-light-text dark:text-dark-text" />
      ) : (
        <Moon className="h-5 w-5 text-light-text dark:text-dark-text" />
      )}
    </button>
  );
};

export default ThemeToggle;
