// frontend/src/components/admin/ProductForm.tsx
import { useState, useEffect } from "react";
import { Product } from "@/types";

type ProductFormData = Omit<Product, "_id">;

interface ProductFormProps {
  product: Product | null;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
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
      // Reset form for 'Create New'
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
    // Assuming sizes are entered as a comma-separated string
    const sizes = e.target.value.split(",").map((s) => s.trim());
    setFormData((prev) => ({ ...prev, sizes }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price), // Ensure price is a number
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-light-card dark:bg-dark-card rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold">
        {product ? "Edit Product" : "Create New Product"}
      </h2>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md bg-light-background dark:bg-dark-background"
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md bg-light-background dark:bg-dark-background"
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md bg-light-background dark:bg-dark-background"
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md bg-light-background dark:bg-dark-background"
        />
      </div>
      <div>
        <label>Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md bg-light-background dark:bg-dark-background"
        />
      </div>
      <div>
        <label>Sizes (comma-separated)</label>
        <input
          type="text"
          name="sizes"
          value={formData.sizes.join(", ")}
          onChange={handleSizeChange}
          required
          className="w-full p-2 border rounded-md bg-light-background dark:bg-dark-background"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-light-primary text-white rounded-lg hover:bg-light-primary-hover"
        >
          {product ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
