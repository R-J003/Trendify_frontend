// frontend/src/app/(pages)/products/page.tsx

import React from "react";
import Link from "next/link"; // 1. Import the Link component
import { FilteredProductList } from "@/components/products/FilteredProductList";
import { ArrowLeft } from "lucide-react"; // 2. Import an icon for the button

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const categoryFilter = resolvedSearchParams.category;

  // Define the shared button styles for consistency
  const backButtonStyle =
    "inline-flex items-center gap-2 px-6 py-2 font-semibold border-2 rounded-lg transition-colors duration-300 text-light-primary border-light-primary hover:bg-light-primary hover:text-white dark:text-dark-primary dark:border-dark-primary dark:hover:bg-dark-primary dark:hover:text-white";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {categoryFilter ? `${categoryFilter}` : "All Products"}
      </h1>

      {/* 3. ADDED THE CONDITIONAL BACK BUTTON HERE */}
      {/* This button will only show up if a category filter is in the URL */}
      {categoryFilter && (
        <div className="mb-8">
          <Link href="/products" className={backButtonStyle}>
            <ArrowLeft className="h-5 w-5" />
            View All Products
          </Link>
        </div>
      )}

      {/* The existing product list */}
      <React.Suspense
        fallback={<p className="text-center">Loading products...</p>}
      >
        <FilteredProductList key={categoryFilter} category={categoryFilter} />
      </React.Suspense>
    </div>
  );
}
