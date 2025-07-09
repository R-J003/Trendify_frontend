// frontend/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { CartProvider } from "@/providers/CartProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Google font configuration
const inter = Inter({ subsets: ["latin"] });

// SEO metadata configuration
export const metadata: Metadata = {
  title: "Trendify - Modern Fashion",
  description: "Discover the latest trends and timeless classics in fashion.",
};

// Root layout component - wraps all pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Theme provider for dark/light mode */}
        <ThemeProvider>
          {/* Cart provider for shopping cart state */}
          <CartProvider>
            {/* Main app layout structure */}
            <div className="flex flex-col min-h-screen">
              {/* Header component */}
              <Header />
              {/* Main content area */}
              <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
              {/* Footer component */}
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
