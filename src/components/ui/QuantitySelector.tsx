// frontend/components/ui/QuantitySelector.tsx

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrease}
        className="p-1 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={quantity <= 1}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <button
        onClick={onIncrease}
        className="p-1 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;
