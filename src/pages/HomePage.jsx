import React, { useState } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ProductGrid } from "../components/ProductGrid";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";

export const HomePage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="min-h-screen transition-colors bg-background text-text">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        cartItemCount={cartItems.length}
      />
      <main className="pt-20">
        <Hero />
        <ProductGrid />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />

      <Footer />
    </div>
  );
};
