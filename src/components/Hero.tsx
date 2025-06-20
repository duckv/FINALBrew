import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" fill="%23f3f4f6"><rect width="1200" height="600" fill="%23d1d5db"/><rect x="200" y="100" width="800" height="400" fill="%239ca3af" rx="20"/><circle cx="300" cy="200" r="40" fill="%23f3f4f6"/><circle cx="500" cy="300" r="60" fill="%23f3f4f6"/><circle cx="900" cy="250" r="50" fill="%23f3f4f6"/><text x="600" y="320" text-anchor="middle" fill="%23374151" font-family="serif" font-size="24">Artisan Bakery</text></svg>')`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          Perfect Brews,
          <br />
          <span className="text-brand-pink">Fine Patisseries</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Experience the finest artisan breads, pastries, and coffee in the
          heart of the city
        </p>

        <Button
          size="lg"
          className="bg-white text-brand-brown hover:bg-gray-100 text-lg px-8 py-3 font-semibold"
        >
          Start Your Order
        </Button>
      </div>
    </section>
  );
};

export default Hero;
