// frontend/src/app/page.tsx

import { getProducts, getCategories } from "@/lib/api";
import ProductGrid from "@/components/products/ProductGrid";
import HeroBanner from "@/components/home/HeroBanner";
import ShopByCategory from "@/components/home/ShopByCategory";
import CommunitySection from "@/components/home/CommunitySection";

// Revalidate page every hour (3600 seconds) for ISR
export const revalidate = 3600;

// Home page component - main landing page
export default async function HomePage() {
  // Fetch products and categories in parallel for better performance
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div>
      {/* Hero banner section */}
      <HeroBanner />

      {/* Featured products section */}
      <section className="my-16">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-center py-10">No featured products available.</p>
        )}
      </section>

      {/* Shop by category section */}
      {categories.length > 0 && <ShopByCategory categories={categories} />}

      {/* Community engagement section */}
      <CommunitySection />
    </div>
  );
}
