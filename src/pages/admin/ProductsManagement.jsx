import React, { useState, useEffect } from "react";
import { AdminSidebar, AdminHeader } from "../../components/admin/AdminLayout";
import { DataTable } from "../../components/admin/DataTable";
import { ProductForm } from "../../components/admin/ProductForm";
import { productsApi } from "../../services/apiService";
import { Plus, Search, Loader } from "lucide-react";

export const ProductsManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsApi.getAll({ search: searchTerm });
      // Extract products array from response
      const productsData = response?.data?.products || response?.products || [];
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await productsApi.delete(product.id);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (product) => {
        const productImage =
          (product.images && product.images[0]) ||
          product.image ||
          "/images/placeholders/swordshirt.jpg";
        return (
          <div className="flex items-center">
            <img
              src={productImage}
              alt={product.name}
              className="flex-shrink-0 object-cover w-12 h-12 border-2 rounded-lg shadow-sm border-primary/20"
              onError={(e) => {
                e.target.src = "/images/placeholders/swordshirt.jpg";
              }}
            />
          </div>
        );
      },
    },
    {
      key: "name",
      label: "Name",
      render: (product) => (
        <div className="max-w-xs text-sm font-medium text-gray-900 truncate dark:text-white">
          {product.name}
        </div>
      ),
    },
    { key: "category", label: "Category" },
    {
      key: "price",
      label: "Price",
      render: (product) => <span>{product.price} DH</span>,
    },
    { key: "stock", label: "Stock" },
    {
      key: "featured",
      label: "Featured",
      render: (product) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            product.featured
              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {product.featured ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <AdminHeader setSidebarOpen={setSidebarOpen} />

      <main className="pt-16 lg:pl-64">
        <div className="p-6 mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col mb-6 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:mb-0">
              Products Management
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center px-4 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark"
            >
              <Plus size={20} className="mr-2" />
              Add Product
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search
                className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && fetchProducts()}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Products Table */}
          <DataTable
            columns={columns}
            data={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </main>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={selectedProduct}
          onClose={handleFormClose}
          onSuccess={fetchProducts}
        />
      )}
    </div>
  );
};
