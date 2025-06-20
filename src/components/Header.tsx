/**
 * Header Component
 *
 * The main navigation header for the Bread N' Br☕︎w bakery website.
 * Features responsive design, mobile menu, shopping cart integration,
 * and smooth scrolling navigation to page sections.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import CartSidebar from "./CartSidebar";

/**
 * Header Component
 *
 * Provides:
 * - Brand logo and tagline
 * - Navigation menu (desktop and mobile)
 * - Shopping cart button with item count
 * - Responsive mobile menu toggle
 * - Cart sidebar integration
 */
const Header = () => {
  // ========== State Management ==========

  /** Controls mobile menu visibility */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /** Controls cart sidebar visibility */
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Get cart functionality from context
  const { getTotalItems } = useCart();

  // ========== Navigation Configuration ==========

  /**
   * Navigation menu items
   * Each item corresponds to a section on the homepage
   * Uses anchor links for smooth scrolling to sections
   */
  const navItems = [
    { name: "Menu", href: "#menu" },
    { name: "Catering", href: "#catering" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  // ========== Event Handlers ==========

  /**
   * Toggle mobile menu visibility
   */
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Close mobile menu (used when nav item is clicked)
   */
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  /**
   * Open cart sidebar
   */
  const openCart = () => {
    setIsCartOpen(true);
  };

  /**
   * Close cart sidebar
   */
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // ========== Render ==========

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* ========== Brand Logo and Tagline ========== */}
          <div className="flex items-center">
            <div
              className="cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {/* Main brand name with coffee emoji */}
              <h1 className="font-heading text-2xl font-bold text-brand-pink">
                Bread N' Br☕︎w
              </h1>
              {/* Brand tagline */}
              <p className="text-sm text-gray-600 italic">
                Perfect Brews, Fine Patisseries
              </p>
              <p className="text-xs text-gray-500 italic">
                Freshly baked pastries and specialty coffee in the heart of
                Berkeley Heights.
              </p>
            </div>
          </div>

          {/* ========== Desktop Navigation Menu ========== */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-brand-brown transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* ========== Action Buttons ========== */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart Button with Item Count Badge */}
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2 text-gray-700 hover:text-brand-brown flex items-center gap-2"
              onClick={openCart}
              aria-label={`Shopping cart with ${getTotalItems()} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">Cart</span>
              {/* Cart item count badge (only shown when items exist) */}
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            {/* Desktop Order Online Button */}
            <Button
              className="hidden md:inline-flex bg-brand-pink hover:bg-pink-600 text-white"
              size="sm"
            >
              Order Online
            </Button>

            {/* Mobile Menu Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={toggleMobileMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* ========== Mobile Navigation Menu ========== */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-64 mt-4" : "max-h-0",
          )}
        >
          <nav className="flex flex-col space-y-4 pb-4">
            {/* Mobile navigation links */}
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-brand-brown transition-colors font-medium"
                onClick={closeMobileMenu} // Close menu when nav item is clicked
              >
                {item.name}
              </a>
            ))}
            {/* Mobile Order Online Button */}
            <Button
              className="bg-brand-pink hover:bg-pink-600 text-white w-full mt-2"
              size="sm"
            >
              Order Online
            </Button>
          </nav>
        </div>
      </div>

      {/* ========== Cart Sidebar ========== */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </header>
  );
};

export default Header;
