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
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-brand-pink hover:bg-pink-600 text-white shadow-xl z-40 transform hover:scale-105 transition-transform"
      size="lg"
    >
      <ShoppingCart className="h-7 w-7" />
      {getTotalItems() > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full h-7 w-7 flex items-center justify-center font-bold border-2 border-white">
          {getTotalItems()}
        </span>
      )}
    </Button>
  );
};

export default FloatingCart;
