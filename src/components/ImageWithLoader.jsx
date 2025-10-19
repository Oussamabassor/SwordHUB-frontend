import React, { memo } from "react";
import { useImageLoader, getFallbackImage } from "../utils/imageLoader";

export const ImageWithLoader = memo(
  ({ src, alt, className, type = "product" }) => {
    // Safety check: if no src provided, use fallback immediately
    if (!src) {
      return (
        <div className={`relative ${className}`}>
          <img
            src={getFallbackImage(type)}
            alt={alt || "Product image"}
            className={className}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-surface/50 backdrop-blur-sm">
            <p className="text-text-muted text-sm">No image</p>
          </div>
        </div>
      );
    }

    const { loaded, error } = useImageLoader(src);

    if (error) {
      return (
        <div className={`relative ${className}`}>
          <img
            src={getFallbackImage(type)}
            alt={alt || "Product image"}
            className={className}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-surface/50 backdrop-blur-sm">
            <p className="text-text-muted text-sm">Image not available</p>
          </div>
        </div>
      );
    }

    if (!loaded) {
      return (
        <div className={`relative ${className} animate-pulse bg-surface-alt`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-text-muted/30 animate-spin"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt || "Product image"}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }
);

ImageWithLoader.displayName = "ImageWithLoader";

export default ImageWithLoader;
