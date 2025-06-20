import { useState, useEffect } from "react";
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
  // Generate customizations based on item name and category
  const getCustomizationsForItem = (itemName: string): Customization[] => {
    const itemLower = itemName.toLowerCase();

    // Pizza customizations
    if (itemLower.includes("pizza")) {
      if (itemLower.includes("classic cheese pizza")) {
        return [
          {
            id: "pepperoni",
            name: "Add Pepperoni",
            price: 1.5,
            selected: false,
          },
          {
            id: "extra-cheese",
            name: "Extra Cheese",
            price: 1.0,
            selected: false,
          },
          {
            id: "mushrooms",
            name: "Add Mushrooms",
            price: 1.0,
            selected: false,
          },
          {
            id: "bell-peppers",
            name: "Add Bell Peppers",
            price: 1.0,
            selected: false,
          },
        ];
      }
      return [
        {
          id: "extra-cheese",
          name: "Extra Cheese",
          price: 1.0,
          selected: false,
        },
        { id: "extra-sauce", name: "Extra Sauce", price: 0.5, selected: false },
        { id: "side-ranch", name: "Side Ranch", price: 0.75, selected: false },
        {
          id: "side-marinara",
          name: "Side Marinara",
          price: 0.75,
          selected: false,
        },
      ];
    }

    // Breakfast customizations
    if (itemLower.includes("avocado toast")) {
      return [
        { id: "bacon", name: "Add Bacon", price: 2.0, selected: false },
        {
          id: "poached-egg",
          name: "Add Poached Egg",
          price: 2.5,
          selected: false,
        },
        { id: "feta", name: "Add Feta Cheese", price: 1.5, selected: false },
        { id: "tomatoes", name: "Add Tomatoes", price: 1.0, selected: false },
      ];
    }

    if (itemLower.includes("bacon egg") || itemLower.includes("breakfast")) {
      return [
        { id: "extra-bacon", name: "Extra Bacon", price: 2.0, selected: false },
        {
          id: "extra-cheese",
          name: "Extra Cheese",
          price: 1.0,
          selected: false,
        },
        {
          id: "hash-browns",
          name: "Add Hash Browns",
          price: 2.5,
          selected: false,
        },
        { id: "hot-sauce", name: "Hot Sauce", price: 0.0, selected: false },
      ];
    }

    // Lunch customizations
    if (
      itemLower.includes("sandwich") ||
      itemLower.includes("turkey") ||
      itemLower.includes("caprese")
    ) {
      return [
        { id: "extra-meat", name: "Extra Meat", price: 3.0, selected: false },
        {
          id: "extra-cheese",
          name: "Extra Cheese",
          price: 1.0,
          selected: false,
        },
        { id: "avocado", name: "Add Avocado", price: 2.0, selected: false },
        { id: "pickles", name: "Add Pickles", price: 0.5, selected: false },
        { id: "mustard", name: "Mustard", price: 0.0, selected: false },
        { id: "mayo", name: "Mayo", price: 0.0, selected: false },
      ];
    }

    // Pastries customizations
    if (
      itemLower.includes("croissant") ||
      itemLower.includes("pastry") ||
      itemLower.includes("bun")
    ) {
      return [
        { id: "butter", name: "Extra Butter", price: 0.5, selected: false },
        { id: "jam", name: "Jam on Side", price: 0.75, selected: false },
        { id: "honey", name: "Honey", price: 0.5, selected: false },
        { id: "warm", name: "Warm it Up", price: 0.0, selected: false },
      ];
    }

    // Bread customizations
    if (
      itemLower.includes("bread") ||
      itemLower.includes("baguette") ||
      itemLower.includes("sourdough")
    ) {
      return [
        { id: "slice", name: "Pre-Sliced", price: 0.0, selected: false },
        {
          id: "butter-side",
          name: "Butter on Side",
          price: 1.0,
          selected: false,
        },
        { id: "warm", name: "Warm it Up", price: 0.0, selected: false },
      ];
    }

    // Coffee/beverage customizations
    if (
      itemLower.includes("coffee") ||
      itemLower.includes("latte") ||
      itemLower.includes("cappuccino") ||
      itemLower.includes("americano") ||
      itemLower.includes("mocha") ||
      itemLower.includes("macchiato") ||
      itemLower.includes("espresso")
    ) {
      return [
        { id: "extra-shot", name: "Extra Shot", price: 0.75, selected: false },
        { id: "decaf", name: "Make it Decaf", price: 0.0, selected: false },
        { id: "extra-hot", name: "Extra Hot", price: 0.0, selected: false },
        { id: "extra-foam", name: "Extra Foam", price: 0.0, selected: false },
        { id: "oat-milk", name: "Oat Milk", price: 0.65, selected: false },
        {
          id: "almond-milk",
          name: "Almond Milk",
          price: 0.65,
          selected: false,
        },
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
        {
          id: "hazelnut-syrup",
          name: "Hazelnut Syrup",
          price: 0.5,
          selected: false,
        },
      ];
    }

    // Tea customizations
    if (
      itemLower.includes("tea") ||
      itemLower.includes("chai") ||
      itemLower.includes("london fog")
    ) {
      return [
        { id: "honey", name: "Add Honey", price: 0.5, selected: false },
        { id: "lemon", name: "Add Lemon", price: 0.25, selected: false },
        { id: "oat-milk", name: "Oat Milk", price: 0.65, selected: false },
        {
          id: "almond-milk",
          name: "Almond Milk",
          price: 0.65,
          selected: false,
        },
        { id: "extra-hot", name: "Extra Hot", price: 0.0, selected: false },
        {
          id: "vanilla-syrup",
          name: "Vanilla Syrup",
          price: 0.5,
          selected: false,
        },
      ];
    }

    // Iced/Frozen customizations
    if (
      itemLower.includes("iced") ||
      itemLower.includes("cold") ||
      itemLower.includes("smoothie") ||
      itemLower.includes("frappe") ||
      itemLower.includes("lemonade")
    ) {
      return [
        { id: "extra-ice", name: "Extra Ice", price: 0.0, selected: false },
        { id: "less-ice", name: "Light Ice", price: 0.0, selected: false },
        { id: "extra-sweet", name: "Extra Sweet", price: 0.0, selected: false },
        {
          id: "sugar-free",
          name: "Sugar-Free Sweetener",
          price: 0.0,
          selected: false,
        },
      ];
    }

    // Sweets/desserts customizations
    if (
      itemLower.includes("éclair") ||
      itemLower.includes("tart") ||
      itemLower.includes("sweet") ||
      itemLower.includes("chocolate") ||
      itemLower.includes("fruit")
    ) {
      return [
        { id: "extra-cream", name: "Extra Cream", price: 1.0, selected: false },
        {
          id: "chocolate-drizzle",
          name: "Chocolate Drizzle",
          price: 0.75,
          selected: false,
        },
        {
          id: "fresh-berries",
          name: "Fresh Berries",
          price: 2.0,
          selected: false,
        },
        {
          id: "powdered-sugar",
          name: "Powdered Sugar",
          price: 0.0,
          selected: false,
        },
      ];
    }

    // Default fallback (shouldn't normally reach here)
    return [
      {
        id: "special-request",
        name: "Special Request (ask staff)",
        price: 0.0,
        selected: false,
      },
    ];
  };

  const [customizations, setCustomizations] = useState<Customization[]>(
    getCustomizationsForItem(itemName),
  );

  // Update customizations when item changes
  useEffect(() => {
    setCustomizations(getCustomizationsForItem(itemName));
  }, [itemName]);

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
      <DialogContent className="max-w-md mx-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
