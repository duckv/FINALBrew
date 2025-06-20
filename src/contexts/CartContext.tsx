import * as React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category: string;
}

const MAX_CART_TOTAL = 150; // Maximum cart total before tax and tip
const MAX_ITEM_QUANTITY = 25; // Maximum quantity per item

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Initialize with empty cart to avoid any existing problematic state
    return [];
  });

  // Ensure cart is clean on app load
  useEffect(() => {
    const currentTotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    if (currentTotal > MAX_CART_TOTAL) {
      setItems([]);
    }
  }, []);

  const addItem = (newItem: Omit<CartItem, "id">) => {
    // Pre-calculate what the new cart would look like
    const currentItems = items;
    const existingItem = currentItems.find(
      (item) =>
        item.name === newItem.name && item.category === newItem.category,
    );

    let potentialItems: CartItem[];

    if (existingItem) {
      const newQuantity = Math.min(
        existingItem.quantity + newItem.quantity,
        MAX_ITEM_QUANTITY,
      );
      potentialItems = currentItems.map((item) =>
        item.id === existingItem.id ? { ...item, quantity: newQuantity } : item,
      );
    } else {
      // Add new item with generated ID
      const id =
        Date.now().toString() + Math.random().toString(36).substr(2, 9);
      potentialItems = [
        ...currentItems,
        {
          ...newItem,
          id,
          quantity: Math.min(newItem.quantity, MAX_ITEM_QUANTITY),
        },
      ];
    }

    // Check cart total limit before updating state
    const newTotal = potentialItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    if (newTotal > MAX_CART_TOTAL) {
      throw new Error(
        "Order Limit Exceeded\n\nOur max online order amount is $150 before taxes & tips. Please call us at (908) 933-0123 to place a larger order.",
      );
    }

    // Only update state if validation passes
    setItems(potentialItems);
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      const clampedQuantity = Math.min(quantity, MAX_ITEM_QUANTITY);

      // Pre-calculate what the new cart would look like
      const potentialItems = items.map((item) =>
        item.id === id ? { ...item, quantity: clampedQuantity } : item,
      );

      // Check cart total limit before updating state
      const newTotal = potentialItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
      if (newTotal > MAX_CART_TOTAL) {
        throw new Error(
          "Order Limit Exceeded\n\nOur max online order amount is $150 before taxes & tips. Please call us at (908) 933-0123 to place a larger order.",
        );
      }

      // Only update state if validation passes
      setItems(potentialItems);
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
