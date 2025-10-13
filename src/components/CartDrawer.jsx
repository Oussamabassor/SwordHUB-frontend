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
        {/* Premium Header with enhanced design */}
        <div className="relative overflow-hidden border-b bg-gradient-to-r from-surface/95 via-surface/90 to-surface/95 backdrop-blur-xl border-primary/20 z-[61]">
          {/* Animated top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>

          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-secondary blur-3xl"></div>
          </div>

          <div className="relative flex items-center justify-between p-5 sm:p-6 lg:p-8">
            {/* Left side - Icon and Title */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
              {/* Premium icon container */}
              <div className="relative group">
                {/* Animated ring */}
                <div className="absolute inset-0 transition-opacity duration-300 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl group-hover:opacity-40"></div>

                <div className="relative p-3 transition-all duration-300 border shadow-lg rounded-2xl lg:p-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border-primary/20 shadow-primary/10 group-hover:shadow-primary/30 group-hover:scale-110">
                  <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9 text-primary drop-shadow-lg" />

                  {/* Badge with enhanced styling */}
                  {cart.length > 0 && (
                    <div className="absolute flex items-center justify-center px-2 py-1 text-xs font-extrabold border-2 rounded-full shadow-xl -top-2 -right-2 lg:-top-3 lg:-right-3 lg:text-sm bg-gradient-to-r from-primary via-primary to-secondary text-background shadow-primary/50 animate-pulse border-background">
                      {cart.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Title section */}
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold leading-none tracking-wide sm:text-2xl lg:text-3xl xl:text-4xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-text via-text to-primary">
                    Shopping Cart
                  </span>
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                  <p className="text-xs font-medium sm:text-sm lg:text-base text-text-muted">
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
              onClick={onClose}
              className="relative p-3 overflow-hidden transition-all duration-300 sm:p-3.5 lg:p-4 rounded-2xl bg-gradient-to-br from-surface/80 to-surface/60 backdrop-blur-sm hover:from-primary/10 hover:to-primary/5 border border-primary/10 hover:border-primary/30 hover:scale-110 hover:rotate-90 group shadow-lg hover:shadow-xl hover:shadow-primary/20"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

              <X className="relative w-6 h-6 transition-colors duration-300 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-text group-hover:text-primary" />
            </button>
          </div>

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>

        {/* Cart Items - Improved spacing and distribution for large screens */}
        <div className="flex-1 px-4 py-5 overflow-y-auto sm:px-6 lg:px-10 xl:px-12 sm:py-7 lg:py-8">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 py-10 text-center sm:gap-7 sm:py-14 lg:gap-8 lg:py-16">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-3xl animate-pulse"></div>
                <div className="relative p-8 border rounded-full shadow-2xl sm:p-10 lg:p-14 bg-gradient-to-br from-surface/80 to-surface/40 backdrop-blur-xl border-primary/10">
                  <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-primary drop-shadow-2xl" />
                </div>
              </div>
              <div className="space-y-3 lg:space-y-4">
                <h3 className="text-xl font-extrabold sm:text-2xl lg:text-3xl text-text">
                  Your cart is empty
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-text-muted max-w-[320px] lg:max-w-[400px] leading-relaxed">
                  Discover our amazing products and start adding items to your
                  cart
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-8 py-4 text-base font-bold transition-all sm:text-lg lg:text-xl lg:px-10 lg:py-5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-background hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 active:scale-95"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5 lg:space-y-7 xl:space-y-8">
              {cart.map((item, index) => (
                <div
                  key={item.cartId || item.id}
                  className="relative overflow-hidden transition-all duration-300 group rounded-2xl lg:rounded-3xl bg-gradient-to-br from-surface/80 to-surface/40 backdrop-blur-xl border border-primary/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.01] hover:-translate-y-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Enhanced hover glow effect */}
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent group-hover:opacity-100"></div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 overflow-hidden transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                    <div className="absolute w-1/2 h-full transition-all duration-1000 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent -left-full group-hover:left-full"></div>
                  </div>

                  <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:gap-8 lg:gap-10 xl:gap-12 sm:p-7 lg:p-10 xl:p-12">
                    {/* Product Image - Larger and better styled */}
                    <div className="relative mx-auto overflow-hidden border shadow-2xl w-36 h-36 sm:mx-0 sm:w-40 sm:h-40 lg:w-52 lg:h-52 xl:w-56 xl:h-56 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-surface/50 to-surface/20 shrink-0 shadow-primary/10 border-primary/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                      />
                      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 rounded-2xl lg:rounded-3xl bg-gradient-to-t from-primary/20 to-transparent group-hover:opacity-100"></div>
                    </div>

                    {/* Product Details - More spacious layout with better vertical distribution */}
                    <div className="flex flex-col flex-1 min-w-0 gap-6 lg:gap-8 xl:gap-10">
                      {/* Product name - More breathing room */}
                      <h3 className="text-lg font-extrabold leading-tight tracking-wide text-center uppercase transition-all duration-300 sm:text-left sm:text-xl lg:text-2xl xl:text-3xl text-text group-hover:text-primary group-hover:tracking-wider drop-shadow-sm">
                        {item.name}
                      </h3>

                      {/* Size badge */}
                      <div className="flex items-center justify-center gap-3 sm:justify-start">
                        <span className="px-5 py-2.5 text-sm font-bold rounded-xl lg:px-6 lg:py-3 lg:text-base xl:text-lg lg:rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 shadow-lg backdrop-blur-sm">
                          Size: {item.selectedSize || item.size}
                        </span>
                      </div>

                      {/* Price section - Separated for better visibility */}
                      <div className="space-y-2 text-center sm:text-left">
                        <p className="text-4xl font-extrabold text-transparent sm:text-5xl lg:text-6xl xl:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-lg">
                          {(item.price * (item.quantity || 1)).toFixed(2)} DH
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-lg font-medium sm:text-xl lg:text-2xl text-text-muted">
                            {item.price} DH × {item.quantity}
                          </p>
                        )}
                      </div>

                      {/* Remove button - At bottom with more space */}
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="flex items-center self-center justify-center gap-3 px-6 py-3.5 text-base font-bold transition-all border shadow-lg group/remove sm:justify-start lg:gap-4 lg:px-7 lg:py-4 xl:px-8 xl:py-5 sm:text-lg lg:text-xl rounded-xl lg:rounded-2xl text-text-muted hover:text-red-500 bg-surface/50 hover:bg-red-500/10 hover:scale-105 active:scale-95 sm:self-start border-primary/5 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/20 mt-auto"
                      >
                        <Trash2
                          size={20}
                          className="transition-transform lg:w-7 lg:h-7 xl:w-8 xl:h-8 group-hover/remove:rotate-12"
                        />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom accent line with animation */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 opacity-0 bg-gradient-to-r from-transparent via-primary to-transparent group-hover:opacity-100"></div>
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
