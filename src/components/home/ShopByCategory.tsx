// frontend/src/components/home/ShopByCategory.tsx
import { Category } from "@/types";
import CategoryCard from "./CategoryCard";

// Props interface for ShopByCategory component
interface ShopByCategoryProps {
  categories: Category[];
}

// Shop by category component - displays grid of category cards
const ShopByCategory = ({ categories }: ShopByCategoryProps) => {
  return (
    <section className="my-16">
      {/* Section heading */}
      <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
      
      {/* Responsive category grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
