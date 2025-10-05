import React, { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductGrid } from "./components/ProductGrid";
import { CartDrawer } from "./components/CartDrawer";
import { MobileNav } from "./components/MobileNav";
import { ToastProvider } from "./components/ToastProvider";
import { FeaturedCategories } from "./components/FeaturedCategories";
// import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./hooks/useTheme";
import { ThemeToggle } from "./components/ThemeToggle";
import { OrderProvider } from "./contexts/OrderContext";
// import { OrdersSection } from "./components/OrdersSection";
import "./index.css";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return (
    <ThemeProvider>
      <OrderProvider>
        <ToastProvider>
          <div className="min-h-screen transition-colors bg-background text-text">
            <Header
              onCartClick={() => setIsCartOpen(true)}
              cartItemCount={cartItems.length}
            />
            <main className="pt-20">
              <Hero />
              {/* <FeaturedCategories /> */}
              <ProductGrid />
              {/* <Features /> */}
            </main>

            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cartItems={cartItems}
            />

            <Footer />
          </div>
          {/* <OrdersSection /> */}
        </ToastProvider>
      </OrderProvider>
    </ThemeProvider>
  );
}

export default App;
