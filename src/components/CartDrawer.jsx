import React from "react";
import { X, ShoppingBag, MessageCircle, Trash2 } from "lucide-react";
import { useOrders } from "../contexts/OrderContext";

export function CartDrawer({ isOpen, onClose }) {
  const { orders, removeFromOrder } = useOrders();

  const subtotal = orders.reduce((total, item) => total + item.price, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[420px] bg-surface p-6 shadow-lg transform transition-transform z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-accent/20">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-light">
                Shopping Cart
              </h2>
              <p className="text-sm text-light/60">{orders.length} items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-full hover:bg-accent/50"
          >
            <X className="text-light" size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 py-6 overflow-y-auto custom-scrollbar">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-8 text-center">
              <div className="p-6 rounded-full bg-accent/20">
                <ShoppingBag className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-light">
                  Your cart is empty
                </h3>
                <p className="text-sm text-light/60">
                  Start adding some items to your cart
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((item) => (
                <div
                  key={item.id}
                  className="relative flex gap-4 p-4 transition-all rounded-xl bg-accent/20 hover:bg-accent/30"
                >
                  <div className="relative w-24 h-24 overflow-hidden rounded-lg bg-surface">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 rounded-lg shadow-inner"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-light line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="mb-2 text-sm text-light/60">
                          Size: {item.size}
                        </p>
                      </div>
                      <p className="font-semibold text-primary">
                        ${item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromOrder(item.id)}
                      className="flex items-center gap-2 px-3 py-1.5 mt-2 text-sm transition-colors rounded-lg text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {orders.length > 0 && (
          <div className="pt-4 mt-auto border-t border-accent/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-light/60">Subtotal</p>
                <p className="text-2xl font-bold text-primary">
                  ${subtotal.toFixed(2)}
                </p>
              </div>
              <p className="text-sm text-light/60">{orders.length} items</p>
            </div>

            {/* WhatsApp Checkout Button */}
            <button
              className="flex items-center justify-center w-full gap-2 py-4 font-semibold transition-all rounded-xl bg-primary text-background hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20"
              onClick={() => {
                const message = `New Order:%0A${orders
                  .map(
                    (item) =>
                      `• ${item.name} (Size: ${item.size}) - $${item.price}`
                  )
                  .join("%0A")}%0A%0ATotal: $${subtotal.toFixed(2)}`;
                window.open(`https://wa.me/0665652168?text=${message}`);
              }}
            >
              <MessageCircle size={20} />
              Commander via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
