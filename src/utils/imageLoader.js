import { useState, useEffect } from "react";

export function useImageLoader(src) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset states
    setLoaded(false);
    setError(false);

    // Safety check for empty or invalid src
    if (!src || typeof src !== "string") {
      console.warn("Invalid image src:", src);
      setError(true);
      return;
    }

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setLoaded(true);
    };

    img.onerror = () => {
      console.warn("Image failed to load:", src);
      setError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loaded, error };
}

export function getFallbackImage(type) {
  switch (type) {
    case "product":
      return "/images/placeholders/product-placeholder.svg";
    case "hero":
      return "/images/placeholders/hero-placeholder.svg";
    default:
      return "/images/placeholders/image-placeholder.svg";
  }
}
