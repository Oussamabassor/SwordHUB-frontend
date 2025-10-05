import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import '../styles/components/ThemeToggle.css';

export function ThemeToggle() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="theme-toggle"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="sun" />
      ) : (
        <Moon className="moon" />
      )}
    </button>
  );
}