// frontend/src/types/index.ts

// Represents a single product in the catalog
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  sizes: string[];
}

// Represents an item added to the shopping cart
export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

// Represents the structure of the shopping cart context
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    newQuantity: number
  ) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void; //  The clearCart function
  getCartTotal: () => number;
  getCartCount: () => number;
}

// Represents the structure of the theme context
export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// Represents a single category for the "Shop by Category" section
export interface Category {
  name: string;
  imageUrl: string;
}
