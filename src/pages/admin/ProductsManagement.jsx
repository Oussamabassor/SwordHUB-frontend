import React, { useState, useEffect } from "react";
import { AdminSidebar, AdminHeader } from "../../components/admin/AdminLayout";
import { DataTable } from "../../components/admin/DataTable";
import { ProductForm } from "../../components/admin/ProductForm";
import { ConfirmationModal } from "../../components/admin/ConfirmationModal";
import { productsApi } from "../../services/apiService";
import { Plus, Search, Loader } from "lucide-react";
import { useToast } from "../../components/ToastProvider";

export const ProductsManagement = () => {
  const showToast = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
    product: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsApi.getAll({ search: searchTerm });
      console.log("Products API Response:", response);

      // Extract products array from response
      const productsData = response?.data?.products || response?.products || [];
      console.log("Extracted products data:", productsData);
      console.log("First product:", productsData[0]);

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

  const handleDelete = (product) => {
    setConfirmDelete({ isOpen: true, product });
  };

  const confirmDeleteAction = async () => {
    const product = confirmDelete.product;
    if (!product) return;

    try {
      await productsApi.delete(product.id);
      showToast(
        `Product "${product.name}" deleted successfully`,
        "success",
        3000
      );
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast("Failed to delete product. Please try again.", "error", 3000);
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
        // Get image URL - handle both arrays and single images
        let productImage = "/images/placeholders/swordshirt.jpg";

        if (
          product.images &&
          Array.isArray(product.images) &&
          product.images.length > 0
        ) {
          productImage = product.images[0];
        } else if (product.image) {
          productImage = product.image;
        }

        // Clean up the image URL if it has ./ in the path
        if (productImage && productImage.includes("/./")) {
          productImage = productImage.replace("/./", "/");
        }

        return (
          <img
            src={productImage}
            alt={product.name || "Product"}
            className="flex-shrink-0 object-cover w-10 h-10 border-2 rounded-lg shadow-sm md:w-12 md:h-12 lg:w-14 lg:h-14 border-primary/20"
            onError={(e) => {
              console.error(
                "Image load error for:",
                product.name,
                "URL:",
                e.target.src
              );
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "/images/placeholders/swordshirt.jpg";
            }}
          />
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete({ isOpen: false, product: null })}
        onConfirm={confirmDeleteAction}
        title="Delete Product"
        message={`Are you sure you want to delete "${confirmDelete.product?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};
