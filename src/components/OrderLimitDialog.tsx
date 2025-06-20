import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface OrderLimitDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderLimitDialog = ({ isOpen, onClose }: OrderLimitDialogProps) => {
  const handlePhoneClick = () => {
    window.location.href = "tel:(908)933-0123";
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}} modal>
      <DialogContent
        className="max-w-md mx-auto"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-red-700">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            Order Limit Exceeded
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-700 leading-relaxed">
            Our max online order amount is <strong>$150</strong> before taxes &
            tips.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            Please call us at{" "}
            <button
              onClick={handlePhoneClick}
              className="text-brand-pink hover:text-pink-700 font-semibold underline focus:outline-none focus:ring-2 focus:ring-brand-pink focus:ring-offset-2 rounded"
            >
              (908) 933-0123
            </button>{" "}
            to place a larger order.
          </p>
        </div>

        <DialogFooter>
          <Button
            onClick={onClose}
            className="w-full bg-brand-pink hover:bg-pink-600 text-white"
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderLimitDialog;
