// frontend/src/components/cart/CartItem.tsx

import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { CartItem as CartItemType } from "@/types";
import QuantitySelector from "@/components/ui/QuantitySelector";
import Link from "next/link";

// Props interface for CartItem component
interface CartItemProps {
  item: CartItemType;
}

// Cart item component - displays individual cart items
const CartItem = ({ item }: CartItemProps) => {
  // Cart actions from context
  const { updateQuantity, removeFromCart } = useCart();

  // Handle quantity increase
  const handleIncrease = () => {
    updateQuantity(item._id, item.selectedSize, item.quantity + 1);
  };

  // Handle quantity decrease (minimum 1)
  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item._id, item.selectedSize, item.quantity - 1);
    }
  };

  // Handle item removal from cart
  const handleRemove = () => {
    removeFromCart(item._id, item.selectedSize);
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-light-secondary dark:border-dark-secondary bg-light-card dark:bg-dark-card">
      {/* Product image */}
      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Product details */}
      <div className="flex-grow">
        <Link href={`/products/${item._id}`}>
          <h3 className="font-semibold hover:underline">{item.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Size: {item.selectedSize}
        </p>
        <p className="text-sm font-medium mt-1">₹{item.price.toFixed(2)}</p>
      </div>

      {/* Quantity controls and remove button */}
      <div className="flex flex-col items-end gap-3">
        <QuantitySelector
          quantity={item.quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />

        {/* Remove item button */}
        <button
          onClick={handleRemove}
          className="px-3 py-1 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 rounded-md transition-colors duration-200"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
