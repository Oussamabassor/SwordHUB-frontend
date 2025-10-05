import { useState, useEffect } from "react";

export function useImageLoader(src) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setError(false);

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setLoaded(true);
    };

    img.onerror = () => {
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
