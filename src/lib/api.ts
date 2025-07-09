// frontend/lib/api.ts

//API Client for Trendify E-commerce Application
import { Product, Category } from "@/types";
import { unstable_noStore as noStore } from "next/cache";

/*
 Base URL for the Trendify backend API
 @constant {string} API_URL - The base URL for all API requests
 */
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
    // Could include status codes, error messages from the server, etc.
    throw new Error(
      `An error occurred while fetching the data: ${response.statusText}`
    );
  }

  return response.json();
}

export async function getProducts(): Promise<Product[]> {
  noStore(); // Opt out of caching for this fetch to ensure fresh data
  
  try {
    const products = await fetcher<Product[]>(`${API_URL}/products`);
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Return an empty array to prevent build errors and allow graceful degradation
    return [];
  }
}
// Fetches a single product by its slug (we'll use ID as the slug for simplicity)
export async function getProductBySlug(slug: string): Promise<Product | null> {
  noStore(); // Opt out of caching for this fetch to ensure fresh data
  
  try {
    const product = await fetcher<Product>(`${API_URL}/products/${slug}`);
    return product;
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error);
    // Return null if the product is not found or an error occurs
    // This allows components to handle the "not found" state gracefully
    return null;
  }
}

// Fetches all categories from the backend
export async function getCategories(): Promise<Category[]> {

  // Opt out of caching for this fetch
  noStore();

  try {
      const categories = await fetcher<Category[]>(`${API_URL}/categories`);
      return categories;
  } catch (error) {
      console.error("Failed to fetch categories:", error);
      return [];
  }
}
