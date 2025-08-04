// frontend/src/app/(pages)/admin/page.tsx
"use client"; // This page will be interactive

import { useState, useEffect } from "react";
import { Product } from "@/types";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/api";
import ProductForm from "@/components/admin/ProductForm";
import AdminProductList from "@/components/admin/AdminProductList";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch all products on component mount
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
      fetchProducts(); // Refresh the list
    }
  };

  const handleCreateNew = () => {
    setEditingProduct(null); // Clear any editing state
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (productData: Omit<Product, "_id">) => {
    if (editingProduct) {
      await updateProduct(editingProduct._id, productData);
    } else {
      await createProduct(productData);
    }
    fetchProducts(); // Refresh the list
    setIsFormVisible(false); // Hide the form
    setEditingProduct(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
        />
      ) : (
        <AdminProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
