import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Info, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import CustomizeModal from "./CustomizeModal";
import AllergenModal from "./AllergenModal";

interface ProductCardProps {
  title: string;
  price: string;
  description?: string;
  image?: string;
  hasToastOptions?: boolean;
  hasSliceOptions?: boolean;
  hasCustomizations?: boolean;
  category: string;
}

const ProductCard = ({
  title,
  price,
  description,
  image,
  hasToastOptions,
  hasSliceOptions,
  hasCustomizations,
  category,
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [showAllergenModal, setShowAllergenModal] = useState(false);
  const { addItem } = useCart();

  // Auto-detect allergens based on item name and category
  const detectAllergens = () => {
    const allergens: string[] = [];
    const itemText = `${title} ${description || ""} ${category}`.toLowerCase();

    // Common allergen detection patterns
    if (
      itemText.includes("wheat") ||
      itemText.includes("bread") ||
      itemText.includes("croissant") ||
      itemText.includes("pastry")
    ) {
      allergens.push("wheat");
    }
    if (
      itemText.includes("milk") ||
      itemText.includes("cream") ||
      itemText.includes("butter") ||
      itemText.includes("cheese")
    ) {
      allergens.push("milk");
    }
    if (
      itemText.includes("egg") ||
      itemText.includes("custard") ||
      itemText.includes("mayonnaise")
    ) {
      allergens.push("eggs");
    }
    if (
      itemText.includes("almond") ||
      itemText.includes("walnut") ||
      itemText.includes("pecan") ||
      itemText.includes("hazelnut")
    ) {
      allergens.push("tree nuts");
    }
    if (itemText.includes("peanut")) {
      allergens.push("peanuts");
    }
    if (itemText.includes("sesame")) {
      allergens.push("sesame");
    }
    if (itemText.includes("soy")) {
      allergens.push("soy");
    }

    return allergens;
  };

  const allergens = detectAllergens();
  const hasAllergens = allergens.length > 0;

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 25));
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    // Parse price string to number (remove $ and convert)
    const numericPrice = parseFloat(price.replace("$", ""));

    const success = addItem({
      name: title,
      price: numericPrice,
      quantity: quantity,
      image: image || getPlaceholderImage(),
      category: category,
    });

    if (success) {
      // Show success toast
      toast.success(
        `Added ${quantity} ${title}${quantity > 1 ? "s" : ""} to cart`,
      );

      // Reset quantity to 1 after adding to cart
      setQuantity(1);
    }
    // If not successful, the order limit dialog will be shown automatically
  };

  const handleCustomizeAddToCart = (
    customizations: any[],
    totalPrice: number,
  ) => {
    const customizationNames = customizations.map((c) => c.name).join(", ");
    const itemName =
      customizations.length > 0 ? `${title} (${customizationNames})` : title;

    const success = addItem({
      name: itemName,
      price: totalPrice,
      quantity: quantity,
      image: image || getPlaceholderImage(),
      category: category,
    });

    if (success) {
      // Show success toast
      toast.success(
        `Added ${quantity} ${itemName}${quantity > 1 ? "s" : ""} to cart`,
      );

      // Reset quantity to 1 after adding to cart
      setQuantity(1);
    }
    // If not successful, the order limit dialog will be shown automatically
  };

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
        {hasToastOptions && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">
              Toast Options Available
            </p>
          </div>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center justify-center space-x-3 mb-4">
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

        {/* Add to Cart Button */}
        <div className="mb-4">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-brand-brown hover:bg-brand-brown-dark text-white"
            size="sm"
          >
            Add to Cart
          </Button>
        </div>

        {/* Customize and Allergens Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-brand-brown border-brand-brown hover:bg-brand-brown hover:text-white w-full"
            onClick={() => setShowCustomizeModal(true)}
          >
            Customize
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`border-brand-brown hover:bg-brand-brown hover:text-white w-full ${
              hasAllergens ? "text-orange-600" : "text-brand-brown"
            }`}
            onClick={() => setShowAllergenModal(true)}
          >
            <Info className="h-4 w-4 mr-1" />
            Allergens
          </Button>
        </div>

        {/* Modals */}
        <CustomizeModal
          isOpen={showCustomizeModal}
          onClose={() => setShowCustomizeModal(false)}
          itemName={title}
          basePrice={parseFloat(price.replace("$", ""))}
          onAddToCart={handleCustomizeAddToCart}
        />

        <AllergenModal
          isOpen={showAllergenModal}
          onClose={() => setShowAllergenModal(false)}
          itemName={title}
          allergens={allergens}
        />
      </div>
    </div>
  );
};

export default ProductCard;
