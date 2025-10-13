import React from "react";
import {
  X,
  ShoppingBag,
  MessageCircle,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import { useOrders } from "../contexts/OrderContext";

export function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useOrders();

  const subtotal = getTotalPrice();

  return (
    <>
      {/* Overlay with blur effect */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer - Wider on large screens */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] lg:w-[540px] xl:w-[600px] bg-gradient-to-b from-surface to-background border-l border-primary/10 shadow-2xl shadow-primary/5 transform transition-all duration-300 ease-out z-[60] flex flex-col ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {/* Header with glow effect */}
        <div className="relative pb-4 border-b bg-surface/50 backdrop-blur-md border-primary/20 z-[61]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <div className="flex items-center justify-between p-4 sm:p-5 lg:p-6">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="relative p-2 lg:p-2.5 rounded-xl bg-primary/10">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
                {cart.length > 0 && (
                  <div className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full lg:w-6 lg:h-6 lg:text-sm -top-1 -right-1 bg-primary text-background animate-pulse">
                    {cart.length}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold sm:text-xl lg:text-2xl text-text">
                  Shopping Cart
                </h2>
                <p className="text-xs sm:text-sm lg:text-base text-text-muted">
                  {cart.length === 0
                    ? "Empty cart"
                    : `${cart.length} ${cart.length === 1 ? "item" : "items"}`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="relative p-2 transition-all duration-300 sm:p-2.5 lg:p-3 rounded-xl bg-surface hover:bg-primary/10 hover:scale-110 hover:rotate-90 group"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-text group-hover:text-primary" />
            </button>
          </div>
        </div>

        {/* Cart Items - Better spacing on large screens */}
        <div className="flex-1 px-3 py-4 overflow-y-auto sm:px-5 lg:px-8 sm:py-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-8 text-center sm:gap-6 sm:py-12">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse"></div>
                <div className="relative p-6 rounded-full sm:p-8 lg:p-10 bg-surface/50 backdrop-blur-sm">
                  <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold sm:text-xl lg:text-2xl text-text">
                  Your cart is empty
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-text-muted max-w-[280px] lg:max-w-[320px]">
                  Discover our amazing products and start adding items to your
                  cart
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 text-sm font-semibold transition-all sm:text-base lg:text-lg lg:px-8 lg:py-4 rounded-xl bg-primary text-background hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
              {cart.map((item, index) => (
                <div
                  key={item.cartId || item.id}
                  className="relative overflow-hidden transition-all duration-300 group rounded-xl lg:rounded-2xl bg-surface/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] hover:-translate-y-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:opacity-100"></div>

                  <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:gap-6 lg:gap-8 sm:p-6 lg:p-8 xl:p-10">
                    {/* Product Image with hover effect - Much larger on big screens */}
                    <div className="relative w-32 h-32 mx-auto overflow-hidden rounded-lg sm:mx-0 sm:w-32 sm:h-32 lg:w-44 lg:h-44 xl:w-48 xl:h-48 lg:rounded-xl bg-surface shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 lg:rounded-xl bg-primary/10 group-hover:opacity-100"></div>
                    </div>

                    {/* Product Details - Much better spacing on large screens */}
                    <div className="flex flex-col justify-between flex-1 min-w-0 gap-3 lg:gap-5">
                      <div className="space-y-3 lg:space-y-4">
                        <h3 className="text-base font-bold leading-snug text-center uppercase transition-colors sm:text-left sm:text-lg lg:text-2xl xl:text-3xl text-text line-clamp-2 group-hover:text-primary">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-center gap-2 sm:justify-start">
                          <span className="px-4 py-1.5 text-sm font-medium rounded-lg lg:px-5 lg:py-2.5 lg:text-base xl:text-lg lg:rounded-xl bg-primary/10 text-primary">
                            Size: {item.selectedSize || item.size}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:gap-5">
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="group/remove flex items-center justify-center sm:justify-start gap-2.5 lg:gap-3 px-4 py-2.5 lg:px-5 lg:py-3 text-sm sm:text-base lg:text-lg xl:text-xl font-medium transition-all rounded-lg text-text-muted hover:text-red-500 hover:bg-red-500/10 hover:scale-105 self-center sm:self-start"
                        >
                          <Trash2
                            size={18}
                            className="transition-transform lg:w-7 lg:h-7 xl:w-8 xl:h-8 group-hover/remove:rotate-12"
                          />
                          <span>Remove</span>
                        </button>
                        <div className="text-center sm:text-right">
                          <p className="text-2xl font-bold sm:text-3xl lg:text-4xl xl:text-5xl text-primary">
                            {(item.price * (item.quantity || 1)).toFixed(2)} DH
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm sm:text-base lg:text-lg text-text-muted">
                              {item.price} DH × {item.quantity}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 opacity-0 bg-gradient-to-r from-transparent via-primary to-transparent group-hover:opacity-100"></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary - Better spacing on large screens */}
        {cart.length > 0 && (
          <div className="px-3 pt-3 pb-4 mt-auto border-t sm:px-5 lg:px-8 sm:pt-4 lg:pt-5 sm:pb-6 lg:pb-8 bg-surface/50 backdrop-blur-md border-primary/20">
            {/* Subtotal Section */}
            <div className="p-3 mb-3 sm:p-4 lg:p-5 sm:mb-4 lg:mb-5 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5">
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag
                    size={16}
                    className="sm:w-[18px] sm:h-[18px] lg:w-5 lg:h-5 text-primary"
                  />
                  <p className="text-xs font-medium sm:text-sm lg:text-base text-text-muted">
                    Subtotal
                  </p>
                </div>
                <p className="text-xs sm:text-sm lg:text-base text-text-muted">
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </p>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold sm:text-3xl lg:text-4xl text-primary">
                  {subtotal.toFixed(2)} DH
                </p>
                <div className="text-right">
                  <p className="text-[10px] sm:text-xs lg:text-sm text-text-muted">
                    Free Shipping
                  </p>
                  <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-primary">
                    + 24/7 Support
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Checkout Button - Larger on big screens */}
            <button
              className="relative flex items-center justify-center w-full gap-2 py-3 overflow-hidden text-sm font-bold transition-all sm:gap-3 sm:py-4 lg:py-5 sm:text-base lg:text-lg rounded-xl bg-gradient-to-r from-primary to-secondary text-background hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 group"
              onClick={() => {
                const message = `🛍️ New Order:%0A%0A${cart
                  .map(
                    (item, index) =>
                      `${index + 1}. ${item.name}%0A   Size: ${
                        item.selectedSize || item.size
                      }%0A   Qty: ${item.quantity || 1}%0A   Price: ${(
                        item.price * (item.quantity || 1)
                      ).toFixed(2)} DH`
                  )
                  .join("%0A%0A")}%0A%0A💰 Total: ${subtotal.toFixed(
                  2
                )} DH%0A%0AThank you!`;
                window.open(`https://wa.me/0665652168?text=${message}`);
              }}
            >
              <span className="absolute inset-0 transition-transform duration-300 translate-y-full bg-gradient-to-r from-secondary to-primary group-hover:translate-y-0"></span>
              <MessageCircle
                size={20}
                className="relative transition-transform sm:w-[22px] sm:h-[22px] lg:w-6 lg:h-6 group-hover:rotate-12"
              />
              <span className="relative">Order via WhatsApp</span>
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-white/10 group-hover:opacity-100"></div>
            </button>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 mt-2 text-[10px] sm:text-xs lg:text-sm sm:mt-3 text-text-muted">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span>Secure Checkout</span>
              </div>
              <span>•</span>
              <span>Quick Response</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
