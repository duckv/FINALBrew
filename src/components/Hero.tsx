import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/images/backgrounds/general/headerbackground.jpg')`,
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
          Freshly baked pastries and specialty coffee in the heart of Berkeley
          Heights.
        </p>

        <Button
          size="lg"
          className="bg-white text-brand-brown hover:bg-gray-100 text-lg px-8 py-3 font-semibold rounded-full"
        >
          Start Your Order
        </Button>
      </div>
    </section>
  );
};

export default Hero;
