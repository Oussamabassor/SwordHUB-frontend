import React, { useState, useEffect } from "react";
import {
  X,
  Upload,
  Loader,
  Image as ImageIcon,
  Trash2,
  Check,
} from "lucide-react";
import { productsApi, categoriesApi } from "../../services/apiService";

export const ProductForm = ({ product, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [allImages, setAllImages] = useState(product?.images || []);
  const [uploadingImages, setUploadingImages] = useState(false);

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || "",
    stock: product?.stock || "",
    images: product?.images || [],
    sizes: product?.sizes || [],
    featured: product?.featured || false,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.getAll();
      const categoriesData =
        response?.data?.categories || response?.categories || [];
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => {
      const sizes = prev.sizes || [];
      const newSizes = sizes.includes(size)
        ? sizes.filter((s) => s !== size)
        : [...sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const result = await productsApi.uploadImage(file);
        uploadedUrls.push(result.imageUrl);
      }

      const newImages = [...allImages, ...uploadedUrls];
      setAllImages(newImages);
      setFormData((prev) => ({ ...prev, images: newImages }));
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload some images");
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index) => {
    const newImages = allImages.filter((_, i) => i !== index);
    setAllImages(newImages);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (product) {
        await productsApi.update(product.id, formData);
      } else {
        await productsApi.create(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      alert(error.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary/10 to-secondary/10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {product ? "✏️ Edit Product" : "➕ Add New Product"}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto"
          >
            {/* Product Images - Multiple Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                📸 Product Images * (First image will be the main image)
              </label>

              {/* Images Grid */}
              {allImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  {allImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
                      />
                      {index === 0 && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-background text-xs font-bold rounded-full shadow-lg">
                          ⭐ Main
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded font-medium">
                        #{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              <label className="flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                {uploadingImages ? (
                  <>
                    <Loader
                      size={32}
                      className="mb-3 text-primary animate-spin"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Uploading images...
                    </span>
                  </>
                ) : (
                  <>
                    <Upload size={32} className="mb-3 text-primary" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {allImages.length === 0
                        ? "Upload product images"
                        : "Add more images"}
                    </span>
                    <span className="text-xs text-gray-500">
                      Click to select multiple files (PNG, JPG)
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  className="hidden"
                  disabled={uploadingImages}
                />
              </label>
            </div>

            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                📦 Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Premium Cotton T-Shirt"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                📝 Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Describe your product features, materials, and benefits..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
              />
            </div>

            {/* Available Sizes */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                📏 Available Sizes * (Select all that apply)
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                {availableSizes.map((size) => {
                  const isSelected = formData.sizes?.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`relative px-4 py-3 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 ${
                        isSelected
                          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {size}
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {formData.sizes?.length === 0 && (
                <p className="text-xs text-red-500 mt-2">
                  ⚠️ Please select at least one size
                </p>
              )}
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  💰 Price (DH) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  📦 Stock Quantity *
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                🏷️ Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured */}
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/20">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                ⭐ Mark as Featured Product (will appear on homepage)
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || formData.sizes?.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all transform hover:scale-105 active:scale-95"
              >
                {loading && <Loader size={18} className="mr-2 animate-spin" />}
                {product ? "💾 Update Product" : "✨ Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
