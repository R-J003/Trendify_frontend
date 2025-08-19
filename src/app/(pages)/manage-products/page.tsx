// frontend/src/app/(pages)/manage-products/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/api";
import ProductForm from "@/components/manage-products/ProductForm";
import ManageProductList from "@/components/manage-products/ManageProductList";

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for loading

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormVisible(true);
  };

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
      fetchProducts();
    }
  };

  const handleCreateNew = () => {
    setEditingProduct(null);
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (productData: Omit<Product, "_id">) => {
    setIsSubmitting(true); // Set loading state to true
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
      } else {
        await createProduct(productData);
      }
      fetchProducts();
      setIsFormVisible(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Failed to submit form:", error);
      // Optionally, show an error message to the user here
    } finally {
      setIsSubmitting(false); // Set loading state to false
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        {!isFormVisible && (
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-light-primary text-white rounded-lg hover:bg-light-primary-hover"
          >
            Create New Product
          </button>
        )}
      </div>

      {isFormVisible ? (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormVisible(false)}
          isSubmitting={isSubmitting} // Pass the loading state to the form
        />
      ) : (
        <ManageProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
