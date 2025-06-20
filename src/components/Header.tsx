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

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div>
              <h1 className="font-heading text-2xl font-bold text-brand-pink">
                Bread N' Br☕︎w
              </h1>
              <p className="text-sm text-gray-600 italic">
                Artisan Breads, Perfect Brews, & Fine Patisseries
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
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

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2 text-gray-700 hover:text-brand-brown"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            <Button
              className="hidden md:inline-flex bg-brand-pink hover:bg-pink-600 text-white"
              size="sm"
            >
              Order Online
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-64 mt-4" : "max-h-0",
          )}
        >
          <nav className="flex flex-col space-y-4 pb-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-brand-brown transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button
              className="bg-brand-pink hover:bg-pink-600 text-white w-full mt-2"
              size="sm"
            >
              Order Online
            </Button>
          </nav>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
