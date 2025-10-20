import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useOrders } from "../contexts/OrderContext";

export function Header() {
  const { getTotalItems, toggleCart } = useOrders();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="app-header"
      className="fixed top-0 left-0 right-0 w-full transition-all duration-500"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 9999,
        background: isScrolled 
          ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(18, 18, 18, 0.9) 50%, rgba(30, 30, 30, 0.95) 100%)' 
          : 'linear-gradient(135deg, rgba(18, 18, 18, 0.98) 0%, rgba(30, 30, 30, 0.85) 50%, rgba(18, 18, 18, 0.7) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(0, 255, 157, 0.08), 0 2px 8px rgba(0, 0, 0, 0.4)' 
          : '0 4px 16px rgba(0, 0, 0, 0.2)',
        borderBottom: isScrolled 
          ? '1px solid rgba(0, 255, 157, 0.15)' 
          : '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo Section - Premium Design */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center gap-3 group"
          >
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Logo Image Container */}
            <div className="relative flex items-center justify-center w-12 h-12 overflow-hidden transition-all duration-300 rounded-xl lg:w-14 lg:h-14 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 group-hover:shadow-lg group-hover:shadow-primary/30">
              <img
                src="/images/logo/sword-logo.png"
                alt="SwordHub Logo"
                className="object-contain w-8 h-8 transition-transform duration-300 lg:w-10 lg:h-10 group-hover:scale-110 group-hover:rotate-3"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>

            {/* Brand Name - Modern Typography */}
            <div className="relative">
              <h1 className="text-2xl font-extrabold leading-none tracking-tight sm:text-3xl lg:text-4xl text-text">
                SWORD
                <span className="text-transparent transition-all duration-300 bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-secondary group-hover:from-secondary group-hover:via-primary group-hover:to-primary">
                  HUB
                </span>
              </h1>
              {/* Animated underline */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.a>

          {/* Cart Button - Premium Design */}
          <motion.button
            onClick={toggleCart}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-3 px-5 py-3 overflow-hidden transition-all duration-300 border shadow-lg lg:px-6 lg:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-surface to-surface/80 backdrop-blur-xl border-primary/20 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20 group"
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-0 bg-gradient-to-r from-primary/10 to-secondary/10 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />

            {/* Cart Icon with pulse effect */}
            <div className="relative">
              <ShoppingBag className="relative z-10 w-5 h-5 transition-transform duration-300 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-text group-hover:text-primary group-hover:rotate-12" />

              {/* Badge */}
              {getTotalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute z-20 flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full -top-2 -right-2 lg:-top-2.5 lg:-right-2.5 lg:w-6 lg:h-6 lg:text-sm bg-gradient-to-r from-primary to-secondary text-background shadow-lg shadow-primary/50 animate-pulse"
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </div>

            {/* Cart Text - Hidden on small screens */}
            <span className="relative z-10 hidden font-bold tracking-wide uppercase transition-colors duration-300 sm:block text-text group-hover:text-primary">
              Cart
            </span>

            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </header>
  );
}
