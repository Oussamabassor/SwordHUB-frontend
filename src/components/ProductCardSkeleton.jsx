import React from "react";

export function ProductCardSkeleton() {
  return (
    <div className="bg-surface rounded-xl overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-[4/5] bg-surface/50" />

      {/* Content placeholder */}
      <div className="p-6 space-y-4">
        {/* Category and rating */}
        <div className="flex justify-between">
          <div className="w-24 h-6 bg-surface/50 rounded" />
          <div className="w-16 h-6 bg-surface/50 rounded" />
        </div>

        {/* Title */}
        <div className="w-3/4 h-7 bg-surface/50 rounded" />

        {/* Fit type */}
        <div className="w-1/2 h-5 bg-surface/50 rounded" />

        {/* Price */}
        <div className="w-20 h-8 bg-surface/50 rounded" />

        {/* Rating */}
        <div className="w-32 h-5 bg-surface/50 rounded" />
      </div>
    </div>
  );
}
