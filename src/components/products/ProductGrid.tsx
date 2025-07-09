// frontend/src/components/products/ProductGrid.tsx

import { Product } from "@/types";
import ProductCard from "./ProductCard";

// Props interface for ProductGrid component
interface ProductGridProps {
  products: Product[];
}

// Product grid component - displays products in responsive grid layout
const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    // Responsive grid: 1 column on mobile, 2 on small screens, 3 on medium, and 4 on large screens
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Map through products and render ProductCard for each */}
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
