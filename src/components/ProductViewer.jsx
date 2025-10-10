import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MousePointerClick,
} from "lucide-react";

export const ProductViewer = ({ products = [], onProductClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Backward compatibility: if products is an array of strings (old images prop)
  const items =
    products.length > 0 && typeof products[0] === "string"
      ? products.map((img, idx) => ({
          id: idx,
          name: `Product ${idx + 1}`,
          image: img,
        }))
      : products;

  // Auto-rotate products
  useEffect(() => {
    if (isPaused || items.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [items.length, isPaused]);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center w-full max-w-md mx-auto aspect-square">
        <p className="text-text-muted">No products available</p>
      </div>
    );
  }

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleProductClick = () => {
    if (onProductClick && items[currentIndex]) {
      onProductClick(items[currentIndex].id);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Modern subtle background glow */}
      <motion.div
        key={`glow-${currentIndex}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-3xl" />
      </motion.div>

      {/* Main product display */}
      <div className="relative aspect-[4/5] sm:aspect-[16/10]">
        {/* Modern minimalist decorative corners */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-l-2 border-primary/30 rounded-bl-2xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-r-2 border-primary/30 rounded-br-2xl"
        />

        {/* Product image container */}
        <div
          className="relative w-full h-full overflow-hidden border shadow-2xl cursor-pointer rounded-2xl bg-gradient-to-br from-surface/90 to-surface/60 backdrop-blur-xl border-primary/20 group"
          onClick={handleProductClick}
        >
          {/* Modern sleek click indicator overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 z-30 flex items-center justify-center transition-opacity bg-gradient-to-b from-background/80 via-background/90 to-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              whileHover={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="p-4 sm:p-6 rounded-full bg-primary/20 backdrop-blur-sm"
              >
                <MousePointerClick
                  size={48}
                  className="sm:w-14 sm:h-14 text-primary drop-shadow-2xl"
                  strokeWidth={2}
                />
              </motion.div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-light drop-shadow-lg">
                  View Product
                </p>
                <p className="mt-2 text-xs sm:text-sm font-medium text-primary">
                  Click to explore details
                </p>
              </div>
            </motion.div>
          </motion.div>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
                rotateY: { duration: 0.6 },
              }}
              className="absolute inset-0 view-bg"
              style={{ perspective: "1000px" }}
            >
              <img
                src={items[currentIndex].image}
                alt={items[currentIndex].name}
                className="object-contain w-full h-full p-4 sm:p-8"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />

              {/* Shimmer effect on image change */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{ pointerEvents: "none" }}
              />
            </motion.div>
          </AnimatePresence>

          {/* "New" badge - Modern minimalist */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="absolute z-10 top-4 sm:top-6 left-4 sm:left-6"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-background text-[10px] sm:text-xs font-bold rounded-lg shadow-xl border-2 border-primary/20 backdrop-blur-sm">
              <Sparkles
                size={12}
                className="sm:w-3.5 sm:h-3.5"
                strokeWidth={3}
              />
              <span className="tracking-wide">NEW ARRIVAL</span>
            </div>
          </motion.div>

          {/* Product count indicator - Sleek modern */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-background/80 backdrop-blur-md text-light text-xs sm:text-sm font-semibold rounded-lg border border-primary/30 shadow-lg">
            <span className="text-primary font-bold">{currentIndex + 1}</span>
            <span className="mx-1 sm:mx-1.5 text-light/40">/</span>
            <span className="text-light/70">{items.length}</span>
          </div>

          {/* Product name overlay - Modern card style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute z-10 bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6"
          >
            <div className="p-3 sm:p-4 bg-surface/95 backdrop-blur-xl rounded-xl border border-primary/20 shadow-2xl">
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-base sm:text-lg font-bold text-light truncate">
                    {items[currentIndex].name}
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-medium text-primary">
                      Featured Collection
                    </span>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-1.5 sm:p-2 rounded-lg bg-primary/10 border border-primary/30"
                >
                  <Sparkles size={14} className="sm:w-4 sm:h-4 text-primary" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation buttons - Modern sleek design */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.95 }}
          className="absolute z-20 p-2 sm:p-3 text-light transition-all -translate-y-1/2 border rounded-lg sm:rounded-xl shadow-xl left-1 sm:-left-4 top-1/2 bg-surface/90 backdrop-blur-lg hover:bg-primary hover:text-background border-primary/30 hover:border-primary/50 hover:shadow-primary/20"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
        </motion.button>
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.95 }}
          className="absolute z-20 p-2 sm:p-3 text-light transition-all -translate-y-1/2 border rounded-lg sm:rounded-xl shadow-xl right-1 sm:-right-4 top-1/2 bg-surface/90 backdrop-blur-lg hover:bg-primary hover:text-background border-primary/30 hover:border-primary/50 hover:shadow-primary/20"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
        </motion.button>

        {/* Dots indicator - Modern minimalist */}
        <div className="absolute z-20 flex gap-1.5 sm:gap-2 -translate-x-1/2 bottom-16 sm:bottom-20 left-1/2">
          {items.map((_, index) => (
            <motion.button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-6 sm:w-8 h-1.5 sm:h-2 shadow-lg shadow-primary/50"
                    : "bg-light/30 hover:bg-light/50 w-1.5 sm:w-2 h-1.5 sm:h-2"
                }`}
              />
            </motion.button>
          ))}
        </div>

        {/* Auto-play indicator - Subtle */}
        {!isPaused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-20 px-3 py-1 -translate-x-1/2 rounded-full top-6 left-1/2 bg-background/80 backdrop-blur-md border border-primary/30"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-light/70">
                Auto-playing
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom accent - Minimalist */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="h-0.5 mt-6 rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
    </div>
  );
};
