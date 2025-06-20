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
          {/* Interactive Map */}
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.5686749932154!2d-74.41748968459507!3d40.682749979330056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3a1a5c3b5b5b5%3A0x5b5b5b5b5b5b5b5b!2s512%20Springfield%20Ave%2C%20Berkeley%20Heights%2C%20NJ%2007922!5e0!3m2!1sen!2sus!4v1703784800000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bread N' Brew Location"
            />
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
                  <a
                    href="tel:(908)933-0123"
                    className="text-brand-pink hover:text-pink-700 font-medium underline"
                  >
                    (908) 933-0123
                  </a>
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
                  <a
                    href="mailto:breadnbrew512@gmail.com"
                    className="text-brand-pink hover:text-pink-700 font-medium underline"
                  >
                    breadnbrew512@gmail.com
                  </a>
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
                  <a
                    href="https://maps.google.com/?q=512+Springfield+Ave,+Berkeley+Heights,+NJ+07922"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-pink hover:text-pink-700 font-medium underline"
                  >
                    512 Springfield Ave
                    <br />
                    Berkeley Heights, NJ 07922
                  </a>
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
