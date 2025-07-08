// frontend/src/app/page.tsx

import { getProducts, getCategories } from "@/lib/api"; // Import getCategories
import ProductGrid from "@/components/products/ProductGrid";
import HeroBanner from "@/components/home/HeroBanner";
import ShopByCategory from "@/components/home/ShopByCategory"; // Import new component
import CommunitySection from "@/components/home/CommunitySection"; // Import new component

export const revalidate = 3600;

export default async function HomePage() {
  // Fetch products and categories in parallel for better performance
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div>
      <HeroBanner />

      <section className="my-16">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-center py-10">No featured products available.</p>
        )}
      </section>

      {/* Add Shop by Category section */}
      {categories.length > 0 && <ShopByCategory categories={categories} />}

      {/* Add Community section */}
      <CommunitySection />
    </div>
  );
}
