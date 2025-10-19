import React, { useState, useEffect } from "react";
import { AdminSidebar, AdminHeader } from "../../components/admin/AdminLayout";
import { dashboardApi, ordersApi } from "../../services/apiService";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { OrderDetailsModal } from "../../components/admin/OrderDetailsModal";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  Loader,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  BarChart3,
} from "lucide-react";

export const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderData, setSelectedOrderData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchRecentOrders();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardApi.getStats();
      // Extract data from response
      const statsData = response?.data || response;
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const response = await ordersApi.getAll();
      console.log("Admin Dashboard Orders API Response:", response);

      // Backend returns: { success: true, data: { orders: [...], total, page, limit } }
      const ordersData = response?.data?.orders || response?.orders || [];
      console.log("Extracted orders data:", ordersData);

      // Get only the 5 most recent orders
      const recent = Array.isArray(ordersData)
        ? ordersData.slice(0, 5).map((order) => ({
            id: order._id || order.id,
            customer: order.customerName || "Unknown",
            amount: `${(order.total || order.totalAmount || 0).toFixed(2)} DH`,
            status: order.status || "pending",
            time: formatTimeAgo(order.createdAt || order.orderDate),
            items: order.items || [],
          }))
        : [];

      console.log("Recent orders to display:", recent);
      setRecentOrders(recent);
    } catch (error) {
      console.error("Error fetching recent orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInDays < 7)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  const statCards = [
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      change: "+12%",
      isPositive: true,
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
      change: "+23%",
      isPositive: true,
    },
    {
      title: "Total Revenue",
      value: `${stats?.totalRevenue || 0} DH`,
      icon: DollarSign,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      change: "+18%",
      isPositive: true,
    },
    {
      title: "Total Clients",
      value: stats?.totalClients || 0,
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      change: "+15%",
      isPositive: true,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "processing":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const openOrderDetails = async (order) => {
    try {
      // Fetch full order details from API to get real customer info
      const response = await ordersApi.getAll();
      const allOrders = response?.data?.orders || response?.orders || [];
      const fullOrderData = allOrders.find((o) => (o._id || o.id) === order.id);

      if (fullOrderData) {
        setSelectedOrderId(order.id);
        setSelectedOrderData({
          id: order.id,
          orderNumber: `#${order.id.slice(-8).toUpperCase()}`,
          customerName: fullOrderData.customerName || order.customer,
          customerPhone: fullOrderData.customerPhone || "N/A",
          customerAddress: fullOrderData.customerAddress || "N/A",
          status: order.status,
          totalAmount:
            fullOrderData.total ||
            fullOrderData.totalAmount ||
            parseFloat(order.amount.replace(" DH", "")),
          createdAt: fullOrderData.createdAt || new Date().toISOString(),
          items: fullOrderData.items || order.items || [],
          timeline: [
            {
              status: "placed",
              date: fullOrderData.createdAt,
              completed: true,
            },
            {
              status: "processing",
              date:
                order.status === "processing" ||
                order.status === "shipped" ||
                order.status === "delivered"
                  ? fullOrderData.createdAt
                  : null,
              completed:
                order.status === "processing" ||
                order.status === "shipped" ||
                order.status === "delivered",
            },
            {
              status: "shipped",
              date:
                order.status === "shipped" || order.status === "delivered"
                  ? fullOrderData.createdAt
                  : null,
              completed:
                order.status === "shipped" || order.status === "delivered",
            },
            {
              status: "delivered",
              date:
                order.status === "delivered" ? fullOrderData.createdAt : null,
              completed: order.status === "delivered",
            },
          ],
        });
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <AdminHeader setSidebarOpen={setSidebarOpen} />

      <main className="pt-16 lg:pl-64">
        <div className="p-4 mx-auto sm:p-6 lg:p-8 max-w-7xl">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              Dashboard Overview
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-5 transition-all duration-300 bg-white border border-gray-200 shadow-sm group dark:bg-gray-800 rounded-xl hover:shadow-lg sm:p-6 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`${stat.bgColor} p-3 rounded-xl transition-transform group-hover:scale-110 duration-300`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-semibold ${
                      stat.isPositive
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.isPositive ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-gray-200 shadow-sm lg:col-span-2 dark:bg-gray-800 rounded-xl dark:border-gray-700"
            >
              <div className="p-5 border-b border-gray-200 sm:p-6 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
                    Recent Orders
                  </h2>
                  <button
                    onClick={() => navigate("/admin/orders")}
                    className="flex items-center gap-1 text-sm font-medium transition-colors text-primary hover:text-primary-hover"
                  >
                    View All
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : recentOrders.length === 0 ? (
                  <div className="py-12 text-center">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No orders yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center justify-between p-4 transition-colors rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900"
                        onClick={() => openOrderDetails(order)}
                      >
                        <div className="flex items-center flex-1 min-w-0 gap-4">
                          <div
                            className={`p-2 rounded-lg ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white sm:text-base">
                              Order #{order.id.slice(-8)}
                            </p>
                            <p className="text-xs text-gray-600 truncate sm:text-sm dark:text-gray-400">
                              {order.customer}
                            </p>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
                            {order.amount}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {order.time}
                          </p>
                        </div>
                        <button
                          className="p-2 ml-2 transition-colors rounded-lg sm:ml-4 hover:bg-gray-200 dark:hover:bg-gray-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            openOrderDetails(order);
                          }}
                        >
                          <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700"
            >
              <div className="p-5 border-b border-gray-200 sm:p-6 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
                  Quick Actions
                </h2>
              </div>
              <div className="p-4 space-y-3 sm:p-6">
                <button
                  onClick={() => navigate("/admin/products")}
                  className="flex items-center w-full gap-3 p-4 transition-colors rounded-lg bg-primary/10 hover:bg-primary/20 text-primary group"
                >
                  <Package className="w-5 h-5" />
                  <span className="font-medium">Add New Product</span>
                  <ArrowUpRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
                <button
                  onClick={() => navigate("/admin/orders")}
                  className="flex items-center w-full gap-3 p-4 text-gray-900 transition-colors bg-gray-100 rounded-lg dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white group"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium">View Orders</span>
                  <ArrowUpRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
                <button
                  onClick={() => navigate("/admin/analytics")}
                  className="flex items-center w-full gap-3 p-4 text-gray-900 transition-colors bg-gray-100 rounded-lg dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white group"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">View Analytics</span>
                  <ArrowUpRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrderId(null);
          setSelectedOrderData(null);
        }}
        orderId={selectedOrderId}
        orderData={selectedOrderData}
        onStatusUpdate={fetchRecentOrders}
      />
    </div>
  );
};


export default AdminDashboard;
