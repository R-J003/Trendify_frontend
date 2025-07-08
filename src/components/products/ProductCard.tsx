// frontend/src/components/products/ProductCard.tsx

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Use the product ID as the slug for the URL
  const productSlug = product._id;

  return (
    <Link
      href={`/products/${productSlug}`}
      className="group block overflow-hidden rounded-lg border border-light-card-stroke dark:border-dark-card-stroke bg-light-card dark:bg-dark-card shadow-sm transition-all duration-300 hover:shadow-md"
    >
      {/* Image container with a fixed height to accommodate landscape photos */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Text content below the image */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-light-text dark:text-dark-text">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {product.category}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
