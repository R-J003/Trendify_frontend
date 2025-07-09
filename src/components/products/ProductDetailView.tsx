// frontend/components/products/ProductDetailView.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { ArrowLeft } from "lucide-react";

// Props interface for ProductDetailView component
interface ProductDetailViewProps {
  product: Product;
}

// Product detail view component - displays full product details with size selection and add to cart
const ProductDetailView = ({ product }: ProductDetailViewProps) => {
  // State management for size selection, errors, and add to cart feedback
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  // Hooks for cart functionality and navigation
  const { addToCart } = useCart();
  const router = useRouter();

  // Handle add to cart with validation and feedback
  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size.");
      return;
    }
    setError(null);
    addToCart(product, selectedSize);
    setIsAdded(true);
    // Reset success state after 3 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  return (
    <>
      {/* Main product layout - image and details side by side */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-lg bg-light-card dark:bg-dark-card border border-light-card-stroke dark:border-dark-card-stroke">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col py-4">
          {/* Product name and price */}
          <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl mt-2 mb-4">₹{product.price.toFixed(2)}</p>

          {/* Product description */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-3">Available Sizes</h3>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    if (error) setError(null); // Clear error when size is selected
                  }}
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors duration-200 ${
                    selectedSize === size
                      ? "border-light-primary dark:border-dark-primary bg-emerald-50 dark:bg-emerald-900/30 text-light-primary dark:text-dark-text"
                      : "border-light-secondary dark:border-dark-secondary hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button Section */}
          <div className="mt-auto pt-4">
            {/* Error message display */}
            {error && (
              <div className="mb-4 text-center">
                <p className="text-lg font-medium text-red-500 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* Add to cart button */}
            <div className="flex justify-center">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full max-w-sm py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  isAdded
                    ? "bg-green-500"
                    : "bg-light-primary dark:bg-dark-primary hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover"
                }`}
              >
                {isAdded ? "Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to products button */}
      <div className="mt-12">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-6 py-2 font-semibold border-2 rounded-lg transition-colors duration-300 text-light-primary border-light-primary hover:bg-light-primary hover:text-white dark:text-dark-primary dark:border-dark-primary dark:hover:bg-dark-primary dark:hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Products
        </button>
      </div>
    </>
  );
};

export default ProductDetailView;
