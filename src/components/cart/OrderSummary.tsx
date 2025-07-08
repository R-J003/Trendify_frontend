// frontend/src/components/cart/OrderSummary.tsx
"use client";

import { useCart } from "@/hooks/useCart";

// Define props to accept the onCheckout function
interface OrderSummaryProps {
  onCheckout: () => void; // Expects a function to be passed from the parent
}

const OrderSummary = ({ onCheckout }: OrderSummaryProps) => {
  const { getCartTotal } = useCart();
  const subtotal = getCartTotal();
  const SHIPPING_COST = 70;
  const TAX_RATE = 0.12;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING_COST + tax;

  return (
    <div className="p-6 rounded-lg border border-light-secondary dark:border-dark-secondary bg-light-card dark:bg-dark-card sticky top-24">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium">₹{SHIPPING_COST.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-light-secondary dark:border-dark-secondary my-3"></div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
      {/* The button now calls the onCheckout prop */}
      <button
        onClick={onCheckout}
        className="mt-6 w-full py-3 px-6 rounded-lg font-semibold text-white bg-light-primary dark:bg-dark-primary hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover transition-colors duration-300"
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
