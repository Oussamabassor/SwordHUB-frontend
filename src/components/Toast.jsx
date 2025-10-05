import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, ShoppingCart, X } from "lucide-react";

export function Toast({ message, type = "success", duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle className="text-primary" size={20} />,
    error: <XCircle className="text-red-500" size={20} />,
    cart: <ShoppingCart className="text-primary" size={20} />,
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
      <div className="bg-surface border border-accent p-4 rounded-lg shadow-lg min-w-[320px] flex items-start gap-3">
        {icons[type]}
        <p className="text-light flex-1">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="text-neutral hover:text-light transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
