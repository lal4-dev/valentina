"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type VisualTheme = "pastel" | "arirang";

interface ThemeContextType {
  theme: VisualTheme;
  toggleTheme: () => void;
  setTheme: (theme: VisualTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<VisualTheme>("pastel");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("bts_valentina_theme") as VisualTheme | null;
    if (savedTheme === "pastel" || savedTheme === "arirang") {
      setThemeState(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "pastel");
    }
  }, []);

  const setTheme = (newTheme: VisualTheme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("bts_valentina_theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
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
