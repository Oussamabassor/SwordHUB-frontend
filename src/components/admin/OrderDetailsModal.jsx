import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Package,
  User,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  XCircle,
  ShoppingBag,
} from "lucide-react";
import { ordersApi } from "../../services/apiService";
import { useToast } from "../ToastProvider";

export const OrderDetailsModal = ({
  isOpen,
  onClose,
  orderId,
  orderData,
  onStatusUpdate,
}) => {
  const showToast = useToast();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && orderData) {
      // If orderData is provided, use it directly
      setOrder(orderData);
      setLoading(false);
    } else if (isOpen && orderId) {
      // Otherwise fetch from API
      fetchOrderDetails();
    }
  }, [isOpen, orderId, orderData]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleStatusChange = async (newStatus) => {
    try {
      await ordersApi.updateStatus(orderId, newStatus);
      setOrder({ ...order, status: newStatus });
      showToast(`Order status updated to "${newStatus}"`, "success", 3000);
      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      showToast(
        "Failed to update order status. Please try again.",
        "error",
        3000
      );
    }
  };

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      // Fetch order details from API
      // const response = await ordersApi.getById(orderId);
      // setOrder(response.data);

      // Temporary mock data for demonstration
      setOrder({
        id: orderId,
        orderNumber: `#${orderId.slice(-8).toUpperCase()}`,
        customerName: "John Doe",
        customerPhone: "+1 234 567 8900",
        customerAddress: "123 Main Street, Apt 4B, New York, NY 10001",
        status: "processing",
        totalAmount: 299.99,
        createdAt: new Date().toISOString(),
        items: [
          {
            id: "1",
            name: "Premium Gym T-Shirt",
            size: "L",
            quantity: 2,
            price: 49.99,
            image: "/images/placeholders/swordshirt.jpg",
          },
          {
            id: "2",
            name: "Performance Workout Shirt",
            size: "M",
            quantity: 1,
            price: 59.99,
            image: "/images/placeholders/swordshirt2.jpg",
          },
        ],
        timeline: [
          {
            status: "placed",
            date: new Date(Date.now() - 86400000 * 2).toISOString(),
            completed: true,
          },
          {
            status: "processing",
            date: new Date(Date.now() - 86400000).toISOString(),
            completed: true,
          },
          { status: "shipped", date: null, completed: false },
          { status: "delivered", date: null, completed: false },
        ],
      });
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        icon: Clock,
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        label: "Pending",
      },
      processing: {
        icon: Package,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-100 dark:bg-blue-900/30",
        label: "Processing",
      },
      shipped: {
        icon: Truck,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-100 dark:bg-purple-900/30",
        label: "Shipped",
      },
      delivered: {
        icon: CheckCircle,
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-100 dark:bg-green-900/30",
        label: "Delivered",
      },
      cancelled: {
        icon: XCircle,
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-100 dark:bg-red-900/30",
        label: "Cancelled",
      },
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Pending";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl my-8 bg-white rounded-2xl shadow-2xl dark:bg-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="p-3 rounded-xl bg-primary/10"
                  >
                    <ShoppingBag className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Order Details
                    </h2>
                    {!loading && order && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {order.orderNumber}
                      </p>
                    )}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-12 h-12 border-4 border-t-transparent rounded-full border-primary animate-spin"></div>
                  </div>
                ) : order ? (
                  <div className="space-y-6">
                    {/* Status and Customer Info Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {/* Current Status */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-5 border rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border-gray-200 dark:border-gray-700"
                      >
                        <h3 className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          <Package className="w-4 h-4" />
                          Order Status
                        </h3>
                        {(() => {
                          const config = getStatusConfig(order.status);
                          return (
                            <>
                              <div
                                className={`flex items-center gap-3 p-4 rounded-lg ${config.bgColor} mb-3`}
                              >
                                <config.icon
                                  className={`w-8 h-8 ${config.color}`}
                                />
                                <div>
                                  <p
                                    className={`text-lg font-bold ${config.color}`}
                                  >
                                    {config.label}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Updated {formatDate(order.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  handleStatusChange(e.target.value)
                                }
                                className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </>
                          );
                        })()}
                      </motion.div>

                      {/* Customer Information */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-5 border rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border-gray-200 dark:border-gray-700"
                      >
                        <h3 className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                          <User className="w-4 h-4" />
                          Customer Details
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <User className="w-5 h-5 mt-0.5 text-gray-500 dark:text-gray-400" />
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {order.customerName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 mt-0.5 text-gray-500 dark:text-gray-400" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {order.customerPhone}
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 mt-0.5 text-gray-500 dark:text-gray-400" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {order.customerAddress}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Order Items */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-5 border rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Package className="w-4 h-4" />
                        Order Items ({order.items.length})
                      </h3>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <motion.div
                            key={item.id || index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="flex items-center gap-4 p-4 transition-colors bg-white rounded-lg dark:bg-gray-800 hover:shadow-md"
                          >
                            <div className="flex-shrink-0 w-16 h-16 overflow-hidden border-2 rounded-lg border-primary/20">
                              <img
                                src={(() => {
                                  // Handle multiple images array or single image
                                  const imageSource =
                                    item.images &&
                                    Array.isArray(item.images) &&
                                    item.images.length > 0
                                      ? item.images[0] // First image from array
                                      : item.image; // Fallback to single image

                                  if (!imageSource)
                                    return "/placeholder-product.jpg";

                                  // If it's already a full URL, use it
                                  if (imageSource.startsWith("http"))
                                    return imageSource;

                                  // Otherwise, construct the URL
                                  return `${
                                    import.meta.env.VITE_API_URL ||
                                    "http://localhost:5000"
                                  }${imageSource}`;
                                })()}
                                alt={item.name}
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                  e.target.src = "/placeholder-product.jpg";
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.size ? (
                                  <>
                                    <span className="font-medium">Size:</span>{" "}
                                    {item.size} •{" "}
                                  </>
                                ) : null}
                                <span className="font-medium">Qty:</span>{" "}
                                {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">
                                {(item.price * item.quantity).toFixed(2)} DH
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.price.toFixed(2)} DH each
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-300 dark:border-gray-600">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          Total Amount
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {(order.totalAmount || order.total || 0).toFixed(2)}{" "}
                          DH
                        </p>
                      </div>
                    </motion.div>

                    {/* Order Timeline */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="p-5 border rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border-gray-200 dark:border-gray-700"
                    >
                      <h3 className="flex items-center gap-2 mb-6 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Calendar className="w-4 h-4" />
                        Order Timeline
                      </h3>
                      <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

                        {order.timeline.map((step, index) => {
                          const config = getStatusConfig(step.status);
                          return (
                            <motion.div
                              key={step.status}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + index * 0.1 }}
                              className="relative flex items-start gap-4 pb-6 last:pb-0"
                            >
                              {/* Timeline dot */}
                              <div
                                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                                  step.completed
                                    ? config.bgColor
                                    : "bg-gray-200 dark:bg-gray-700"
                                }`}
                              >
                                <config.icon
                                  className={`w-4 h-4 ${
                                    step.completed
                                      ? config.color
                                      : "text-gray-400"
                                  }`}
                                />
                              </div>

                              <div className="flex-1 pt-1">
                                <p
                                  className={`font-semibold ${
                                    step.completed
                                      ? "text-gray-900 dark:text-white"
                                      : "text-gray-400 dark:text-gray-500"
                                  }`}
                                >
                                  {config.label}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {formatDate(step.date)}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                    Order not found
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-6 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors font-medium"
                >
                  Print Receipt
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
