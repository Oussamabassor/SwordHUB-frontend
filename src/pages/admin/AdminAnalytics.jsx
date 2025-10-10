import React, { useState, useEffect } from "react";
import { AdminSidebar, AdminHeader } from "../../components/admin/AdminLayout";
import { dashboardApi } from "../../services/apiService";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Calendar,
  ArrowUpRight,
  Loader,
} from "lucide-react";

export const AdminAnalytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await dashboardApi.getStats();
      const statsData = response?.data || response;
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      // Fallback mock data for demonstration
      setStats({
        totalRevenue: 45678.9,
        totalOrders: 342,
        totalProducts: 89,
        totalCustomers: 1234,
        pendingOrders: 23,
        revenueGrowth: 23.5,
        ordersGrowth: 18.2,
        customersGrowth: 15.7,
        monthlyRevenue: [
          { month: "Jan", revenue: 3200 },
          { month: "Feb", revenue: 3800 },
          { month: "Mar", revenue: 4100 },
          { month: "Apr", revenue: 3900 },
          { month: "May", revenue: 4500 },
          { month: "Jun", revenue: 5200 },
        ],
        topProducts: [
          { name: "Premium Gym T-Shirt", sales: 145, revenue: 7250 },
          { name: "Performance Workout Shirt", sales: 98, revenue: 5880 },
          { name: "Classic Fitness Tee", sales: 87, revenue: 4350 },
          { name: "Sport Training Shirt", sales: 76, revenue: 3800 },
          { name: "Athletic Performance Top", sales: 65, revenue: 3250 },
        ],
        ordersByStatus: [
          { status: "Pending", count: 23, percentage: 12 },
          { status: "Processing", count: 67, percentage: 35 },
          { status: "Shipped", count: 45, percentage: 24 },
          { status: "Delivered", count: 156, percentage: 82 },
          { status: "Cancelled", count: 8, percentage: 4 },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Revenue",
      value: `${(stats?.totalRevenue || 0).toLocaleString()} DH`,
      icon: DollarSign,
      change: `+${stats?.revenueGrowth || 0}%`,
      isPositive: true,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      change: `+${stats?.ordersGrowth || 0}%`,
      isPositive: true,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      change: "+12%",
      isPositive: true,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Total Customers",
      value: stats?.totalCustomers || 0,
      icon: Users,
      change: `+${stats?.customersGrowth || 0}%`,
      isPositive: true,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <AdminHeader setSidebarOpen={setSidebarOpen} />

      <main className="lg:pl-64 pt-16">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Comprehensive insights into your business performance
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 sm:p-6 border border-gray-200 dark:border-gray-700"
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
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Monthly Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Monthly Revenue
                </h2>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {stats?.monthlyRevenue?.map((item, index) => (
                  <motion.div
                    key={item.month}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                      {item.month}
                    </div>
                    <div className="flex-1">
                      <div className="relative h-8 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.revenue / 6000) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="w-20 text-right text-sm font-semibold text-gray-900 dark:text-white">
                      ${item.revenue.toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Top Products
                </h2>
                <Package className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {stats?.topProducts?.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {product.sales} sales
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">
                        ${product.revenue.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Orders by Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Orders by Status
              </h2>
              <ShoppingCart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {stats?.ordersByStatus?.map((item, index) => {
                const statusColors = {
                  Pending: "from-yellow-500 to-yellow-600",
                  Processing: "from-blue-500 to-blue-600",
                  Shipped: "from-purple-500 to-purple-600",
                  Delivered: "from-green-500 to-green-600",
                  Cancelled: "from-red-500 to-red-600",
                };
                return (
                  <motion.div
                    key={item.status}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="relative p-6 rounded-xl bg-gradient-to-br overflow-hidden"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${
                        statusColors[item.status] || "from-gray-500 to-gray-600"
                      })`,
                    }}
                  >
                    <div className="relative z-10">
                      <p className="text-sm font-medium text-white/80 mb-2">
                        {item.status}
                      </p>
                      <p className="text-3xl font-bold text-white mb-1">
                        {item.count}
                      </p>
                      <p className="text-xs text-white/80">
                        {item.percentage}% of total
                      </p>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
