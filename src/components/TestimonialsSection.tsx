import GoogleReviews from "./GoogleReviews";

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real reviews from Google - updated automatically
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <GoogleReviews />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Have you tried our baked goods? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.google.com/search?q=Bread+N%27+Brew+Berkeley+Heights+NJ"
              target="_blank"
              rel="noopener noreferrer"
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
