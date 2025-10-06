import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Toast({ message, type = "success", duration = 5000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (duration / 100);
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration, onClose]);

  if (!isVisible) return null;

  const config = {
    success: {
      icon: <CheckCircle className="text-primary flex-shrink-0" size={24} />,
      bgColor: "bg-white dark:bg-gray-800",
      borderColor: "border-primary/40",
      progressColor: "bg-primary",
      shadowColor: "shadow-primary/10",
    },
    error: {
      icon: <XCircle className="text-red-500 flex-shrink-0" size={24} />,
      bgColor: "bg-white dark:bg-gray-800",
      borderColor: "border-red-500/40",
      progressColor: "bg-red-500",
      shadowColor: "shadow-red-500/10",
    },
    warning: {
      icon: <AlertCircle className="text-yellow-500 flex-shrink-0" size={24} />,
      bgColor: "bg-white dark:bg-gray-800",
      borderColor: "border-yellow-500/40",
      progressColor: "bg-yellow-500",
      shadowColor: "shadow-yellow-500/10",
    },
    info: {
      icon: <Info className="text-blue-500 flex-shrink-0" size={24} />,
      bgColor: "bg-white dark:bg-gray-800",
      borderColor: "border-blue-500/40",
      progressColor: "bg-blue-500",
      shadowColor: "shadow-blue-500/10",
    },
  };

  const currentConfig = config[type] || config.success;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative w-full sm:w-auto"
    >
      <div
        className={`${currentConfig.bgColor} border-2 ${currentConfig.borderColor} rounded-xl shadow-xl ${currentConfig.shadowColor} w-full sm:min-w-[360px] sm:max-w-[420px] overflow-hidden backdrop-blur-sm`}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100 dark:bg-gray-700">
          <div
            className={`h-full ${currentConfig.progressColor} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 pt-6">
          <div className="mt-0.5">{currentConfig.icon}</div>
          <p className="text-text text-base sm:text-sm flex-1 leading-relaxed font-medium">
            {message}
          </p>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose?.(), 300);
            }}
            className="text-text-muted hover:text-text flex-shrink-0 hover:scale-110 active:scale-95 transition-all p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mt-0.5"
            aria-label="Close notification"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
