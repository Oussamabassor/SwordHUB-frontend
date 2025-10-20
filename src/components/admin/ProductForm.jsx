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
  const [imagePreview, setImagePreview] = useState(product?.image || "");
  const [additionalImages, setAdditionalImages] = useState(
    product?.images || []
  );
  const [uploadingImages, setUploadingImages] = useState(false);
  const [enableMultipleImages, setEnableMultipleImages] = useState(
    (product?.images?.length || 0) > 0
  );

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || "",
    stock: product?.stock || "",
    image: product?.image || "",
    images: product?.images || [],
    sizes: product?.sizes || [],
    featured: product?.featured || false,
  });

  useEffect(() => {
    fetchCategories();
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

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to server
      try {
        const result = await productsApi.uploadImage(file);
        setFormData((prev) => ({ ...prev, image: result.imageUrl }));
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image");
      }
    }
  };

  const handleAdditionalImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const result = await productsApi.uploadImage(file);
        uploadedUrls.push(result.imageUrl);
      }

      const newImages = [...additionalImages, ...uploadedUrls];
      setAdditionalImages(newImages);
      setFormData((prev) => ({ ...prev, images: newImages }));
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload some images");
    } finally {
      setUploadingImages(false);
    }
  };

  const removeAdditionalImage = (index) => {
    const newImages = additionalImages.filter((_, i) => i !== index);
    setAdditionalImages(newImages);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        images: enableMultipleImages ? formData.images : [],
      };

      if (product) {
        await productsApi.update(product.id, submitData);
      } else {
        await productsApi.create(submitData);
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
            {/* Main Product Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                📸 Main Product Image *
              </label>
              <div className="flex items-start space-x-4">
                {imagePreview && (
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-xl border-2 border-primary/30 shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        Main Image
                      </span>
                    </div>
                  </div>
                )}
                <label className="flex-1 flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                  <Upload size={32} className="mb-2 text-primary" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Click to upload main image
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Multiple Images Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  🖼️ Additional Images (Gallery)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enableMultipleImages"
                    checked={enableMultipleImages}
                    onChange={(e) => setEnableMultipleImages(e.target.checked)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label
                    htmlFor="enableMultipleImages"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    Enable multiple images
                  </label>
                </div>
              </div>

              {enableMultipleImages && (
                <div className="space-y-4">
                  {/* Image Grid */}
                  {additionalImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      {additionalImages.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Additional ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                          />
                          <button
                            type="button"
                            onClick={() => removeAdditionalImage(index)}
                            className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                          <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-black/60 text-white text-xs rounded">
                            #{index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  <label className="flex flex-col items-center justify-center px-6 py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                    {uploadingImages ? (
                      <>
                        <Loader
                          size={28}
                          className="mb-2 text-primary animate-spin"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Uploading images...
                        </span>
                      </>
                    ) : (
                      <>
                        <ImageIcon size={28} className="mb-2 text-primary" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Add more images
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          Select multiple files
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleAdditionalImagesChange}
                      className="hidden"
                      disabled={uploadingImages}
                    />
                  </label>
                </div>
              )}
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
