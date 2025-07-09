// frontend/src/components/products/FilteredProductList.tsx

import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/products/ProductGrid";
import { Product } from "@/types";

// Filtered product list component - fetches and filters products by category
export async function FilteredProductList({ category }: { category?: string }) {
  // Fetch all products from API
  const allProducts: Product[] = await getProducts();

  // Filter products by category if provided, otherwise show all
  const filteredProducts = category
    ? allProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      )
    : allProducts;

  return (
    <>
      {/* Show product grid if products found, otherwise show empty message */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <p className="text-center py-10">No products found in this category.</p>
      )}
    </>
  );
}
