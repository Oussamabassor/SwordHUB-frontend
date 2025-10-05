import React from "react";
import { ProductCard } from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Pro Performance T-Shirt",
    price: 49.99,
    category: "Training",
    image: "/images/placeholders/swordshirt.jpg",
  },
  {
    id: 2,
    name: "Flex Training Shorts",
    price: 39.99,
    category: "Training",
    image: "/images/placeholders/swordshirt2.jpg",
  },
  {
    id: 3,
    name: "Ultra Boost Runner",
    price: 129.99,
    category: "Footwear",
    image: "/images/placeholders/swordshirt.jpg",
  },
  {
    id: 4,
    name: "Compression Leggings",
    price: 59.99,
    category: "Training",
    image: "/images/placeholders/swordshirt2.jpg",
  },
];

export function ProductGrid() {
  return (
    <section className="bg-background">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ............................
