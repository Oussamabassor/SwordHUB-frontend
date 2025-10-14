import React, { useState, useEffect } from "react";
import { AdminSidebar, AdminHeader } from "../../components/admin/AdminLayout";
import { DataTable } from "../../components/admin/DataTable";
import { CategoryDeleteModal } from "../../components/admin/CategoryDeleteModal";
import { categoriesApi, productsApi } from "../../services/apiService";
import { Plus, X, Loader } from "lucide-react";
import { useToast } from "../../components/ToastProvider";

export const CategoriesManagement = () => {
  const showToast = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
    category: null,
    products: [],
    loadingProducts: false,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoriesApi.getAll();
      // Extract categories array from response
      const categoriesData =
        response?.data?.categories || response?.categories || [];
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (category) => {
    // Open modal and start loading products
    setConfirmDelete({
      isOpen: true,
      category,
      products: [],
      loadingProducts: true,
    });

    try {
      // Fetch products in this category
      const response = await productsApi.getAll({ category: category.id });
      const productsData = response?.data?.products || response?.products || [];

      setConfirmDelete((prev) => ({
        ...prev,
        products: productsData,
        loadingProducts: false,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      setConfirmDelete((prev) => ({
        ...prev,
        products: [],
        loadingProducts: false,
      }));
    }
  };

  const confirmDeleteAction = async (hasProducts) => {
    const { category, products } = confirmDelete;
    if (!category) return;

    try {
      if (hasProducts && products.length > 0) {
        // Delete all products first
        showToast(`Deleting ${products.length} products...`, "info", 2000);

        for (const product of products) {
          await productsApi.delete(product.id);
        }

        showToast(
          `${products.length} product${
            products.length !== 1 ? "s" : ""
          } deleted`,
          "success",
          2000
        );
      }

      // Then delete the category
      await categoriesApi.delete(category.id);
      showToast(
        `Category "${category.name}" deleted successfully`,
        "success",
        3000
      );
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      showToast("Failed to delete category. Please try again.", "error", 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      if (selectedCategory) {
        await categoriesApi.update(selectedCategory.id, formData);
        showToast(
          `Category "${formData.name}" updated successfully`,
          "success",
          3000
        );
      } else {
        await categoriesApi.create(formData);
        showToast(
          `Category "${formData.name}" created successfully`,
          "success",
          3000
        );
      }
      fetchCategories();
      handleCloseForm();
    } catch (error) {
      console.error("Error saving category:", error);
      showToast("Failed to save category. Please try again.", "error", 3000);
    } finally {
      setFormLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedCategory(null);
    setFormData({ name: "", description: "" });
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    {
      key: "productCount",
      label: "Products",
      render: (category) => category.productCount || 0,
    },
    {
      key: "createdAt",
      label: "Created",
      render: (category) => new Date(category.createdAt).toLocaleDateString(),
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
              Categories Management
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Add Category
            </button>
          </div>

          {/* Categories Table */}
          <DataTable
            columns={columns}
            data={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </main>

      {/* Category Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={handleCloseForm}
            ></div>

            <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 rounded-lg shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedCategory ? "Edit Category" : "Add New Category"}
                </h3>
                <button
                  onClick={handleCloseForm}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Category Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {formLoading && (
                      <Loader size={18} className="mr-2 animate-spin" />
                    )}
                    {selectedCategory ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Category Delete Modal */}
      <CategoryDeleteModal
        isOpen={confirmDelete.isOpen}
        onClose={() =>
          setConfirmDelete({
            isOpen: false,
            category: null,
            products: [],
            loadingProducts: false,
          })
        }
        onConfirm={confirmDeleteAction}
        category={confirmDelete.category}
        products={confirmDelete.products}
        loading={confirmDelete.loadingProducts}
      />
    </div>
  );
};
