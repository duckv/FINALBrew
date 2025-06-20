import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CateringSection = () => {
  return (
    <section id="catering" className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Catering Info */}
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Catering Services
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Let us bring the bakery to you! Our catering services are perfect
              for office meetings, special events, and celebrations. We offer a
              wide variety of fresh pastries, artisan breads, and premium
              coffee.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-pink rounded-full mt-3 flex-shrink-0" />
                <p className="text-gray-700">
                  <strong>Fresh Daily:</strong> All items baked fresh the
                  morning of your event
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-pink rounded-full mt-3 flex-shrink-0" />
                <p className="text-gray-700">
                  <strong>Custom Orders:</strong> Special dietary requirements
                  and custom arrangements available
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-pink rounded-full mt-3 flex-shrink-0" />
                <p className="text-gray-700">
                  <strong>Full Service:</strong> Delivery, setup, and serving
                  equipment included
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Minimum Order:</strong> $50
              </p>
              <p className="text-sm text-gray-600">
                <strong>Advance Notice:</strong> Please order at least 48 hours
                in advance
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">
              Request a Quote
            </h3>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventDate" className="text-sm font-medium">
                    Event Date
                  </Label>
                  <Input id="eventDate" type="date" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="guestCount" className="text-sm font-medium">
                    Number of Guests
                  </Label>
                  <Input
                    id="guestCount"
                    type="number"
                    placeholder="e.g., 25"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="details" className="text-sm font-medium">
                  Event Details & Special Requests
                </Label>
                <Textarea
                  id="details"
                  placeholder="Tell us about your event, dietary restrictions, preferred items, etc."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-brown hover:bg-brand-brown-dark text-white py-3"
              >
                Submit Request
              </Button>

              <p className="text-xs text-gray-500 text-center">
                We'll get back to you within 24 hours with a detailed quote.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateringSection;
