import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";

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

            <div className="bg-brand-pink/10 border border-brand-pink/20 p-6 rounded-lg">
              <h4 className="font-semibold text-brand-brown mb-3">
                Order Information
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-brand-pink rounded-full mr-3"></span>
                  <strong>Minimum Order:</strong> $50
                </p>
                <p className="text-sm text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-brand-pink rounded-full mr-3"></span>
                  <strong>Advance Notice:</strong> Please order at least 48
                  hours in advance
                </p>
                <p className="text-sm text-gray-700 flex items-center">
                  <span className="w-2 h-2 bg-brand-pink rounded-full mr-3"></span>
                  <strong>Contact:</strong> Call us at{" "}
                  <a
                    href="tel:908-933-0123"
                    className="text-brand-pink hover:text-pink-700 font-semibold underline ml-1"
                  >
                    (908) 933-0123
                  </a>
                </p>
              </div>
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

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">
                  We'll get back to you within 24 hours with a detailed quote.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-brand-brown" />
                    <a
                      href="tel:908-933-0123"
                      className="text-brand-pink hover:text-pink-700 font-semibold"
                    >
                      (908) 933-0123
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-brand-brown" />
                    <a
                      href="mailto:breadnbrew512@gmail.com"
                      className="text-brand-pink hover:text-pink-700 font-semibold"
                    >
                      breadnbrew512@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-brand-brown" />
                    <a
                      href="https://maps.google.com/?q=512+Springfield+Ave,+Berkeley+Heights,+NJ+07922"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-pink hover:text-pink-700 font-semibold"
                    >
                      512 Springfield Ave, Berkeley Heights, NJ 07922
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateringSection;
