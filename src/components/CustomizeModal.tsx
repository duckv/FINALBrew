import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  basePrice: number;
  onAddToCart: (customizations: Customization[], totalPrice: number) => void;
}

interface Customization {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

const CustomizeModal = ({
  isOpen,
  onClose,
  itemName,
  basePrice,
  onAddToCart,
}: CustomizeModalProps) => {
  // Generate customizations based on item name
  const getCustomizationsForItem = (itemName: string): Customization[] => {
    const itemLower = itemName.toLowerCase();

    if (itemLower.includes("classic cheese pizza")) {
      return [
        { id: "pepperoni", name: "Add Pepperoni", price: 1.5, selected: false },
      ];
    }

    if (itemLower.includes("avocado toast")) {
      return [{ id: "bacon", name: "Add Bacon", price: 2.0, selected: false }];
    }

    // Default customizations for other items
    return [
      { id: "extra-shot", name: "Extra Shot", price: 0.75, selected: false },
      { id: "decaf", name: "Make it Decaf", price: 0.0, selected: false },
      { id: "extra-hot", name: "Extra Hot", price: 0.0, selected: false },
      { id: "extra-foam", name: "Extra Foam", price: 0.0, selected: false },
      { id: "oat-milk", name: "Oat Milk", price: 0.65, selected: false },
      { id: "almond-milk", name: "Almond Milk", price: 0.65, selected: false },
      { id: "soy-milk", name: "Soy Milk", price: 0.65, selected: false },
      {
        id: "coconut-milk",
        name: "Coconut Milk",
        price: 0.65,
        selected: false,
      },
      {
        id: "vanilla-syrup",
        name: "Vanilla Syrup",
        price: 0.5,
        selected: false,
      },
      {
        id: "caramel-syrup",
        name: "Caramel Syrup",
        price: 0.5,
        selected: false,
      },
    ];
  };

  const [customizations, setCustomizations] = useState<Customization[]>(
    getCustomizationsForItem(itemName),
  );

  // Update customizations when item changes
  useState(() => {
    setCustomizations(getCustomizationsForItem(itemName));
  });

  const toggleCustomization = (id: string) => {
    setCustomizations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const calculateTotalPrice = () => {
    const addOnsTotal = customizations
      .filter((item) => item.selected)
      .reduce((sum, item) => sum + item.price, 0);
    return basePrice + addOnsTotal;
  };

  const handleAddToCart = () => {
    const selectedCustomizations = customizations.filter(
      (item) => item.selected,
    );
    onAddToCart(selectedCustomizations, calculateTotalPrice());
    onClose();

    // Reset customizations
    setCustomizations((prev) =>
      prev.map((item) => ({ ...item, selected: false })),
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Customize {itemName}
            <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Add-ons</h3>
            <p className="text-sm text-gray-600 mb-4">
              Customize your order with these options
            </p>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {customizations.map((customization) => (
              <div
                key={customization.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={customization.id}
                    checked={customization.selected}
                    onCheckedChange={() =>
                      toggleCustomization(customization.id)
                    }
                  />
                  <label
                    htmlFor={customization.id}
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    {customization.name}
                  </label>
                </div>
                <span className="text-sm font-medium text-brand-brown">
                  +${customization.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>${calculateTotalPrice().toFixed(2)}</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAddToCart}
            className="bg-brand-brown hover:bg-brand-brown-dark text-white"
          >
            Add to Cart - ${calculateTotalPrice().toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeModal;
