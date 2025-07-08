// frontend/app/(pages)/products/[slug]/page.tsx

import { getProductBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import ProductDetailView from "@/components/products/ProductDetailView";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  // Await the params before accessing its properties
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // For simplicity, we're using the product's MongoDB _id as the slug.
  const product = await getProductBySlug(slug);

  // If no product is found for the given slug, render the standard 404 page.
  if (!product) {
    notFound();
  }

  // Render the client component and pass the fetched product data as a prop.
  return <ProductDetailView product={product} />;
}
