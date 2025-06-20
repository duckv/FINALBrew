import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import CateringSection from "@/components/CateringSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCart from "@/components/FloatingCart";
import CartSidebar from "@/components/CartSidebar";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <MenuSection />
      <CateringSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
      <Footer />
      <FloatingCart onClick={() => setIsCartOpen(true)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Index;
