// frontend/lib/api.ts

//API Client for Trendify E-commerce Application
import { Product, Category } from "@/types";
import { unstable_noStore as noStore } from "next/cache";
import axios from "axios";

/**
 * Base URL for the Trendify backend API
 *
 * In a real application, this would come from an environment variable
 * e.g., process.env.NEXT_PUBLIC_API_URL
 *
 * @constant {string} API_URL - The base URL for all API requests
 */
const API_URL = "https://trendify-backend-ehwe.onrender.com/api/v1";

/**
 * Axios instance with pre-configured settings
 *
 * This instance includes default headers and base configuration
 * that will be applied to all requests made through this client.
 */
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout - increased for slower backend responses
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `API request successful: ${response.config.url} (${response.status})`
    );
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `API request failed: ${error.config?.url} (${error.response.status})`
      );
    } else if (error.request) {
      console.error(`API request failed: ${error.config?.url} (No response)`);
    } else {
      console.error(`API request setup failed: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

/**
 * Generic utility function to handle HTTP requests using axios with retry logic
 *
 * This function wraps axios requests to provide consistent error handling,
 * response processing, and automatic retry for failed requests.
 *
 * @template T - The expected response data type
 * @param {string} endpoint - The API endpoint path (relative to base URL)
 * @param {object} options - Optional axios configuration (method, data, params, etc.)
 * @param {number} retries - Number of retry attempts (default: 2)
 * @returns {Promise<T>} - A promise that resolves to the response data
 * @throws {Error} - Throws an error if all retry attempts fail
 */
async function apiRequest<T>(
  endpoint: string,
  options: Record<string, unknown> = {},
  retries: number = 2
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await apiClient.request<T>({
        url: endpoint,
        ...options,
      });

      return response.data;
    } catch (error: unknown) {
      lastError = error;

      // Don't retry on the last attempt
      if (attempt === retries) {
        break;
      }

      // Check if we should retry this error
      const shouldRetry = shouldRetryRequest(error);
      if (!shouldRetry) {
        break;
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s...
      await new Promise((resolve) => setTimeout(resolve, delay));

      console.log(
        `Retrying request to ${endpoint} (attempt ${attempt + 2}/${
          retries + 1
        })`
      );
    }
  }

  // All attempts failed, handle the last error
  return handleApiError(lastError);
}

/**
 * Determines if a request should be retried based on the error type
 */
function shouldRetryRequest(error: unknown): boolean {
  if (error && typeof error === "object") {
    const axiosError = error as {
      code?: string;
      response?: { status: number };
    };

    // Retry on timeout errors
    if (axiosError.code === "ECONNABORTED") {
      return true;
    }

    // Retry on network errors (no response)
    if (!axiosError.response) {
      return true;
    }

    // Retry on 5xx server errors, but not on 4xx client errors
    if (axiosError.response && axiosError.response.status >= 500) {
      return true;
    }
  }

  return false;
}

/**
 * Handles and formats API errors with user-friendly messages
 */
function handleApiError(error: unknown): never {
  if (error && typeof error === "object") {
    const axiosError = error as {
      code?: string;
      response?: {
        status: number;
        statusText: string;
        data?: { message?: string };
      };
      request?: unknown;
      message?: string;
    };

    // Handle timeout errors specifically
    if (
      axiosError.code === "ECONNABORTED" ||
      (axiosError.message && axiosError.message.includes("timeout"))
    ) {
      throw new Error(
        "Request timeout: The server is taking too long to respond. Please try again later."
      );
    }

    if (axiosError.response) {
      // Server responded with error status
      const statusCode = axiosError.response.status;
      const errorMessage =
        axiosError.response.data?.message || axiosError.response.statusText;
      throw new Error(`API Error (${statusCode}): ${errorMessage}`);
    } else if (axiosError.request) {
      // Request was made but no response received (network error)
      throw new Error(
        "Network error: Unable to connect to the server. Please check your internet connection."
      );
    }
  }

  // Something else happened in setting up the request
  const errorMessage =
    error instanceof Error ? error.message : "Unknown error occurred";
  throw new Error(`Request error: ${errorMessage}`);
}

/**
 * Fetches all products from the backend API
 *
 * This function retrieves the complete list of products available in the store.
 * It includes error handling and cache control to ensure fresh data on each request.
 *
 * @returns {Promise<Product[]>} - A promise that resolves to an array of Product objects
 * @example
 * ```typescript
 * const products = await getProducts();
 * console.log(products.length); // Number of products available
 * ```
 */
export async function getProducts(): Promise<Product[]> {
  noStore(); // Opt out of caching for this fetch to ensure fresh data

  try {
    const products = await apiRequest<Product[]>("/products");
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Return an empty array to prevent build errors and allow graceful degradation
    return [];
  }
}
/**
 * Fetches a single product by its slug (identifier)
 *
 * This function retrieves detailed information for a specific product using its slug.
 * Currently uses the product ID as the slug for simplicity, but could be extended
 * to use SEO-friendly URL slugs in the future.
 *
 * @param {string} slug - The unique identifier for the product (currently the product ID)
 * @returns {Promise<Product | null>} - A promise that resolves to a Product object or null if not found
 * @example
 * ```typescript
 * const product = await getProductBySlug("123");
 * if (product) {
 *   console.log(product.name); // Product name
 * } else {
 *   console.log("Product not found");
 * }
 * ```
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  noStore(); // Opt out of caching for this fetch to ensure fresh data

  try {
    const product = await apiRequest<Product>(`/products/${slug}`);
    return product;
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error);
    // Return null if the product is not found or an error occurs
    // This allows components to handle the "not found" state gracefully
    return null;
  }
}

/**
 * Fetches all product categories from the backend API
 *
 * This function retrieves the complete list of product categories available in the store.
 * Categories are typically used for navigation, filtering, and organizing products.
 *
 * @returns {Promise<Category[]>} - A promise that resolves to an array of Category objects
 * @example
 * ```typescript
 * const categories = await getCategories();
 * categories.forEach(category => {
 *   console.log(category.name); // Category name
 * });
 * ```
 */
export async function getCategories(): Promise<Category[]> {
  // Opt out of caching for this fetch to ensure fresh data
  noStore();

  try {
    const categories = await apiRequest<Category[]>("/categories");
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // Return an empty array to prevent build errors and allow graceful degradation
    // Components can handle empty categories by showing a loading state or error message
    return [];
  }
}

/**
 * Health check function to test API connectivity
 *
 * This function can be used to verify if the backend API is accessible
 * and responding to requests. Useful for debugging connectivity issues.
 *
 * @returns {Promise<boolean>} - A promise that resolves to true if API is healthy
 * @example
 * ```typescript
 * const isHealthy = await checkApiHealth();
 * if (!isHealthy) {
 *   console.log("API is not responding");
 * }
 * ```
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    // Try a simple request to see if the API is responsive
    await apiRequest("/products", { timeout: 5000 }); // Shorter timeout for health check
    return true;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
}
