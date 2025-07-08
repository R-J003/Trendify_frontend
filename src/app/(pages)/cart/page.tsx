// frontend/src/app/(pages)/cart/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary"; // Correct default import
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react"; // Import CheckCircle for the modal icon
import Confetti from "react-confetti"; // Import the confetti component

export default function CartPage() {
  const { cartItems, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false); // State to control confetti/modal

  // State for confetti to get window dimensions (important for fullscreen confetti)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Handler to update windowSize on resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Call handler right away so state is updated on mount

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const handleCheckout = () => {
    setIsCheckingOut(true); // Trigger confetti and modal

    // After a delay, clear cart, hide modal, and redirect to homepage
    setTimeout(() => {
      clearCart(); // Clear the cart after "checkout"
      setIsCheckingOut(false); // Hide the modal and stop confetti
    }, 5000); // Display for 4 seconds
  };

  // Shared styles for the "Continue Shopping" button
  const continueShoppingStyles =
    "inline-flex items-center gap-2 px-6 py-2 font-semibold border-2 rounded-lg transition-colors duration-300 text-light-primary border-light-primary hover:bg-light-primary hover:text-white dark:text-dark-primary dark:border-dark-primary dark:hover:bg-dark-primary dark:hover:text-white";

  return (
    <div>
      {/* Conditionally render Confetti and Success Modal */}
      {isCheckingOut && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false} // Ensures confetti bursts once and disappears
            numberOfPieces={400} // Adjust number of confetti pieces
            tweenDuration={3000} // Duration for confetti animation
          />
          {/* Full-screen overlay for the success message */}
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-light-card dark:bg-dark-card p-8 rounded-lg shadow-xl text-center flex flex-col items-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                Checkout Successful!
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Thank you for your order.
              </p>
            </div>
          </div>
        </>
      )}

      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem key={`${item._id}-${item.selectedSize}`} item={item} />
            ))}
          </div>

          {/* Order Summary - Pass the handleCheckout function as a prop */}
          <div className="lg:col-span-1">
            <OrderSummary onCheckout={handleCheckout} />
          </div>
        </div>
      ) : (
        /* Empty cart view */
        <div className="text-center py-16 border border-dashed border-light-secondary dark:border-dark-secondary rounded-lg">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <Link href="/" className={continueShoppingStyles}>
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      )}
      {/* "Continue Shopping" link for non-empty cart */}
      {cartItems.length > 0 && (
        <div className="mt-8">
          <Link href="/" className={continueShoppingStyles}>
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      )}
    </div>
  );
}
