// frontend/lib/api.ts

//API Client for Trendify E-commerce Application
import { Product, Category } from "@/types";
import { unstable_noStore as noStore } from "next/cache";
import axios from "axios";

// --- Supporting Types for CRUD Operations ---
/**
 * Represents the data structure for creating a new product.
 * It's the same as the Product type, but without the database-generated `_id`.
 */
type ProductCreationData = Omit<Product, "_id">;

/**
 * Represents the data structure for updating a product.
 * All fields are optional, as you might only update one or two at a time.
 */
type ProductUpdateData = Partial<ProductCreationData>;

// --- Axios and API Configuration ---

/**
 * Base URL for the Trendify backend API.
 * Loaded from environment variables to support different environments (dev, prod).
 *
 * @constant {string} API_URL
 */
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://trendify-backend-ehwe.onrender.com";

/**
 * Axios instance with pre-configured settings for all API requests.
 */
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request interceptor for logging
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

// Response interceptor for logging
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

// --- Generic Request Handler with Retry Logic ---

/**
 * Generic utility function to handle HTTP requests using axios with retry logic.
 *
 * @template T - The expected response data type
 * @param {string} endpoint - The API endpoint path
 * @param {object} options - Optional axios configuration
 * @param {number} retries - Number of retry attempts (default: 2)
 * @returns {Promise<T>} - A promise that resolves to the response data
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
      if (attempt === retries || !shouldRetryRequest(error)) {
        break;
      }
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      console.log(
        `Retrying request to ${endpoint} (attempt ${attempt + 2}/${
          retries + 1
        })`
      );
    }
  }
  return handleApiError(lastError);
}

/**
 * Determines if a request should be retried based on the error type.
 */
function shouldRetryRequest(error: unknown): boolean {
  if (error && typeof error === "object") {
    const axiosError = error as {
      code?: string;
      response?: { status: number };
    };
    if (
      axiosError.code === "ECONNABORTED" ||
      !axiosError.response ||
      axiosError.response.status >= 500
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Handles and formats API errors with user-friendly messages.
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
    if (
      axiosError.code === "ECONNABORTED" ||
      (axiosError.message && axiosError.message.includes("timeout"))
    ) {
      throw new Error(
        "Request timeout: The server is taking too long to respond."
      );
    }
    if (axiosError.response) {
      const { status, data } = axiosError.response;
      const message = data?.message || "An unexpected error occurred.";
      throw new Error(`API Error (${status}): ${message}`);
    } else if (axiosError.request) {
      throw new Error("Network error: Unable to connect to the server.");
    }
  }
  throw new Error(
    `Request error: ${error instanceof Error ? error.message : "Unknown error"}`
  );
}

// --- API Functions (Read Operations) ---

/**
 * Fetches all products from the backend API.
 * @returns {Promise<Product[]>} - An array of Product objects.
 */
export async function getProducts(): Promise<Product[]> {
  noStore();
  try {
    return await apiRequest<Product[]>("/products");
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

/**
 * Fetches a single product by its slug (ID).
 * @param {string} slug - The unique identifier for the product.
 * @returns {Promise<Product | null>} - A Product object or null if not found.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  noStore();
  try {
    return await apiRequest<Product>(`/products/${slug}`);
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetches all product categories from the backend API.
 * @returns {Promise<Category[]>} - An array of Category objects.
 */
export async function getCategories(): Promise<Category[]> {
  noStore();
  try {
    return await apiRequest<Category[]>("/categories");
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

// --- API Functions (Create, Update, Delete Operations) ---

/**
 * Creates a new product in the database.
 * @param {ProductCreationData} productData - The data for the new product.
 * @returns {Promise<Product>} - The newly created product object, including its new ID.
 */
export async function createProduct(
  productData: ProductCreationData
): Promise<Product> {
  // Use a shorter retry cycle for create/update operations
  return await apiRequest<Product>(
    "/products",
    {
      method: "POST",
      data: productData,
    },
    1
  );
}

/**
 * Updates an existing product by its ID.
 * @param {string} productId - The ID of the product to update.
 * @param {ProductUpdateData} productData - The fields to update.
 * @returns {Promise<Product>} - The full, updated product object.
 */
export async function updateProduct(
  productId: string,
  productData: ProductUpdateData
): Promise<Product> {
  return await apiRequest<Product>(
    `/products/${productId}`,
    {
      method: "PUT",
      data: productData,
    },
    1
  );
}

/**
 * Deletes a product from the database by its ID.
 * @param {string} productId - The ID of the product to delete.
 * @returns {Promise<void>} - A promise that resolves when the deletion is successful.
 */
export async function deleteProduct(productId: string): Promise<void> {
  await apiRequest<void>(
    `/products/${productId}`,
    {
      method: "DELETE",
    },
    1
  );
}

// --- Utility and Health Check ---

/**
 * Health check function to test API connectivity.
 * @returns {Promise<boolean>} - True if the API is healthy.
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    await apiRequest("/health", { timeout: 5000 }); // Assuming you have a /health endpoint
    return true;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
}
