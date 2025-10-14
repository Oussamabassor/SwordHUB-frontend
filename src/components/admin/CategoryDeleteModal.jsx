import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Package, Trash2, Loader } from "lucide-react";

export const CategoryDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  category,
  products,
  loading,
}) => {
  const [showWarning, setShowWarning] = useState(false);
  const hasProducts = products && products.length > 0;

  useEffect(() => {
    if (isOpen && hasProducts) {
      // Show warning animation after a brief delay
      const timer = setTimeout(() => setShowWarning(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowWarning(false);
    }
  }, [isOpen, hasProducts]);

  if (!category) return null;

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
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4 border-b border-gray-200">
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  <div
                    className={`${
                      hasProducts ? "bg-red-50" : "bg-yellow-50"
                    } p-3 rounded-full flex-shrink-0`}
                  >
                    <AlertTriangle
                      className={`w-6 h-6 ${
                        hasProducts ? "text-red-500" : "text-yellow-500"
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {hasProducts
                        ? "Cannot Delete Category"
                        : "Delete Category"}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Category:{" "}
                      <span className="font-medium">{category.name}</span>
                    </p>
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

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader className="w-8 h-8 animate-spin text-gray-400" />
                  </div>
                ) : hasProducts ? (
                  <>
                    {/* Warning Message with Animation */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: showWarning ? 1 : 0,
                        x: showWarning ? 0 : -20,
                      }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6"
                    >
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-red-800 mb-1">
                            Category Contains Products
                          </h4>
                          <p className="text-sm text-red-700">
                            This category has {products.length} product
                            {products.length !== 1 ? "s" : ""}. You must delete
                            all products before deleting this category, or you
                            can delete them all at once.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Products List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Package className="w-5 h-5 text-gray-500" />
                          Products in this category ({products.length})
                        </h4>
                      </div>

                      <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                        {products.map((product, index) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                          >
                            {product.image && (
                              <img
                                src={`${
                                  import.meta.env.VITE_API_URL ||
                                  "http://localhost"
                                }${product.image}`}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.src = "/placeholder-product.jpg";
                                }}
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">
                                {product.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {product.price} DH • Stock: {product.stock || 0}
                              </p>
                            </div>
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Warning about deleting all */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg"
                    >
                      <p className="text-sm text-yellow-800">
                        ⚠️ <strong>Warning:</strong> Clicking "Delete All" will
                        permanently delete all {products.length} product
                        {products.length !== 1 ? "s" : ""} and the category.
                        This action cannot be undone.
                      </p>
                    </motion.div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-50 rounded-full mb-4">
                      <Package className="w-8 h-8 text-yellow-500" />
                    </div>
                    <p className="text-gray-600 mb-2">
                      This category has no products.
                    </p>
                    <p className="text-sm text-gray-500">
                      You can safely delete this category without affecting any
                      products.
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onConfirm(hasProducts);
                    onClose();
                  }}
                  disabled={loading}
                  className={`px-5 py-2.5 rounded-lg font-medium text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                    hasProducts
                      ? "bg-red-600 hover:bg-red-700 shadow-red-500/20"
                      : "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      Loading...
                    </span>
                  ) : hasProducts ? (
                    `Delete All (${products.length} products + category)`
                  ) : (
                    "Delete Category"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
