// frontend/src/components/home/CategoryCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";

// Props interface for CategoryCard component
interface CategoryCardProps {
  category: Category;
}

// Category card component - displays clickable category with image and name
const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    // Link to products page filtered by category
    <Link
      href={`/products?category=${category.name}`}
      className="group block text-center"
    >
      {/* Category image container with hover effect */}
      <div className="relative w-full overflow-hidden rounded-lg aspect-square bg-light-secondary dark:bg-dark-secondary">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {/* Category name */}
      <h3 className="mt-2 font-semibold text-light-text dark:text-dark-text">
        {category.name}
      </h3>
    </Link>
  );
};

export default CategoryCard;
