import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Info } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: string;
  description?: string;
  image?: string;
  hasToastOptions?: boolean;
  hasSliceOptions?: boolean;
  category: string;
}

const ProductCard = ({
  title,
  price,
  description,
  image,
  hasToastOptions,
  hasSliceOptions,
  category,
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  // Generate a placeholder image based on category
  const getPlaceholderImage = () => {
    const imageMap: Record<string, string> = {
      pastries:
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150' fill='%23f3f4f6'><rect width='200' height='150' fill='%23e5e7eb'/><circle cx='100' cy='75' r='40' fill='%23d1d5db'/><text x='100' y='80' text-anchor='middle' fill='%23374151' font-size='12'>Pastry</text></svg>",
      breads:
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150' fill='%23f3f4f6'><rect width='200' height='150' fill='%23e5e7eb'/><ellipse cx='100' cy='75' rx='60' ry='30' fill='%23d1d5db'/><text x='100' y='80' text-anchor='middle' fill='%23374151' font-size='12'>Bread</text></svg>",
      coffee:
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150' fill='%23f3f4f6'><rect width='200' height='150' fill='%23e5e7eb'/><rect x='70' y='40' width='60' height='70' fill='%23d1d5db' rx='5'/><text x='100' y='80' text-anchor='middle' fill='%23374151' font-size='12'>Coffee</text></svg>",
    };
    return imageMap[category.toLowerCase()] || imageMap.pastries;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="h-48 bg-gray-100">
        <img
          src={image || getPlaceholderImage()}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-heading text-xl font-semibold text-gray-900">
            {title}
          </h3>
          <span className="font-semibold text-brand-brown text-lg">
            {price}
          </span>
        </div>

        {description && (
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        )}

        {/* Options */}
        {(hasToastOptions || hasSliceOptions) && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">
              {hasToastOptions
                ? "Toast Options Available"
                : "Slice Options Available"}
            </p>
          </div>
        )}

        {/* Quantity and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={decrementQuantity}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-medium text-lg w-8 text-center">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={incrementQuantity}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="text-brand-brown border-brand-brown hover:bg-brand-brown hover:text-white"
            >
              <Info className="h-4 w-4 mr-1" />
              Allergens
            </Button>
            <Button
              size="sm"
              className="bg-brand-brown hover:bg-brand-brown-dark text-white"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
