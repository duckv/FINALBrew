import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, AlertTriangle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const OrderThresholdAlert = () => {
  const { getTotalPrice } = useCart();
  const subtotal = getTotalPrice();

  // Show alert when cart is above $130 (close to $150 limit)
  if (subtotal <= 130) return null;

  const handlePhoneClick = () => {
    window.open("tel:908-933-0123", "_self");
  };

  return (
    <Alert className="mb-4 border-amber-200 bg-amber-50">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800">
        <div className="flex flex-col gap-2">
          <p className="font-medium">
            Your order is approaching our $150 online limit (currently $
            {subtotal.toFixed(2)})
          </p>
          <p className="text-sm">
            For orders over $150 before tax and tip, please call us at{" "}
            <button
              onClick={handlePhoneClick}
              className="text-brand-pink hover:text-pink-700 font-semibold underline focus:outline-none focus:ring-2 focus:ring-brand-pink focus:ring-offset-2 rounded"
            >
              (908) 933-0123
            </button>
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default OrderThresholdAlert;
