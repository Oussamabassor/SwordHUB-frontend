import React from "react";

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 relative">
      {/* Image placeholder with shimmer effect */}
      <div className="aspect-[4/5] bg-gradient-to-r from-gray-100 via-primary/5 to-gray-100 dark:from-gray-700 dark:via-primary/10 dark:to-gray-700 animate-shimmer bg-[length:200%_100%]" />

      {/* Content placeholder */}
      <div className="p-6 space-y-4">
        {/* Category and rating */}
        <div className="flex justify-between items-center">
          <div className="h-5 w-24 bg-gradient-to-r from-gray-100 via-primary/10 to-gray-100 dark:from-gray-700 dark:via-primary/15 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
          <div className="h-5 w-16 bg-gradient-to-r from-gray-100 via-primary/10 to-gray-100 dark:from-gray-700 dark:via-primary/15 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 w-3/4 bg-gradient-to-r from-gray-100 via-primary/10 to-gray-100 dark:from-gray-700 dark:via-primary/15 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
          <div className="h-6 w-1/2 bg-gradient-to-r from-gray-100 via-primary/10 to-gray-100 dark:from-gray-700 dark:via-primary/15 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
        </div>

        {/* Fit type */}
        <div className="h-5 w-2/5 bg-gradient-to-r from-gray-100 via-primary/10 to-gray-100 dark:from-gray-700 dark:via-primary/15 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />

        {/* Price */}
        <div className="h-7 w-24 bg-gradient-to-r from-gray-100 via-primary/10 to-gray-100 dark:from-gray-700 dark:via-primary/15 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-20 bg-gradient-to-r from-gray-100 via-primary/10 to-gray-100 dark:from-gray-700 dark:via-primary/15 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
          <div className="h-5 w-12 bg-gradient-to-r from-gray-100 via-primary/10 to-gray-100 dark:from-gray-700 dark:via-primary/15 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
        </div>
      </div>

      {/* Subtle glow effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
    </div>
  );
}
