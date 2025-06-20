import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  Smartphone,
  Car,
  Truck,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface CheckoutScreenProps {
  onBack: () => void;
}

const CheckoutScreen = ({ onBack }: CheckoutScreenProps) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderType, setOrderType] = useState<
    "pickup" | "ubereats" | "doordash" | "grubhub"
  >("pickup");
  const [contactMethod, setContactMethod] = useState<"email" | "phone">(
    "email",
  );
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "digital">(
    "card",
  );
  const [pickupDate, setPickupDate] = useState<string>("today");
  const [pickupTime, setPickupTime] = useState<string>("now");

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.0875; // NJ sales tax (8.75%)
  const deliveryFee = 0; // No delivery fee - handled by third-party services
  const tipAmount =
    tipPercentage === 0
      ? parseFloat(customTip || "0")
      : (subtotal * tipPercentage) / 100;
  const total = subtotal + tax + deliveryFee + tipAmount;

  // Generate 15-minute interval times
  const generateTimeSlots = (date: Date) => {
    const slots = [];
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      slots.push({ value: "now", label: "Now" });
    }

    let startTime = new Date(date);
    if (isToday) {
      // Start from next 15-minute interval
      const minutes = Math.ceil((now.getMinutes() + 30) / 15) * 15; // 30 min minimum prep time
      startTime.setHours(now.getHours(), minutes, 0, 0);
      if (minutes >= 60) {
        startTime.setHours(startTime.getHours() + 1, minutes - 60, 0, 0);
      }
    } else {
      // Tomorrow starts at 6 AM
      startTime.setHours(6, 0, 0, 0);
    }

    const endTime = new Date(date);
    endTime.setHours(21, 0, 0, 0); // Store closes at 9 PM

    while (startTime <= endTime) {
      const timeString = startTime.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      slots.push({
        value: startTime.toISOString(),
        label: timeString,
      });
      startTime.setMinutes(startTime.getMinutes() + 15);
    }

    return slots;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate order processing
    setTimeout(() => {
      toast.success(
        "Order placed successfully! You'll receive a confirmation email shortly.",
      );
      clearCart();
      setLoading(false);
      onBack();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4 p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">
              Order Details
            </h2>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Order Type */}
              <div>
                <Label className="text-sm font-medium">Order Type</Label>
                <RadioGroup
                  value={orderType}
                  onValueChange={setOrderType}
                  className="mt-2 space-y-3"
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Car className="h-5 w-5 text-gray-600" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      Pickup (Free)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="ubereats" id="ubereats" />
                    <Truck className="h-5 w-5 text-black" />
                    <Label htmlFor="ubereats" className="flex-1 cursor-pointer">
                      UberEats Delivery
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="doordash" id="doordash" />
                    <Truck className="h-5 w-5 text-red-600" />
                    <Label htmlFor="doordash" className="flex-1 cursor-pointer">
                      DoorDash Delivery
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="grubhub" id="grubhub" />
                    <Truck className="h-5 w-5 text-orange-600" />
                    <Label htmlFor="grubhub" className="flex-1 cursor-pointer">
                      GrubHub Delivery
                    </Label>
                  </div>
                </RadioGroup>

                {orderType !== "pickup" && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mt-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Delivery rates may vary and will be
                      handled by the selected delivery service.
                    </p>
                  </div>
                )}
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Customer Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Contact Method Selection */}
                <div>
                  <Label className="text-sm font-medium">
                    Preferred Contact Method
                  </Label>
                  <RadioGroup
                    value={contactMethod}
                    onValueChange={setContactMethod}
                    className="mt-2 space-y-3"
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="email" id="email-contact" />
                      <Mail className="h-5 w-5 text-gray-600" />
                      <Label
                        htmlFor="email-contact"
                        className="flex-1 cursor-pointer"
                      >
                        Email (Recommended)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="phone" id="phone-contact" />
                      <Phone className="h-5 w-5 text-gray-600" />
                      <Label
                        htmlFor="phone-contact"
                        className="flex-1 cursor-pointer"
                      >
                        Phone/SMS
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {contactMethod === "email" && (
                  <div>
                    <Label htmlFor="email">
                      Email Address (Optional) - preferred contact method is
                      phone/SMS
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="mt-1"
                    />
                  </div>
                )}

                {contactMethod === "phone" && (
                  <div>
                    <Label htmlFor="phone">
                      Phone Number (Optional) - preferred contact method is
                      phone/SMS
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(908) 555-0123"
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              {/* Delivery Address (if delivery selected) */}
              {orderType !== "pickup" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Delivery Address
                  </h3>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> You'll be redirected to{" "}
                      {orderType === "ubereats"
                        ? "UberEats"
                        : orderType === "doordash"
                          ? "DoorDash"
                          : "GrubHub"}{" "}
                      to complete delivery and payment.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Berkeley Heights"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="07922"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="deliveryInstructions">
                      Delivery Instructions (Optional)
                    </Label>
                    <Textarea
                      id="deliveryInstructions"
                      placeholder="Apartment number, gate code, etc."
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {/* Pickup Time Selection */}
              {orderType === "pickup" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Pickup Time</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickupDate">Date</Label>
                      <Select
                        value={pickupDate}
                        onValueChange={setPickupDate}
                        required
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="pickupTime">Time</Label>
                      <Select
                        value={pickupTime}
                        onValueChange={setPickupTime}
                        required
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {generateTimeSlots(new Date()).map((slot) => (
                            <SelectItem key={slot.value} value={slot.value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <Label htmlFor="specialInstructions">
                  Special Instructions (Optional)
                </Label>
                <Textarea
                  id="specialInstructions"
                  placeholder="Allergies, special requests, etc."
                  className="mt-1"
                />
              </div>

              {/* Tipping */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Add a Tip (Optional)
                </h3>

                <div className="grid grid-cols-4 gap-2">
                  {[15, 18, 20, 25].map((percentage) => (
                    <Button
                      key={percentage}
                      type="button"
                      variant={
                        tipPercentage === percentage ? "default" : "outline"
                      }
                      className={`${
                        tipPercentage === percentage
                          ? "bg-brand-pink hover:bg-pink-600 text-white"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        setTipPercentage(percentage);
                        setCustomTip("");
                      }}
                    >
                      {percentage}%
                    </Button>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant={tipPercentage === 0 ? "default" : "outline"}
                    className={`${
                      tipPercentage === 0
                        ? "bg-brand-pink hover:bg-pink-600 text-white"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setTipPercentage(0)}
                  >
                    Custom
                  </Button>
                  {tipPercentage === 0 && (
                    <div className="flex items-center">
                      <span className="mr-1">$</span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        value={customTip}
                        onChange={(e) => setCustomTip(e.target.value)}
                        className="w-20"
                      />
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-600">
                  Tip: ${tipAmount.toFixed(2)}
                  {tipPercentage > 0 && ` (${tipPercentage}%)`}
                </p>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Method
                </h3>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="card" id="card-payment" />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <Label
                      htmlFor="card-payment"
                      className="flex-1 cursor-pointer"
                    >
                      Debit/Credit Card
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="digital" id="digital-payment" />
                    <Smartphone className="h-5 w-5 text-gray-600" />
                    <Label
                      htmlFor="digital-payment"
                      className="flex-1 cursor-pointer"
                    >
                      Apple Pay / Google Pay
                    </Label>
                  </div>
                </RadioGroup>

                {orderType === "pickup" && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Payment will be processed when you arrive for pickup.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-pink hover:bg-pink-600 text-white py-3 text-lg"
              >
                {loading
                  ? "Processing..."
                  : `Place Order - $${total.toFixed(2)}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">${subtotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Tax (8.75%)</p>
                <p className="font-medium">${tax.toFixed(2)}</p>
              </div>

              {tipAmount > 0 && (
                <div className="flex justify-between">
                  <p className="text-gray-600">
                    Tip {tipPercentage > 0 ? `(${tipPercentage}%)` : "(Custom)"}
                  </p>
                  <p className="font-medium">${tipAmount.toFixed(2)}</p>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>

            {/* Store Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Store Information
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>512 Springfield Ave</p>
                <p>Berkeley Heights, NJ 07922</p>
                <p>(908) 933-0123</p>
                <p>breadnbrew512@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
