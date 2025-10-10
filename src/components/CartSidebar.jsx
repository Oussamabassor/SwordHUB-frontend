import React from "react";
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

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 flex flex-col w-full h-full shadow-2xl bg-background sm:w-96"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <ShoppingBag className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-light">
                    Shopping Cart
                  </h2>
                  <p className="text-sm text-light/60">
                    {getTotalItems()} items
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 transition-colors rounded-lg hover:bg-surface text-light"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <div className="w-20 h-20 mb-4 rounded-full bg-surface/50 flex items-center justify-center">
                      <ShoppingBag className="text-light/40" size={40} />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-light">
                      Your cart is empty
                    </h3>
                    <p className="mb-6 text-sm text-light/60">
                      Add some amazing products to get started!
                    </p>
                    <button
                      onClick={closeCart}
                      className="px-6 py-3 transition-all rounded-lg bg-primary text-background hover:shadow-neon-green"
                    >
                      Continue Shopping
                    </button>
                  </motion.div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.cartId}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="flex gap-4 p-4 transition-all border rounded-xl border-primary/10 bg-surface/30 hover:bg-surface/50"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-20 h-20 overflow-hidden border rounded-lg border-primary/10">
                        <ImageWithLoader
                          src={
                            item.image || "/images/placeholders/swordshirt.jpg"
                          }
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="mb-1 font-semibold truncate text-light">
                          {item.name}
                        </h4>
                        <p className="mb-2 text-sm text-light/60">
                          Size: {item.selectedSize}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 p-1 border rounded-lg border-primary/20 bg-background/50">
                            <button
                              onClick={() =>
                                updateQuantity(item.cartId, item.quantity - 1)
                              }
                              className="p-1 transition-colors rounded hover:bg-primary/20 text-light"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-sm font-medium text-center text-light">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.cartId, item.quantity + 1)
                              }
                              className="p-1 transition-colors rounded hover:bg-primary/20 text-light"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="p-2 transition-colors rounded-lg hover:bg-red-500/10 text-light/60 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 space-y-4 border-t border-primary/10 bg-surface/30"
              >
                {/* Subtotal */}
                <div className="flex items-center justify-between pb-4 border-b border-primary/10">
                  <span className="text-lg font-semibold text-light">
                    Subtotal
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="flex items-center justify-center w-full gap-2 px-6 py-4 text-lg font-semibold transition-all rounded-xl bg-primary text-background hover:shadow-neon-green group"
                >
                  Proceed to Checkout
                  <ArrowRight
                    className="transition-transform group-hover:translate-x-1"
                    size={20}
                  />
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="w-full py-3 text-sm font-medium transition-colors rounded-lg text-light/80 hover:text-primary"
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
