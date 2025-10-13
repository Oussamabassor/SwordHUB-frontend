import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./LoadingScreen";

export function NavigationLoader({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Skip loading for admin pages
    if (location.pathname.startsWith("/admin")) {
      setIsLoading(false);
      return;
    }

    // Show loading screen when route changes
    setIsLoading(true);

    // Loading duration that covers typical API response time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // 1200ms - enough time for most API calls

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "instant" });

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Don't show loading for admin pages
  if (location.pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {/* No fade animation - keep header always visible */}
      {children}
    </>
  );
}
