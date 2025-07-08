// frontend/components/ui/ThemeToggle.tsx

"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-light-secondary dark:bg-dark-secondary hover:bg-light-secondary/80 dark:hover:bg-dark-secondary/80 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-light-text dark:text-dark-text" />
      ) : (
        <Moon className="h-5 w-5 text-light-text dark:text-dark-text" />
      )}
    </button>
  );
};

export default ThemeToggle;
