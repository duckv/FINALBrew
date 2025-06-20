/**
 * POS-Optimized Order Form Component
 *
 * Collects customer information in a format optimized for SkyTab POS integration
 * Handles order type selection, customer details, and special instructions
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { POSCustomer, POSAddress } from "@/types/pos";
import {
  calculateOrderTotals,
  validateOrderForPOS,
  formatCurrency,
  POS_CONFIG,
} from "@/utils/posIntegration";
import { useCart } from "@/contexts/CartContext";

/**
 * Props for POSOrderForm component
 */
interface POSOrderFormProps {
  /** Callback when order is submitted */
  onSubmit: (
    customer: POSCustomer,
    orderType: OrderType,
    specialInstructions?: string,
  ) => void;
  /** Whether form is currently submitting */
  isSubmitting?: boolean;
  /** Current order type */
  orderType: OrderType;
  /** Callback when order type changes */
  onOrderTypeChange: (type: OrderType) => void;
}

type OrderType = "dine-in" | "takeout" | "delivery" | "pickup";

/**
 * POS-Optimized Order Form Component
 */
export const POSOrderForm: React.FC<POSOrderFormProps> = ({
  onSubmit,
  isSubmitting = false,
  orderType,
  onOrderTypeChange,
}) => {
  // ========== State Management ==========
  const { cart } = useCart();
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    email: "",
    loyaltyMember: false,
  });

  const [address, setAddress] = useState<Partial<POSAddress>>({
    street: "",
    city: "Berkeley Heights",
    state: "NJ",
    zipCode: "",
    instructions: "",
  });

  const [specialInstructions, setSpecialInstructions] = useState("");
  const [requestedTime, setRequestedTime] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // ========== Calculations ==========
  const totals = calculateOrderTotals(cart, orderType);
  const isDelivery = orderType === "delivery";
  const meetsDeliveryMinimum = totals.subtotal >= POS_CONFIG.MIN_DELIVERY_ORDER;

  // ========== Event Handlers ==========

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const customer: POSCustomer = {
      name: customerData.name,
      phone: customerData.phone,
      email: customerData.email || undefined,
      loyaltyMember: customerData.loyaltyMember,
      loyaltyPoints: customerData.loyaltyMember ? 0 : undefined,
      address:
        isDelivery && address.street ? (address as POSAddress) : undefined,
    };

    onSubmit(customer, orderType, specialInstructions || undefined);
  };

  /**
   * Update customer data
   */
  const updateCustomerData = (field: string, value: string | boolean) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Update address data
   */
  const updateAddress = (field: string, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Generate time slots for pickup/delivery
   */
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Start from next 15-minute interval
    let startMinute = Math.ceil(currentMinute / 15) * 15;
    let startHour = currentHour;
    if (startMinute >= 60) {
      startMinute = 0;
      startHour += 1;
    }

    // Add buffer time based on order type
    const bufferMinutes = orderType === "delivery" ? 45 : 15;
    const bufferTime = new Date(now.getTime() + bufferMinutes * 60000);

    for (let i = 0; i < 24; i++) {
      const time = new Date();
      time.setHours(startHour, startMinute + i * 15, 0, 0);

      if (time < bufferTime) continue;
      if (time.getHours() < 7 || time.getHours() > 21) continue; // Business hours

      slots.push({
        value: time.toISOString(),
        label: time.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      });

      if (slots.length >= 12) break; // Limit to 12 slots
    }

    return slots;
  };

  // ========== Form Validation ==========
  const isFormValid = () => {
    if (!customerData.name.trim() || !customerData.phone.trim()) return false;
    if (isDelivery) {
      if (!address.street?.trim() || !address.zipCode?.trim()) return false;
      if (!meetsDeliveryMinimum) return false;
    }
    return agreeToTerms;
  };

  const timeSlots = generateTimeSlots();

  // ========== Render ==========
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Order Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Order Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={orderType}
            onValueChange={(value) => onOrderTypeChange(value as OrderType)}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dine-in" id="dine-in" />
              <Label htmlFor="dine-in">Dine In</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="takeout" id="takeout" />
              <Label htmlFor="takeout">Takeout</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pickup" id="pickup" />
              <Label htmlFor="pickup">Pickup</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="delivery" id="delivery" />
              <Label htmlFor="delivery">Delivery</Label>
            </div>
          </RadioGroup>

          {isDelivery && !meetsDeliveryMinimum && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-700">
                Minimum delivery order is{" "}
                {formatCurrency(POS_CONFIG.MIN_DELIVERY_ORDER)}. Current order:{" "}
                {formatCurrency(totals.subtotal)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customerData.name}
                  onChange={(e) => updateCustomerData("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) =>
                      updateCustomerData("phone", e.target.value)
                    }
                    placeholder="(555) 123-4567"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address (Optional)</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => updateCustomerData("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="loyalty"
                checked={customerData.loyaltyMember}
                onCheckedChange={(checked) =>
                  updateCustomerData("loyaltyMember", !!checked)
                }
              />
              <Label htmlFor="loyalty" className="text-sm">
                I'm a loyalty program member
              </Label>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Delivery Address (if delivery selected) */}
      {isDelivery && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                value={address.street || ""}
                onChange={(e) => updateAddress("street", e.target.value)}
                placeholder="123 Main Street"
                required={isDelivery}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={address.city || ""}
                  onChange={(e) => updateAddress("city", e.target.value)}
                  placeholder="Berkeley Heights"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Select
                  value={address.state || "NJ"}
                  onValueChange={(value) => updateAddress("state", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NJ">NJ</SelectItem>
                    <SelectItem value="NY">NY</SelectItem>
                    <SelectItem value="PA">PA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={address.zipCode || ""}
                  onChange={(e) => updateAddress("zipCode", e.target.value)}
                  placeholder="07922"
                  required={isDelivery}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="deliveryInstructions">
                Delivery Instructions
              </Label>
              <Input
                id="deliveryInstructions"
                value={address.instructions || ""}
                onChange={(e) => updateAddress("instructions", e.target.value)}
                placeholder="Apartment number, gate code, etc."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Timing */}
      {(orderType === "pickup" || orderType === "delivery") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Order Timing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="requestedTime">
                Requested {orderType === "pickup" ? "Pickup" : "Delivery"} Time
              </Label>
              <Select value={requestedTime} onValueChange={setRequestedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="As soon as possible" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">As soon as possible</SelectItem>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Special Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Special Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Any special requests or dietary notes..."
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatCurrency(totals.subtotal)}</span>
          </div>
          {totals.serviceFee > 0 && (
            <div className="flex justify-between">
              <span>Service Fee:</span>
              <span>{formatCurrency(totals.serviceFee)}</span>
            </div>
          )}
          {totals.deliveryFee > 0 && (
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span>{formatCurrency(totals.deliveryFee)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>{formatCurrency(totals.tax)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Submit */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-brand-brown underline">
                terms and conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-brand-brown underline">
                privacy policy
              </a>
            </Label>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className="w-full bg-brand-brown hover:bg-brand-brown-dark text-white text-lg py-3"
            size="lg"
          >
            {isSubmitting ? "Processing Order..." : "Proceed to Payment"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default POSOrderForm;
