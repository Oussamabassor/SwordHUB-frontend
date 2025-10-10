import React, { useState } from "react";
import { MessageCircle, Heart, Star, Eye, ShoppingBag } from "lucide-react";
import { openWhatsAppOrder } from "../utils/whatsapp";
import { ImageWithLoader } from "./ImageWithLoader";
import { useOrders } from "../contexts/OrderContext";

export function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const orderContext = useOrders();
  const sizes = ["S", "M", "L", "XL", "XXL"];

  // Calculate discount percentage if there's a sale price
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const handleAddToOrder = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    orderContext.addToOrder(product, selectedSize);
    setSelectedSize(""); // Reset size after adding
  };

  return (
    <div
      className="relative overflow-hidden transition-all duration-300 border group bg-surface/80 backdrop-blur-sm rounded-2xl hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 border-primary/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge - New or Discount */}
      <div className="absolute z-20 flex items-center justify-between top-4 left-4 right-4">
        <div className="flex gap-2">
          {product.isNew && (
            <span className="bg-primary text-background px-3 py-1.5 rounded-full text-sm font-medium shadow-lg shadow-primary/20">
              New
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg shadow-red-500/20">
              Save {discount}%
            </span>
          )}
        </div>
        <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-surface/80 backdrop-blur-sm text-text border border-primary/10">
          {product.category}
        </span>
      </div>

      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-surface/50 view-bg">
        <img
          src={product.image || `/images/placeholders/swordshirt.jpg`}
          alt={product.name}
          className="object-cover w-full h-full transition-all duration-500 "
        />
        {/* Image hover effect overlay */}
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-background/80 to-transparent group-hover:opacity-100" />

        {/* Hover overlay with glassmorphism effect */}
        <div
          className={`absolute inset-0 backdrop-blur-md bg-background/60 flex flex-col items-center justify-center gap-6 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Quick size picker */}
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                  ${
                    selectedSize === size
                      ? "bg-primary text-background shadow-neon-green scale-110"
                      : "bg-surface/80 text-light hover:bg-primary/20"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {selectedSize ? (
              <button
                onClick={handleAddToOrder}
                className="flex items-center gap-2 px-6 py-3 transition-all rounded-lg bg-primary text-background hover:shadow-neon-green"
              >
                <ShoppingBag size={20} />
                Add to Cart
              </button>
            ) : (
              <p className="text-sm text-light/80">Select a size to order</p>
            )}
          </div>

          {/* Feature badges */}
          <div className="absolute flex gap-2 transition-opacity -translate-x-1/2 opacity-0 bottom-4 left-1/2 group-hover:opacity-100">
            {product.features?.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-surface/80 text-light"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Product info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="px-2 py-1 text-sm font-medium rounded-md text-primary bg-primary/10">
            {product.category}
          </p>
          {/* Material tag */}
          <p className="px-2 py-1 text-sm rounded-md text-light/80 bg-surface/80">
            {product.material || "Premium Cotton"}
          </p>
        </div>

        <h3 className="mb-2 text-lg font-medium transition-colors text-light group-hover:text-primary">
          {product.name}
        </h3>

        {/* Fit type */}
        <p className="mb-3 text-sm text-light/60">
          Fit: {product.fit || "Regular fit"}
        </p>

        {/* Price section */}
        <div className="flex items-baseline gap-2 mb-2">
          <p className="text-xl font-bold text-primary">${product.price}</p>
          {product.originalPrice && (
            <p className="text-sm line-through text-neutral">
              ${product.originalPrice}
            </p>
          )}
        </div>

        {/* Rating and reviews */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-primary fill-primary" />
            <span className="text-sm text-light">{product.rating || 4.5}</span>
          </div>
          <span className="text-sm text-light/60">
            ({product.reviews || "24"} reviews)
          </span>
        </div>

        {/* Selected size indicator */}
        {selectedSize && (
          <div className="flex items-center gap-2 mt-3 mb-2">
            <span className="text-sm text-neutral">Selected size:</span>
            <span className="font-medium text-primary">{selectedSize}</span>
          </div>
        )}
      </div>
    </div>
  );
}
