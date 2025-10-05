import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ProductViewer = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-md aspect-square">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full h-full overflow-hidden rounded-xl bg-surface/50 backdrop-blur-sm"
      >
        <img
          src={images[currentIndex]}
          alt={`Product view ${currentIndex + 1}`}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </motion.div>

      {/* Navigation buttons */}
      <button
        onClick={prevImage}
        className="absolute p-2 text-white transition-colors -translate-y-1/2 rounded-full left-2 top-1/2 bg-black/20 backdrop-blur-sm hover:bg-black/40"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextImage}
        className="absolute p-2 text-white transition-colors -translate-y-1/2 rounded-full right-2 top-1/2 bg-black/20 backdrop-blur-sm hover:bg-black/40"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots indicator */}
      <div className="absolute flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
