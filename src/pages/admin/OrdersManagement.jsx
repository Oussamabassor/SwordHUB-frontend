import React, { useState, useEffect } from "react";
import { AdminSidebar, AdminHeader } from "../../components/admin/AdminLayout";
import { DataTable } from "../../components/admin/DataTable";
import { ordersApi } from "../../services/apiService";
import { Eye, Filter } from "lucide-react";

export const OrdersManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await ordersApi.getAll({ status: statusFilter });
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (order, newStatus) => {
    try {
      await ordersApi.updateStatus(order.id, newStatus);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  const handleView = (order) => {
    // Implement order detail view
    alert(`View order details for order #${order.id}`);
  };

  const handleDelete = async (order) => {
    if (window.confirm(`Are you sure you want to delete order #${order.id}?`)) {
      try {
        await ordersApi.delete(order.id);
        fetchOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("Failed to delete order");
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
      processing:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      shipped:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
      delivered:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
    };

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          statusColors[status] || statusColors.pending
        }`}
      >
        {status}
      </span>
    );
  };

  const columns = [
    { key: "id", label: "Order ID" },
    {
      key: "customerName",
      label: "Customer",
      render: (order) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {order.customerName}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {order.customerEmail}
          </div>
        </div>
      ),
    },
    {
      key: "items",
      label: "Items",
      render: (order) => order.items?.length || 0,
    },
    {
      key: "total",
      label: "Total",
      render: (order) => <span className="font-medium">${order.total}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (order) => (
        <select
          value={order.status}
          onChange={(e) => handleStatusChange(order, e.target.value)}
          className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (order) => new Date(order.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <AdminHeader setSidebarOpen={setSidebarOpen} />

      <main className="lg:pl-64 pt-16">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
              Orders Management
            </h1>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <DataTable
            columns={columns}
            data={orders}
            onView={handleView}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
};
