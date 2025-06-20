import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Local Food Blogger",
      rating: 5,
      text: "Bread N' Brew has completely transformed my morning routine. Their croissants are absolutely divine, and the coffee is consistently excellent. It's become my favorite spot for both work meetings and casual catch-ups.",
    },
    {
      name: "David Chen",
      role: "Business Owner",
      rating: 5,
      text: "We've been using Bread N' Brew for our office catering for over a year now. The quality is outstanding, delivery is always on time, and their pastries never fail to impress our clients. Highly recommended!",
    },
    {
      name: "Emily Rodriguez",
      role: "Regular Customer",
      rating: 5,
      text: "The attention to detail in every single item they create is remarkable. From the flaky layers in their croissants to the perfect crumb structure in their sourdough, you can taste the craftsmanship in every bite.",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from the people who make our
            bakery a special place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Customer Info */}
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Have you tried our baked goods? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="text-brand-brown hover:text-brand-brown-dark font-medium underline"
            >
              Leave a Review on Google
            </a>
            <a
              href="#"
              className="text-brand-brown hover:text-brand-brown-dark font-medium underline"
            >
              Share on Social Media
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
