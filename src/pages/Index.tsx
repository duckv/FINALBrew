import { useState, useEffect } from "react";
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
import CheckoutScreen from "@/components/CheckoutScreen";
import OrderLimitDialog from "@/components/OrderLimitDialog";
import { useCart } from "@/contexts/CartContext";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderLimitDialog, setShowOrderLimitDialog] = useState(false);
  const { setOrderLimitCallback } = useCart();

  // Set up the order limit callback
  useEffect(() => {
    setOrderLimitCallback(() => {
      setShowOrderLimitDialog(true);
    });
  }, []); // Empty dependency array since setOrderLimitCallback is now stable

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleBackFromCheckout = () => {
    setShowCheckout(false);
  };

  if (showCheckout) {
    return <CheckoutScreen onBack={handleBackFromCheckout} />;
  }

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
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      <OrderLimitDialog
        isOpen={showOrderLimitDialog}
        onClose={() => setShowOrderLimitDialog(false)}
      />
    </div>
  );
};

export default Index;
