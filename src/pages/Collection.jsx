import React, { useState } from "react";
import { ProductCard } from "../components/ProductCardNew";
import { ChevronDown, SlidersHorizontal, Grid2x2, List } from "lucide-react";

const filters = {
  category: ["Training", "Running", "Basketball", "Soccer"],
  size: ["XS", "S", "M", "L", "XL", "2XL"],
  color: ["Black", "White", "Blue", "Green", "Red"],
  brand: ["Nike", "Adidas", "Under Armour", "Puma"],
  price: ["Under $50", "$50 - $100", "$100 - $200", "Over $200"],
};

const products = [
  {
    id: 1,
    name: "Pro Performance T-Shirt",
    price: 49.99,
    category: "Training",
    image: "/products/tshirt-1.jpg",
  },
  // Add more products...
];

const sortOptions = [
  { value: "newest", label: "Newest Arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export function Collection() {
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState("newest");
  const [isGridView, setIsGridView] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Training Apparel</h1>
          <p className="text-neutral max-w-2xl mx-auto">
            High-performance training gear designed to help you achieve your
            fitness goals
          </p>
        </div>

        {/* Mobile filters button */}
        <button
          className="md:hidden w-full bg-surface text-light py-3 rounded-lg mb-4 flex items-center justify-center gap-2"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <SlidersHorizontal size={20} />
          Filter & Sort
        </button>

        <div className="flex gap-8">
          {/* Filters sidebar */}
          <div
            className={`${
              isMobileFiltersOpen
                ? "fixed inset-0 z-50 bg-background p-4"
                : "hidden"
            } md:block md:w-64 space-y-6`}
          >
            {isMobileFiltersOpen && (
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-neutral hover:text-light transition-colors"
                >
                  ✕
                </button>
              </div>
            )}

            {Object.entries(filters).map(([category, options]) => (
              <div key={category} className="border-b border-accent pb-4">
                <h3 className="text-light font-semibold mb-3 capitalize">
                  {category}
                </h3>
                <div className="space-y-2">
                  {options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-neutral hover:text-light cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={activeFilters[category]?.includes(option)}
                        onChange={() => {
                          setActiveFilters((prev) => ({
                            ...prev,
                            [category]: prev[category]?.includes(option)
                              ? prev[category].filter((item) => item !== option)
                              : [...(prev[category] || []), option],
                          }));
                        }}
                        className="rounded border-accent text-primary focus:ring-primary bg-transparent"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Sort and view options */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface text-light border border-accent rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => setIsGridView(true)}
                    className={`p-2 rounded ${
                      isGridView ? "text-primary" : "text-neutral"
                    }`}
                  >
                    <Grid2x2 size={20} />
                  </button>
                  <button
                    onClick={() => setIsGridView(false)}
                    className={`p-2 rounded ${
                      !isGridView ? "text-primary" : "text-neutral"
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              <p className="text-neutral">
                Showing <span className="text-light">{products.length}</span>{" "}
                products
              </p>
            </div>

            {/* Product grid */}
            <div
              className={`grid gap-6 ${
                isGridView
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
