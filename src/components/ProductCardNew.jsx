import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star, ShoppingCart, Eye } from "lucide-react";
import { ImageWithLoader } from "./ImageWithLoader";

export function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Calculate discount percentage if there's a sale price
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    navigate(`/products/${product.id}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onClick={handleCardClick}
      className="relative overflow-hidden transition-all duration-300 border cursor-pointer group bg-surface/50 backdrop-blur-sm rounded-xl hover:shadow-2xl hover:shadow-primary/10 border-primary/5 hover:border-primary/20"
    >
      {/* Badges */}
      <div className="absolute z-10 flex items-center justify-between top-3 left-3 right-3">
        <div className="flex gap-2">
          {product.featured && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary text-background shadow-neon-green">
              Featured
            </span>
          )}
          {discount && (
            <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full shadow-lg shadow-red-500/20">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        {/* <button
          onClick={handleWishlist}
          className="p-2 transition-all rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <Heart
            size={16}
            className={`transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-light/60"
            }`}
          />
        </button> */}
      </div>

      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square bg-surface/30 view-bg">
        <ImageWithLoader
          src={product.image || "/images/placeholders/swordshirt.jpg"}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-background via-background/50 to-transparent group-hover:opacity-100">
          <div className="absolute flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
            <button
              onClick={handleQuickView}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all rounded-lg bg-primary text-background hover:shadow-neon-green"
            >
              <Eye size={16} />
              Quick View
            </button>
          </div>
        </div>

        {/* Stock Badge */}
        {product.stock !== undefined && product.stock < 5 && (
          <div className="absolute px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-lg bottom-3 right-3">
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Category */}
        <p className="text-xs font-medium uppercase text-primary">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-semibold leading-tight transition-colors line-clamp-2 text-light group-hover:text-primary">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }
            />
          ))}
          <span className="ml-1 text-xs text-light/60">(4.0)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-2">
          <span className="text-lg font-bold text-primary">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm line-through text-light/40">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button (Mobile) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/products/${product.id}`);
          }}
          className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-3 text-sm font-semibold transition-all rounded-lg bg-primary text-background hover:shadow-neon-green sm:opacity-0 sm:group-hover:opacity-100"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
