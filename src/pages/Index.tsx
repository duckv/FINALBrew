/**
 * Homepage Component (Index)
 *
 * This is the main landing page for the Bread N' Br☕︎w bakery website.
 * It orchestrates all the sections of the homepage and manages the shopping
 * cart functionality and checkout flow.
 */

import { useState, useEffect } from "react";

// Layout and Section Components
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import CateringSection from "@/components/CateringSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import GoogleReviews from "@/components/GoogleReviews";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Shopping Cart Components
import FloatingCart from "@/components/FloatingCart";
import CartSidebar from "@/components/CartSidebar";
import CheckoutScreen from "@/components/CheckoutScreen";
import OrderLimitDialog from "@/components/OrderLimitDialog";

// Context Hooks
import { useCart } from "@/contexts/CartContext";

/**
 * Index Page Component
 *
 * Manages the homepage layout and shopping cart workflow including:
 * - Cart sidebar visibility
 * - Checkout screen navigation
 * - Order limit notifications
 * - Integration with cart context
 */
const Index = () => {
  // ========== State Management ==========

  /** Controls visibility of the cart sidebar */
  const [isCartOpen, setIsCartOpen] = useState(false);

  /** Controls whether to show checkout screen instead of homepage */
  const [showCheckout, setShowCheckout] = useState(false);

  /** Controls visibility of order limit warning dialog */
  const [showOrderLimitDialog, setShowOrderLimitDialog] = useState(false);

  // Cart context for global cart state
  const { setOrderLimitCallback } = useCart();

  // ========== Effects ==========

  /**
   * Set up the order limit callback when component mounts
   * This allows the cart context to trigger the order limit dialog
   * when users try to add too many items
   */
  useEffect(() => {
    setOrderLimitCallback(() => {
      setShowOrderLimitDialog(true);
    });
  }, []); // Empty dependency array since setOrderLimitCallback is stable

  // ========== Event Handlers ==========

  /**
   * Navigate to checkout screen
   * Triggered when user clicks checkout in cart sidebar
   */
  const handleCheckout = () => {
    setShowCheckout(true);
  };

  /**
   * Navigate back from checkout to homepage
   * Triggered when user clicks back button in checkout screen
   */
  const handleBackFromCheckout = () => {
    setShowCheckout(false);
  };

  /**
   * Open cart sidebar
   * Triggered when user clicks the floating cart button
   */
  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  /**
   * Close cart sidebar
   * Triggered when user clicks close button or overlay
   */
  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  /**
   * Close order limit dialog
   * Triggered when user acknowledges the order limit warning
   */
  const handleCloseOrderLimit = () => {
    setShowOrderLimitDialog(false);
  };

  // ========== Conditional Rendering ==========

  /**
   * Show checkout screen if user is in checkout flow
   * This replaces the entire homepage with the checkout interface
   */
  if (showCheckout) {
    return <CheckoutScreen onBack={handleBackFromCheckout} />;
  }

  // ========== Main Homepage Render ==========

  return (
    <div className="min-h-screen bg-background">
      {/* ========== Main Page Sections ========== */}

      {/* Site Navigation */}
      <Header />

      {/* Landing Section with Hero Image and CTA */}
      <Hero />

      {/* Product Showcase and Menu */}
      <MenuSection />

      {/* Catering Services Information */}
      <CateringSection />

      {/* Customer Reviews and Testimonials */}
      <TestimonialsSection />

      {/* Photo Gallery of Bakery and Products */}
      <GallerySection />

      {/* Google Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real reviews from our Google listing, updated automatically
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <GoogleReviews />
          </div>
        </div>
      </section>

      {/* Contact Information and Hours */}
      <ContactSection />

      {/* Site Footer with Links and Info */}
      <Footer />

      {/* ========== Shopping Cart Components ========== */}

      {/* Floating cart button (always visible when items in cart) */}
      <FloatingCart onClick={handleOpenCart} />

      {/* Sliding cart sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        onCheckout={handleCheckout}
      />

      {/* Order limit warning dialog */}
      <OrderLimitDialog
        isOpen={showOrderLimitDialog}
        onClose={handleCloseOrderLimit}
      />
    </div>
  );
};

export default Index;
