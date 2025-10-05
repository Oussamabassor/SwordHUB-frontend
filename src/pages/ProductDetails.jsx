import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Ruler,
  ShoppingBag,
  Heart,
} from "lucide-react";

const product = {
  id: 1,
  name: "Pro Performance Training T-Shirt",
  price: 49.99,
  rating: 4.5,
  reviewCount: 128,
  description:
    "Engineered for peak performance, this training t-shirt features moisture-wicking technology and strategic ventilation zones to keep you cool during intense workouts.",
  features: [
    "Moisture-wicking fabric",
    "Strategic ventilation zones",
    "Anti-odor technology",
    "4-way stretch material",
  ],
  images: [
    "/products/tshirt-1.jpg",
    "/products/tshirt-2.jpg",
    "/products/tshirt-3.jpg",
    "/products/tshirt-4.jpg",
  ],
  sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  colors: ["#000000", "#FFFFFF", "#2563EB", "#16A34A"],
};

const relatedProducts = [
  {
    id: 2,
    name: "Training Shorts",
    price: 39.99,
    image: "/products/shorts-1.jpg",
  },
  {
    id: 3,
    name: "Compression Leggings",
    price: 59.99,
    image: "/products/leggings-1.jpg",
  },
  {
    id: 4,
    name: "Performance Tank Top",
    price: 34.99,
    image: "/products/tank-1.jpg",
  },
];

export function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-surface">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 hover:bg-surface text-light transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-surface/80 hover:bg-surface text-light transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? "border-primary" : "border-accent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-light mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-primary">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={20}
                      fill={
                        idx < Math.floor(product.rating)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
                <span className="text-neutral">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div>
              <p className="text-3xl font-bold text-primary">
                ${product.price}
              </p>
              <p className="text-neutral mt-1">
                Free shipping on orders over $100
              </p>
            </div>

            <p className="text-light">{product.description}</p>

            {/* Features */}
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-neutral">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Color selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-light">Color</h3>
                <span className="text-neutral">
                  {selectedColor ? "Selected" : "Choose a color"}
                </span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-primary shadow-neon-green"
                        : "border-accent"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-light">Size</h3>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                >
                  <Ruler size={16} />
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded border transition-all ${
                      selectedSize === size
                        ? "border-primary text-primary bg-primary/10 shadow-neon-green"
                        : "border-accent text-light hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <button className="flex-1 bg-primary text-background py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-neon-green transition-all">
                <ShoppingBag size={20} />
                Add to Cart
              </button>
              <button className="p-3 rounded-lg border border-accent hover:border-primary text-light hover:text-primary transition-all">
                <Heart size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <div
                key={related.id}
                className="group bg-surface rounded-lg overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-light font-medium mb-2">
                    {related.name}
                  </h3>
                  <p className="text-primary font-semibold">${related.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
