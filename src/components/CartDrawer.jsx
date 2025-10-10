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

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[440px] bg-gradient-to-b from-surface to-background border-l border-primary/10 shadow-2xl shadow-primary/5 transform transition-all duration-300 ease-out z-50 flex flex-col ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {/* Header with glow effect */}
        <div className="relative pb-4 border-b bg-surface/50 backdrop-blur-md border-primary/20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-xl bg-primary/10">
                <ShoppingBag className="w-6 h-6 text-primary" />
                {cart.length > 0 && (
                  <div className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full -top-1 -right-1 bg-primary text-background animate-pulse">
                    {cart.length}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-text">Shopping Cart</h2>
                <p className="text-sm text-text-muted">
                  {cart.length === 0
                    ? "Empty cart"
                    : `${cart.length} ${cart.length === 1 ? "item" : "items"}`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="relative p-2.5 transition-all duration-300 rounded-xl bg-surface hover:bg-primary/10 hover:scale-110 hover:rotate-90 group"
            >
              <X className="text-text group-hover:text-primary" size={20} />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 px-6 py-6 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 py-12 text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse"></div>
                <div className="relative p-8 rounded-full bg-surface/50 backdrop-blur-sm">
                  <ShoppingBag className="w-16 h-16 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-text">
                  Your cart is empty
                </h3>
                <p className="text-sm text-text-muted max-w-[280px]">
                  Discover our amazing products and start adding items to your
                  cart
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 font-semibold transition-all rounded-xl bg-primary text-background hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item.cartId || item.id}
                  className="relative overflow-hidden transition-all duration-300 group rounded-2xl bg-surface/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] hover:-translate-y-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:opacity-100"></div>

                  <div className="relative flex gap-4 p-4">
                    {/* Product Image with hover effect */}
                    <div className="relative w-24 h-24 overflow-hidden rounded-xl bg-surface shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-xl bg-primary/10 group-hover:opacity-100"></div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="mb-1 font-semibold transition-colors text-text line-clamp-1 group-hover:text-primary">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary">
                            Size: {item.selectedSize || item.size}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="group/remove flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-all rounded-lg text-text-muted hover:text-red-500 hover:bg-red-500/10 hover:scale-105"
                        >
                          <Trash2
                            size={14}
                            className="transition-transform group-hover/remove:rotate-12"
                          />
                          Remove
                        </button>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">
                            {(item.price * (item.quantity || 1)).toFixed(2)} DH
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-text-muted">
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

        {/* Summary */}
        {cart.length > 0 && (
          <div className="px-6 pt-4 pb-6 mt-auto border-t bg-surface/50 backdrop-blur-md border-primary/20">
            {/* Subtotal Section */}
            <div className="p-4 mb-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-primary" />
                  <p className="text-sm font-medium text-text-muted">
                    Subtotal
                  </p>
                </div>
                <p className="text-sm text-text-muted">
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </p>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-primary">
                  {subtotal.toFixed(2)} DH
                </p>
                <div className="text-right">
                  <p className="text-xs text-text-muted">Free Shipping</p>
                  <p className="text-xs font-semibold text-primary">
                    + 24/7 Support
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Checkout Button */}
            <button
              className="relative flex items-center justify-center w-full gap-3 py-4 overflow-hidden font-bold transition-all rounded-xl bg-gradient-to-r from-primary to-secondary text-background hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 group"
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
                size={22}
                className="relative transition-transform group-hover:rotate-12"
              />
              <span className="relative">Order via WhatsApp</span>
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-white/10 group-hover:opacity-100"></div>
            </button>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-text-muted">
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
