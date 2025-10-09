import React, { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { productsApi } from "../services/apiService";
import { useToast } from "./ToastProvider";

export function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsApi.getAll();
      // Extract products array from response
      const productsData = response?.data?.products || response?.products || [];
      setProducts(productsData);
    } catch (err) {
      console.error("Error fetching products:", err);
      const errorMessage = "Failed to load products. Please try again later.";
      setError(errorMessage);
      showToast(errorMessage, "error", 5000);
      // Fallback to empty array or sample data
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <section id="products-section" className="bg-background">
        <div className="container px-4 py-12 mx-auto">
          {/* Retry button in center */}
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-50 dark:bg-red-900/20">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-text">
                Unable to Load Products
              </h3>
              <p className="mb-6 text-text-muted">
                Something went wrong. Please try again.
              </p>
            </div>
            <button
              onClick={fetchProducts}
              className="inline-flex items-center gap-2 px-6 py-3 font-medium text-white transition-all duration-200 rounded-lg shadow-sm bg-primary hover:bg-primary-hover hover:scale-105 active:scale-95"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Retry Loading
            </button>
          </div>

          {/* Skeleton loading grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products-section" className="bg-background">
      <div className="container px-4 py-12 mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No products available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ............................
