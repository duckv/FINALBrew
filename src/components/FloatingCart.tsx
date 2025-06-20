import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface FloatingCartProps {
  onClick: () => void;
}

const FloatingCart = ({ onClick }: FloatingCartProps) => {
  const { getTotalItems } = useCart();

  if (getTotalItems() === 0) return null;

  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-brand-pink hover:bg-pink-600 text-white shadow-lg z-40"
      size="lg"
    >
      <ShoppingCart className="h-6 w-6" />
      {getTotalItems() > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
          {getTotalItems()}
        </span>
      )}
    </Button>
  );
};

export default FloatingCart;
