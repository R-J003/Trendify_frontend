// frontend/components/layout/Header.tsx

"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";

const Header = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="bg-light-background dark:bg-dark-background sticky top-0 z-50 border-b border-light-secondary dark:border-dark-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg" // This correctly points to your new SVG
                alt="Trendify Logo"
                width={28}
                height={28}
                priority
              />
              <span className="text-xl font-bold text-light-text dark:text-dark-text">
                Trendify
              </span>
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/cart"
              className="relative p-2 rounded-md bg-light-secondary dark:bg-dark-secondary hover:bg-light-secondary/80 dark:hover:bg-dark-secondary/80 transition-colors"
            >
              <ShoppingBag className="h-5 w-5 text-light-text dark:text-dark-text" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-light-primary dark:bg-dark-primary text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
