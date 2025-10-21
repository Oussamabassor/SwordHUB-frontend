import React, { useState, useEffect } from "react";
import { AdminSidebar, AdminHeader } from "../../components/admin/AdminLayout";
import { DataTable } from "../../components/admin/DataTable";
import { OrderDetailsModal } from "../../components/admin/OrderDetailsModal";
import { ConfirmationModal } from "../../components/admin/ConfirmationModal";
import { ordersApi } from "../../services/apiService";
import { Eye, Filter } from "lucide-react";
import { useToast } from "../../components/ToastProvider";

export const OrdersManagement = () => {
  const showToast = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderData, setSelectedOrderData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
    order: null,
  });

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersApi.getAll({ status: statusFilter });
      console.log("Orders Management API Response:", response);

      // Extract orders array from response: { success: true, data: { orders: [...], total } }
      const ordersData = response?.data?.orders || response?.orders || [];
      console.log("Extracted orders:", ordersData);
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (order, newStatus) => {
    try {
      await ordersApi.updateStatus(order.id, newStatus);
      showToast(`Order status updated to "${newStatus}"`, "success", 3000);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      showToast(
        "Failed to update order status. Please try again.",
        "error",
        3000
      );
    }
  };

  const handleView = (order) => {
    console.log("Opening order details for:", order);
    console.log("Order items from backend:", order.items);
    
    // Log each item to see what image data we have
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach((item, idx) => {
        console.log(`Item ${idx}:`, {
          name: item.productName || item.name,
          image: item.image,
          productImage: item.productImage,
          images: item.images
        });
      });
    }
    
    setSelectedOrderId(order.id || order._id);
    setSelectedOrderData({
      id: order.id || order._id,
      orderNumber: `#${(order.id || order._id).slice(-8).toUpperCase()}`,
      customerName: order.customerName || "Unknown",
      customerPhone: order.customerPhone || "N/A",
      customerAddress: order.customerAddress || "N/A",
      status: order.status || "pending",
      totalAmount: order.total || order.totalAmount || 0,
      createdAt: order.createdAt || new Date().toISOString(),
      items: (order.items || []).map(item => ({
        ...item,
        name: item.productName || item.name, // Ensure name is set
        // Make sure image field is properly set
        image: item.image || (item.images && item.images[0]) || item.productImage
      })),
      timeline: [
        { status: "placed", date: order.createdAt, completed: true },
        {
          status: "processing",
          date:
            order.status === "processing" ||
            order.status === "shipped" ||
            order.status === "delivered"
              ? order.createdAt
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
              ? order.createdAt
              : null,
          completed: order.status === "shipped" || order.status === "delivered",
        },
        {
          status: "delivered",
          date: order.status === "delivered" ? order.createdAt : null,
          completed: order.status === "delivered",
        },
      ],
    });
    setIsModalOpen(true);
  };

  const handleDelete = (order) => {
    setConfirmDelete({ isOpen: true, order });
  };

  const confirmDeleteAction = async () => {
    const order = confirmDelete.order;
    if (!order) return;

    try {
      await ordersApi.delete(order.id);
      showToast(`Order #${order.id} deleted successfully`, "success", 3000);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      showToast("Failed to delete order. Please try again.", "error", 3000);
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
    {
      key: "customerName",
      label: "Customer",
      render: (order) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {order.customerName}
          </div>
        </div>
      ),
    },
    {
      key: "customerPhone",
      label: "Phone",
      render: (order) => (
        <div className="text-sm text-gray-900 dark:text-white">
          {order.customerPhone || "N/A"}
        </div>
      ),
    },
    {
      key: "customerAddress",
      label: "Address",
      render: (order) => (
        <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
          {order.customerAddress || "N/A"}
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
      render: (order) => <span className="font-medium">{order.total} DH</span>,
    },
    {
      key: "createdAt",
      label: "Date",
      render: (order) => {
        const date = order.createdAt;
        if (!date) return "N/A";

        try {
          // Parse ISO date string from backend
          const parsedDate = new Date(date);

          // Verify it's a valid date
          if (isNaN(parsedDate.getTime())) {
            console.error("Invalid date for order:", order.id, date);
            return "Invalid Date";
          }

          return parsedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        } catch (error) {
          console.error("Error parsing date:", error, date);
          return "Invalid Date";
        }
      },
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
        onStatusUpdate={fetchOrders}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete({ isOpen: false, order: null })}
        onConfirm={confirmDeleteAction}
        title="Delete Order"
        message={`Are you sure you want to delete order #${confirmDelete.order?.id}? This action cannot be undone and all order data will be permanently removed.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};


export default OrdersManagement;
