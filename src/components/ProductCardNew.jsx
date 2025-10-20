import React, { useState, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star, ShoppingCart, Eye } from "lucide-react";
import { ImageWithLoader } from "./ImageWithLoader";

export const ProductCard = memo(({ product }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Safety check for product
  if (!product) {
    console.warn("ProductCard received undefined product");
    return null;
  }

  // Memoize computed values to prevent recalculation on re-renders
  const productImage = useMemo(
    () =>
      (product.images && product.images[0]) ||
      product.image ||
      "/images/placeholders/swordshirt.jpg",
    [product.images, product.image]
  );

  const discount = useMemo(
    () =>
      product.originalPrice
        ? Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) *
              100
          )
        : null,
    [product.originalPrice, product.price]
  );

  const isOutOfStock = useMemo(() => product.stock === 0, [product.stock]);
  const isLowStock = useMemo(
    () => product.stock > 0 && product.stock < 10,
    [product.stock]
  );

  const handleCardClick = () => {
    // Allow navigation even if out of stock (user can view details, just can't order)
    navigate(`/products/${product.id}`, { state: { from: "products" } });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    // Allow navigation even if out of stock
    navigate(`/products/${product.id}`, { state: { from: "products" } });
  };

  // Reduce animations - only animate on initial mount, not on hover for mobile performance
  const cardVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    }),
    []
  );

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className="product-card relative flex flex-col overflow-hidden transition-all duration-300 border cursor-pointer group bg-surface/50 backdrop-blur-sm rounded-xl hover:shadow-xl hover:shadow-primary/20 border-primary/10 hover:border-primary/30 hover:bg-surface/70 view-container"
      style={{ willChange: "transform" }}
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 blur-xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>

      {/* Badges */}
      <div className="absolute z-10 flex items-center justify-between top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3">
        <div className="flex gap-1.5 sm:gap-2">
          {product.featured && (
            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-primary text-background shadow-neon-green">
              Featured
            </span>
          )}
          {discount && (
            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-semibold text-white bg-red-500 rounded-full shadow-lg shadow-red-500/20">
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
      <div className="relative overflow-hidden aspect-[3/4] lg:aspect-[4/5] bg-surface/10 view-bg">
        {/* Premium Compact Centered Diagonal "OUT OF STOCK" Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden pointer-events-none">
            <div
              className="px-4 py-2 sm:px-6 sm:py-2.5 text-center font-black text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase whitespace-nowrap"
              style={{
                transform: "rotate(-45deg)",
                background: "transparent",
                border: "3px solid #ef4444",
                borderRadius: "8px",
                color: "#ef4444",
                textShadow:
                  "0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(255, 255, 255, 0.6)",
                boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)",
                backdropFilter: "blur(4px)",
                minWidth: "120px",
              }}
            >
              OUT OF STOCK
            </div>
          </div>
        )}

        <ImageWithLoader
          src={productImage}
          alt={product.name || "Product"}
          className={`object-cover w-full h-full ${
            isOutOfStock ? "blur-[3px] brightness-[0.65]" : ""
          }`}
        />

        {/* Gradient Overlay - Very subtle */}
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-background/30 via-transparent to-transparent group-hover:opacity-100"></div>

        {/* Hover Overlay - Hidden on large screens, buttons removed */}
        {/* <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 lg:hidden">
          <div className="absolute flex gap-2 -translate-x-1/2 bottom-4 left-1/2">
          </div>
        </div> */}

        {/* Stock Badge - Show when stock < 10 */}
        {isLowStock && (
          <div className="absolute px-2 py-1 text-xs font-semibold text-white bg-orange-500 rounded-lg shadow-lg bottom-3 right-3 animate-pulse">
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Product Info - Compact with no whitespace */}
      <div className="relative flex flex-col p-2 space-y-0 sm:p-2.5 lg:p-3">
        {/* Category Badge */}
        <span className="inline-block px-1.5 py-0.5 mb-1 text-[9px] sm:text-[10px] font-semibold uppercase rounded bg-primary/10 text-primary tracking-wide border border-primary/20 w-fit">
          {product.category}
        </span>

        {/* Product Name - Larger & More Readable */}
        <h3 className="text-base font-bold leading-tight tracking-wide uppercase transition-colors duration-300 sm:text-lg lg:text-xl xl:text-2xl line-clamp-2 text-light group-hover:text-primary">
          {product.name}
        </h3>

        {/* Rating Stars - Compact, tight spacing */}
        <div className="flex items-center gap-0.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
              }`}
            />
          ))}
          <span className="ml-1 text-[9px] sm:text-[10px] font-medium text-light/60">
            4.0
          </span>
        </div>

        {/* Price - Larger & More Prominent */}
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-lg font-bold sm:text-xl lg:text-2xl xl:text-3xl text-primary">
            {product.price}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-primary">
            DH
          </span>
          {product.originalPrice && (
            <span className="text-[9px] sm:text-[10px] line-through text-light/30">
              {product.originalPrice} DH
            </span>
          )}
        </div>

        {/* Add to Cart Button - Compact */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/products/${product.id}`, {
              state: { from: "products" },
            });
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center justify-center w-full gap-1.5 px-2.5 py-1.5 mt-2 text-[10px] sm:text-xs font-semibold transition-all duration-300 rounded-lg lg:hidden ${
            isOutOfStock
              ? "bg-gray-600/80 text-white hover:bg-gray-600 border border-gray-500"
              : "bg-primary text-background hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
          }`}
        >
          <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>View Details</span>
        </motion.button>
      </div>
    </motion.div>
  );
});

// Add display name for better debugging
ProductCard.displayName = "ProductCard";

export default ProductCard;
