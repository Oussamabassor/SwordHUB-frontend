import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export const ProductViewer = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate products
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
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
      className="relative w-full max-w-md mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated background glow that matches current product */}
      <motion.div
        key={`glow-${currentIndex}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tl from-secondary/20 via-transparent to-primary/20 blur-2xl" />
      </motion.div>

      {/* Main product display */}
      <div className="relative aspect-square">
        {/* Decorative elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-24 h-24 border-2 rounded-full -top-4 -right-4 border-primary/20 blur-sm"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-32 h-32 border-2 rounded-full -bottom-4 -left-4 border-primary/20 blur-sm"
        />

        {/* Product image container */}
        <div className="relative w-full h-full overflow-hidden border shadow-2xl rounded-2xl bg-gradient-to-br from-surface/80 to-surface/40 backdrop-blur-xl border-primary/20">
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
                src={images[currentIndex]}
                alt={`Product view ${currentIndex + 1}`}
                className="object-cover w-full h-full "
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

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

          {/* "New" badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute z-10 top-4 left-4"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-background text-xs font-bold rounded-full shadow-lg">
              <Sparkles size={14} />
              <span>NEW</span>
            </div>
          </motion.div>

          {/* Product count indicator */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-black/40 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Navigation buttons */}
        <motion.button
          onClick={prevImage}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="absolute z-20 p-3 text-white transition-all -translate-y-1/2 border rounded-full shadow-lg left-2 top-1/2 bg-black/30 backdrop-blur-md hover:bg-primary/80 border-white/20"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          onClick={nextImage}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="absolute z-20 p-3 text-white transition-all -translate-y-1/2 border rounded-full shadow-lg right-2 top-1/2 bg-black/30 backdrop-blur-md hover:bg-primary/80 border-white/20"
        >
          <ChevronRight size={24} />
        </motion.button>

        {/* Dots indicator */}
        <div className="absolute z-20 flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8 shadow-lg shadow-primary/50"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            </motion.button>
          ))}
        </div>

        {/* Auto-play indicator */}
        {!isPaused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-20 -translate-x-1/2 bottom-14 left-1/2"
          >
            <div className="px-3 py-1 text-xs text-white border rounded-full bg-black/40 backdrop-blur-md border-white/20">
              Auto-playing
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="h-1 mt-4 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </div>
  );
};
