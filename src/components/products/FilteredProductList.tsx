// frontend/src/components/products/FilteredProductList.tsx

import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/products/ProductGrid";
import { Product } from "@/types";

// This component will do the actual fetching and filtering
export async function FilteredProductList({ category }: { category?: string }) {
  const allProducts: Product[] = await getProducts();

  const filteredProducts = category
    ? allProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      )
    : allProducts;

  return (
    <>
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <p className="text-center py-10">No products found in this category.</p>
      )}
    </>
  );
}
