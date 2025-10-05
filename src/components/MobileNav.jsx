import React from "react";
import { ShoppingBag, Menu } from "lucide-react";

export function MobileNav({ cartItemCount = 0, onCartClick, onMenuClick }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-accent p-4 md:hidden z-40">
      <div className="container mx-auto flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-accent rounded-full transition-colors"
        >
          <Menu className="text-light" size={24} />
        </button>

        <button
          onClick={onCartClick}
          className="flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-full font-semibold hover:shadow-neon-green transition-all"
        >
          <ShoppingBag size={20} />
          <span>View Cart</span>
          {cartItemCount > 0 && (
            <span className="bg-background text-primary w-5 h-5 rounded-full flex items-center justify-center text-sm">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
