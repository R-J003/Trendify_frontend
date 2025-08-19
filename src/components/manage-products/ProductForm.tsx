// frontend/src/components/manage-products/ProductForm.tsx
import { useState, useEffect } from "react";
import { Product } from "@/types";

type ProductFormData = Omit<Product, "_id">;

interface ProductFormProps {
  product: Product | null;
  isSubmitting: boolean; // New prop to handle loading state
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

const ProductForm = ({
  product,
  isSubmitting,
  onSubmit,
  onCancel,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    description: "",
    category: "",
    imageUrl: "",
    sizes: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        imageUrl: product.imageUrl,
        sizes: product.sizes,
      });
    } else {
      setFormData({
        name: "",
        price: 0,
        description: "",
        category: "",
        imageUrl: "",
        sizes: [],
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sizes = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean); // filter(Boolean) removes empty strings
    setFormData((prev) => ({ ...prev, sizes }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
    });
  };

  // Consistent styling for form inputs
  const inputStyles =
    "w-full p-2 border border-light-secondary dark:border-dark-secondary rounded-md bg-light-background dark:bg-dark-background focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary outline-none transition-shadow";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-light-card dark:bg-dark-card rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold">
        {product ? "Edit Product" : "Create New Product"}
      </h2>

      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputStyles}
        />
      </div>

      <div>
        <label htmlFor="price" className="block mb-1 font-medium">
          Price (₹)
        </label>
        <input
          id="price"
          type="number"
          name="price"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
          className={inputStyles}
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className={inputStyles}
        />
      </div>

      <div>
        <label htmlFor="category" className="block mb-1 font-medium">
          Category
        </label>
        <input
          id="category"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className={inputStyles}
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block mb-1 font-medium">
          Image URL
        </label>
        <input
          id="imageUrl"
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className={inputStyles}
        />
      </div>

      <div>
        <label htmlFor="sizes" className="block mb-1 font-medium">
          Sizes (comma-separated)
        </label>
        <input
          id="sizes"
          type="text"
          name="sizes"
          value={formData.sizes.join(", ")}
          onChange={handleSizeChange}
          required
          className={inputStyles}
        />
      </div>

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-light-primary text-white font-semibold rounded-lg hover:bg-light-primary-hover transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : product ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2 bg-light-secondary text-light-text font-semibold rounded-lg hover:bg-gray-300 dark:bg-dark-secondary dark:text-dark-text dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
