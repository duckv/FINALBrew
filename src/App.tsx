/**
 * Main Application Component
 *
 * This is the root component of the Bread N' Br☕︎w bakery website.
 * It sets up all the necessary providers and routing for the application.
 */

import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/**
 * Configure React Query client for server state management
 * Used for any future API calls and caching
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Consider data fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
    },
  },
});

/**
 * App Component
 *
 * Sets up the application with the following providers:
 * - QueryClientProvider: Manages server state and API calls
 * - CartProvider: Manages shopping cart state globally
 * - TooltipProvider: Enables tooltips throughout the app
 * - Toast providers: Handle notification messages
 * - BrowserRouter: Enables client-side routing
 *
 * @returns The complete application with all providers and routing
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* Global cart state management */}
    <CartProvider>
      {/* Enable tooltips throughout the application */}
      <TooltipProvider>
        {/* Toast notification systems (using both for different use cases) */}
        <Toaster /> {/* Shadcn/ui toaster for form feedback */}
        <Sonner /> {/* Sonner for general notifications */}
        {/* Client-side routing setup */}
        <BrowserRouter>
          <Routes>
            {/* Homepage route */}
            <Route path="/" element={<Index />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            {/* Future routes can be added here, such as:
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
            */}

            {/* Catch-all route for 404 errors - MUST be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
