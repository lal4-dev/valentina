"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

export type VisualTheme = "pastel" | "arirang";

interface ThemeContextType {
  theme: VisualTheme;
  toggleTheme: () => void;
  setTheme: (theme: VisualTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getThemeSnapshot(): VisualTheme {
  const saved = localStorage.getItem("bts_valentina_theme");
  return saved === "arirang" ? "arirang" : "pastel";
}

function getThemeServerSnapshot(): VisualTheme {
  return "pastel";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (newTheme: VisualTheme) => {
    localStorage.setItem("bts_valentina_theme", newTheme);
    window.dispatchEvent(new Event("storage"));
  };

  const toggleTheme = () => {
    const nextTheme: VisualTheme = theme === "pastel" ? "arirang" : "pastel";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className={theme === "arirang" ? "theme-arirang" : "theme-pastel"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
