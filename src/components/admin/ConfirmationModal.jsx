import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "danger", // danger, warning, info
}) => {
  const typeStyles = {
    danger: {
      icon: "text-red-500",
      button: "bg-red-500 hover:bg-red-600",
      iconBg: "bg-red-50",
    },
    warning: {
      icon: "text-yellow-500",
      button: "bg-yellow-500 hover:bg-yellow-600",
      iconBg: "bg-yellow-50",
    },
    info: {
      icon: "text-blue-500",
      button: "bg-blue-500 hover:bg-blue-600",
      iconBg: "bg-blue-50",
    },
  };

  const styles = typeStyles[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with close button */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  <div
                    className={`${styles.iconBg} p-3 rounded-full flex-shrink-0`}
                  >
                    <AlertTriangle className={`w-6 h-6 ${styles.icon}`} />
                  </div>

                  {/* Title */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Message */}
              <div className="px-6 pb-6">
                <p className="text-gray-600 leading-relaxed pl-[52px]">
                  {message}
                </p>
              </div>

              {/* Actions */}
              <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  {cancelText}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`px-5 py-2.5 rounded-lg font-medium text-white ${styles.button} transition-all shadow-lg shadow-red-500/20`}
                >
                  {confirmText}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
