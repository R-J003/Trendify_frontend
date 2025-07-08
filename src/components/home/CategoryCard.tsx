// frontend/src/components/home/CategoryCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    // === THIS IS THE KEY CHANGE ===
    // The link now points to the products page with a category query parameter.
    <Link
      href={`/products?category=${category.name}`}
      className="group block text-center"
    >
      <div className="relative w-full overflow-hidden rounded-lg aspect-square bg-light-secondary dark:bg-dark-secondary">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-2 font-semibold text-light-text dark:text-dark-text">
        {category.name}
      </h3>
    </Link>
  );
};

export default CategoryCard;
