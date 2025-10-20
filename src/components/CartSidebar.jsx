import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../contexts/OrderContext";
import { ImageWithLoader } from "./ImageWithLoader";

export function CartSidebar() {
  const navigate = useNavigate();
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useOrders();

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll"; // Keep scrollbar space to prevent layout shift
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Cart Panel - Ensure 100vh and proper flex distribution */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[60] flex flex-col w-full h-screen shadow-2xl bg-background sm:w-[450px] md:w-[500px] lg:w-[550px] xl:w-[600px]"
          >
            {/* Premium Header with enhanced design - Fixed height */}
            <div className="relative z-[61] flex-shrink-0 overflow-hidden border-b bg-gradient-to-r from-surface/95 via-surface/90 to-surface/95 backdrop-blur-xl border-primary/20">
              {/* Animated top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>

              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-secondary blur-3xl"></div>
              </div>

              <div className="relative flex items-center justify-between p-5 sm:p-6 lg:p-7">
                {/* Left side - Icon and Title */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Premium icon container */}
                  <div className="relative group">
                    {/* Animated ring */}
                    <div className="absolute inset-0 transition-opacity duration-300 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl group-hover:opacity-40"></div>

                    <div className="relative p-3 transition-all duration-300 border shadow-lg rounded-2xl lg:p-3.5 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border-primary/20 shadow-primary/10 group-hover:shadow-primary/30 group-hover:scale-110">
                      <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary drop-shadow-lg" />

                      {/* Badge with enhanced styling */}
                      {cart.length > 0 && (
                        <div className="absolute flex items-center justify-center px-2 py-0.5 text-xs font-extrabold border-2 rounded-full shadow-xl -top-2 -right-2 lg:text-sm bg-gradient-to-r from-primary via-primary to-secondary text-background shadow-primary/50 animate-pulse border-background">
                          {cart.length}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title section */}
                  <div className="space-y-0.5">
                    <h2 className="text-xl font-extrabold leading-none tracking-wide sm:text-2xl lg:text-3xl">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-text via-text to-primary">
                        Shopping Cart
                      </span>
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                      <p className="text-xs font-medium sm:text-sm text-text-muted">
                        {cart.length === 0
                          ? "Your cart is empty"
                          : `${cart.length} ${
                              cart.length === 1 ? "item" : "items"
                            } selected`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Close button - Premium design */}
                <button
                  onClick={closeCart}
                  className="relative p-2.5 overflow-hidden transition-all duration-300 sm:p-3 lg:p-3.5 rounded-2xl bg-gradient-to-br from-surface/80 to-surface/60 backdrop-blur-sm hover:from-primary/10 hover:to-primary/5 border border-primary/10 hover:border-primary/30 hover:scale-110 hover:rotate-90 group shadow-lg hover:shadow-xl hover:shadow-primary/20"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                  <X className="relative w-5 h-5 transition-colors duration-300 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-text group-hover:text-primary" />
                </button>
              </div>

              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            </div>

            {/* Cart Items - Constrained height to keep footer visible */}
            <div className="flex-1 min-h-0 p-4 space-y-3 overflow-y-auto sm:p-5 lg:p-6 sm:space-y-4">
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <div className="relative mb-4">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-2xl animate-pulse"></div>
                      <div className="relative flex items-center justify-center w-20 h-20 border rounded-full shadow-2xl sm:w-24 sm:h-24 bg-gradient-to-br from-surface/80 to-surface/40 backdrop-blur-xl border-primary/10">
                        <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-primary drop-shadow-2xl" />
                      </div>
                    </div>
                    <h3 className="mb-2 text-lg font-extrabold sm:text-xl text-light">
                      Your cart is empty
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed sm:text-base text-light/60 max-w-[280px]">
                      Discover our amazing products and start adding items to
                      your cart
                    </p>
                    <button
                      onClick={closeCart}
                      className="px-8 py-3 text-base font-bold transition-all rounded-xl sm:text-lg bg-gradient-to-r from-primary to-secondary text-background hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 active:scale-95"
                    >
                      Start Shopping
                    </button>
                  </motion.div>
                ) : (
                  cart.map((item, index) => (
                    <motion.div
                      key={item.cartId}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative overflow-hidden transition-all duration-300 border group rounded-xl lg:rounded-2xl bg-gradient-to-br from-surface/80 to-surface/40 backdrop-blur-xl border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02]"
                    >
                      {/* Enhanced hover glow effect */}
                      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent group-hover:opacity-100"></div>

                      <div className="relative flex gap-3 p-3 sm:gap-4 sm:p-4 lg:p-5">
                        {/* Product Image */}
                        <div className="relative flex-shrink-0 w-20 h-20 overflow-hidden border shadow-lg sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-xl border-primary/10 bg-gradient-to-br from-surface/50 to-surface/20">
                          <ImageWithLoader
                            src={
                              item.image ||
                              "/images/placeholders/swordshirt.jpg"
                            }
                            alt={item.name}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                          />
                          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 rounded-xl bg-gradient-to-t from-primary/20 to-transparent group-hover:opacity-100"></div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-between flex-1 min-w-0">
                          <div>
                            <h4 className="mb-1.5 text-sm font-extrabold leading-tight tracking-wide uppercase transition-all duration-300 sm:text-base lg:text-lg text-light group-hover:text-primary group-hover:tracking-wider drop-shadow-sm line-clamp-2">
                              {item.name}
                            </h4>
                            <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-lg sm:text-sm bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 shadow-md backdrop-blur-sm">
                              Size: {item.selectedSize}
                            </span>
                          </div>

                          {/* Quantity Controls and Price */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-1.5 p-1 border rounded-lg sm:gap-2 border-primary/20 bg-background/50 backdrop-blur-sm shadow-inner">
                              <button
                                onClick={() =>
                                  updateQuantity(item.cartId, item.quantity - 1)
                                }
                                className="p-1.5 transition-all rounded hover:bg-primary/20 text-light disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} className="sm:w-4 sm:h-4" />
                              </button>
                              <span className="w-8 text-sm font-bold text-center sm:w-10 sm:text-base text-light">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.cartId, item.quantity + 1)
                                }
                                className="p-1.5 transition-all rounded hover:bg-primary/20 text-light"
                              >
                                <Plus size={14} className="sm:w-4 sm:h-4" />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-extrabold text-transparent sm:text-xl lg:text-2xl bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-lg">
                                {(item.price * item.quantity).toFixed(2)} DH
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button - Repositioned */}
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="absolute p-2 transition-all duration-300 border rounded-lg top-3 right-3 hover:bg-red-500/10 text-light/60 hover:text-red-500 border-primary/5 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/20 hover:scale-110 active:scale-95 group/remove"
                        >
                          <Trash2
                            size={16}
                            className="transition-transform sm:w-5 sm:h-5 group-hover/remove:rotate-12"
                          />
                        </button>
                      </div>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 opacity-0 bg-gradient-to-r from-transparent via-primary to-transparent group-hover:opacity-100"></div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Premium Footer - Fixed at bottom, never hidden */}
            {cart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-shrink-0 p-5 space-y-4 border-t sm:p-6 lg:p-7 bg-surface/30 backdrop-blur-md border-primary/20"
              >
                {/* Subtotal with enhanced design */}
                <div className="p-4 border shadow-lg rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag
                        size={18}
                        className="sm:w-5 sm:h-5 text-primary"
                      />
                      <span className="text-base font-medium sm:text-lg text-light">
                        Subtotal
                      </span>
                    </div>
                    <span className="text-2xl font-extrabold text-transparent sm:text-3xl bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-lg">
                      {getTotalPrice().toFixed(2)} DH
                    </span>
                  </div>
                </div>

                {/* Checkout Button - Enhanced */}
                <button
                  onClick={handleCheckout}
                  className="relative flex items-center justify-center w-full gap-2 px-6 py-4 text-lg font-bold overflow-hidden transition-all rounded-xl sm:text-xl bg-gradient-to-r from-primary to-secondary text-background hover:shadow-2xl hover:shadow-primary/50 hover:scale-[1.02] active:scale-95 group"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                  <span className="relative">Proceed to Checkout</span>
                  <ArrowRight
                    className="relative transition-transform group-hover:translate-x-1"
                    size={22}
                  />
                </button>

                {/* Continue Shopping - Subtle */}
                <button
                  onClick={closeCart}
                  className="w-full py-3 text-sm font-medium transition-all rounded-lg sm:text-base text-light/70 hover:text-primary hover:bg-surface/30"
                >
                  Continue Shopping
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
