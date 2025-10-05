import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Update data-theme attribute
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    // Store preference
    localStorage.setItem("darkMode", JSON.stringify(isDark));
  }, [isDark]);

  return [isDark, setIsDark];
}
