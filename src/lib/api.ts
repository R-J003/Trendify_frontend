// frontend/lib/api.ts

import { Product, Category } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

// In a real application, this would come from an environment variable
// e.g., process.env.NEXT_PUBLIC_API_URL
const API_URL = "https://trendify-backend-ehwe.onrender.com/api/v1";

// A utility function to handle fetch responses
async function fetcher<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    // In a real app, you'd want more robust error handling
    throw new Error(
      `An error occurred while fetching the data: ${response.statusText}`
    );
  }

  return response.json();
}

// Fetches all products from the backend
export async function getProducts(): Promise<Product[]> {
  noStore(); // Opt out of caching for this fetch
  try {
    const products = await fetcher<Product[]>(`${API_URL}/products`);
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Return an empty array or mock data to prevent build errors
    // In a real scenario, you might want the page to show an error state.
    return [];
  }
}

// Fetches a single product by its slug (we'll use ID as the slug for simplicity)
export async function getProductBySlug(slug: string): Promise<Product | null> {
  noStore(); // Opt out of caching for this fetch
  try {
    const product = await fetcher<Product>(`${API_URL}/products/${slug}`);
    return product;
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error);
    return null; // Return null if the product is not found or an error occurs
  }
}

// Fetches all categories from the backend
export async function getCategories(): Promise<Category[]> {
  noStore();
  try {
      const categories = await fetcher<Category[]>(`${API_URL}/categories`);
      return categories;
  } catch (error) {
      console.error("Failed to fetch categories:", error);
      return [];
  }
}
