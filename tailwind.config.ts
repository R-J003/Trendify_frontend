import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Added src directory
  ],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light Theme Colors
        light: {
          background: "#F8FAFC", // Very light gray, almost white
          text: "#020617", // Slate 950
          primary: "#059669", // Emerald 600
          "primary-hover": "#047857", // Emerald 700
          secondary: "#E2E8F0", // Slate 200
          card: "#FFFFFF",
          "card-stroke": "#E2E8F0", // Slate 200
          muted: "#64748B", // Slate 500
          accent: "#0EA5E9", // Sky 500
        },
        // Dark Theme Colors
        dark: {
          background: "#0F172A", // Slate 900
          text: "#F8FAFC", // Slate 50
          primary: "#10B981", // Emerald 500
          "primary-hover": "#059669", // Emerald 600
          secondary: "#1E293B", // Slate 800
          card: "#1E293B", // Slate 800
          "card-stroke": "#334155", // Slate 700
          muted: "#94A3B8", // Slate 400
          accent: "#0EA5E9", // Sky 500
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "soft-dark":
          "0 2px 15px -3px rgba(0, 0, 0, 0.3), 0 10px 20px -2px rgba(0, 0, 0, 0.2)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
