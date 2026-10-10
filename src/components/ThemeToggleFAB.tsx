"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isPastel = theme === "pastel";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border shadow-xs hover:scale-102 active:scale-98 ${
        isPastel
          ? "bg-white/90 border-purple-200 text-purple-900 hover:bg-purple-50 hover:border-purple-300"
          : "bg-zinc-900/90 border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-500"
      } ${className}`}
      aria-label="Cambiar tema visual"
      title={isPastel ? "Cambiar a Modo Arirang Tour" : "Cambiar a Modo Cumpleaños Pastel"}
    >
      <span
        className={`w-2.5 h-2.5 rounded-full transition-transform duration-200 group-hover:scale-125 ${
          isPastel ? "bg-purple-500" : "bg-red-500"
        }`}
      />
      <span className="font-extrabold text-[11px] whitespace-nowrap">
        {isPastel ? "Modo Pastel" : "Modo Arirang"}
      </span>
      <span className="text-[10px] opacity-60 font-normal hidden lg:inline">
        ({isPastel ? "🌸" : "🇦🇷"})
      </span>
    </button>
  );
}

// Backward compatibility export if needed
export const ThemeToggleFAB = ThemeToggle;
