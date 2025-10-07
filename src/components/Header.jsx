import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "training",
    name: "Training",
    subcategories: [
      "Performance T-Shirts",
      "Compression Fit",
      "Tank Tops",
      "Long Sleeve",
    ],
  },
  {
    id: "style",
    name: "Style",
    subcategories: [
      "Classic Fit",
      "Modern Cut",
      "Oversized",
      "Limited Edition",
    ],
  },
  {
    id: "material",
    name: "Material",
    subcategories: [
      "Dry-Fit",
      "Cotton Blend",
      "Performance Mesh",
      "Eco-Friendly",
    ],
  },
];

export function Header({ onCartClick, cartItemCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Main header */}
      <div className="container px-4 mx-auto lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left side - Logo and Menu button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-colors lg:hidden hover:bg-surface-alt rounded-xl"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-text" />
              ) : (
                <Menu className="w-6 h-6 text-text" />
              )}
            </button>

            <a
              href="/"
              className="flex items-center gap-2.5 flex-shrink-0 group"
            >
              <img
                src="/images/logo/sword-logo.png"
                alt="SwordHub Logo"
                className="object-contain w-8 h-8 transition-transform duration-200 lg:left-4 md:left-24 lg:w-9 lg:h-9"
                onError={(e) => {
                  console.log("Logo failed to load");
                  e.target.style.display = "none";
                }}
              />
              <h1 className="text-xl font-bold sm:text-2xl text-text whitespace-nowrap lg:ml-6 md:ml-8">
                SWORD<span className="text-primary">HUB</span>
              </h1>
            </a>
          </div>

          {/* Center - Navigation */}
          <nav className="items-center hidden gap-8 lg:flex">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative group"
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button className="flex items-center gap-1 px-1 py-2 transition-colors text-text hover:text-primary group">
                  {category.name}
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 text-text-muted group-hover:text-primary group-hover:-rotate-180" />
                </button>

                <AnimatePresence>
                  {activeCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 w-64 p-3 mt-1 border shadow-lg top-full bg-surface rounded-xl shadow-primary/5 border-primary/5 backdrop-blur-md"
                    >
                      <div className="grid gap-1">
                        {category.subcategories.map((sub, idx) => (
                          <a
                            key={idx}
                            href="#"
                            className="px-3 py-2 transition-colors rounded-lg text-text-muted hover:text-text hover:bg-surface-alt"
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="items-center hidden px-4 py-2 border md:flex bg-surface-alt rounded-xl border-primary/5">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 bg-transparent text-text placeholder-text-muted focus:outline-none lg:w-60"
              />
              <Search className="w-5 h-5 text-text-muted" />
            </div>

            {/* Theme Toggle */}
            {/* <ThemeToggle /> */}

            {/* User */}
            <button className="p-2 transition-colors hover:bg-surface-alt rounded-xl">
              <User className="w-6 h-6 text-text" />
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 transition-colors hover:bg-surface-alt rounded-xl"
            >
              <ShoppingBag className="w-6 h-6 text-text" />
              {cartItemCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full -top-1 -right-1 bg-primary text-background">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-surface/95 backdrop-blur-md border-t border-primary/5`}
      >
        <div className="container px-4 py-4 mx-auto">
          {/* Mobile search */}
          <div className="flex items-center px-4 py-2 mb-4 border bg-surface-alt rounded-xl border-primary/5">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-text placeholder-text-muted focus:outline-none"
            />
            <Search className="w-5 h-5 text-text-muted" />
          </div>

          {/* Mobile navigation */}
          <nav className="space-y-1">
            {categories.map((category) => (
              <div key={category.id} className="space-y-1">
                <button
                  className="flex items-center justify-between w-full px-3 py-2 transition-colors rounded-lg text-text hover:bg-surface-alt"
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === category.id ? null : category.id
                    )
                  }
                >
                  <span>{category.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-text-muted transition-transform duration-200 ${
                      activeCategory === category.id ? "-rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeCategory === category.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="py-1 pl-4 space-y-1">
                        {category.subcategories.map((sub, idx) => (
                          <a
                            key={idx}
                            href="#"
                            className="block px-3 py-2 transition-colors rounded-lg text-text-muted hover:text-text hover:bg-surface-alt"
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
