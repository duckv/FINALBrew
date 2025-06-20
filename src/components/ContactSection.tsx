import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Visit Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Come experience the warmth and aroma of our bakery in person
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Placeholder */}
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Map</p>
                <p className="text-sm">Click to get directions to our bakery</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-heading text-2xl font-bold text-gray-900 mb-8">
              Get in Touch
            </h3>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-brand-brown p-3 rounded-lg flex-shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">(555) 123-4567</p>
                  <p className="text-sm text-gray-500">
                    Call for orders or inquiries
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-brand-brown p-3 rounded-lg flex-shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">hello@breadnbrew.com</p>
                  <p className="text-sm text-gray-500">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-brand-brown p-3 rounded-lg flex-shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                  <p className="text-gray-600">
                    123 Artisan Street
                    <br />
                    Downtown District
                    <br />
                    City, State 12345
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="bg-brand-brown p-3 rounded-lg flex-shrink-0">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Hours</h4>
                  <div className="text-gray-600 space-y-1">
                    <p>Monday - Friday: 6:00 AM - 7:00 PM</p>
                    <p>Saturday: 7:00 AM - 8:00 PM</p>
                    <p>Sunday: 7:00 AM - 6:00 PM</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Extended hours during holidays
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">
                Additional Services
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Free Wi-Fi available</p>
                <p>• Outdoor seating when weather permits</p>
                <p>• Wheelchair accessible</p>
                <p>• Street parking and nearby garage</p>
                <p>• Group reservations welcome</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
