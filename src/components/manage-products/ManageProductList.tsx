// frontend/src/components/manage-products/ManageProductList.tsx
import { Product } from "@/types";
import Image from "next/image";

// Renamed for consistency
interface ManageProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

// Renamed for consistency
const ManageProductList = ({
  products,
  onEdit,
  onDelete,
}: ManageProductListProps) => {
  return (
    <div className="bg-light-card dark:bg-dark-card rounded-lg shadow">
      <ul className="divide-y divide-light-secondary dark:divide-dark-secondary">
        {products.map((product) => (
          <li
            key={product._id}
            className="p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={64}
                height={64}
                className="rounded-md object-cover"
              />
              <div>
                <p className="font-bold">{product.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{product.price.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => onEdit(product)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Renamed for consistency
export default ManageProductList;
