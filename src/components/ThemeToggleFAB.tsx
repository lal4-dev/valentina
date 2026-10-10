"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggleFAB() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full font-medium text-xs md:text-sm shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 border ${
          theme === "pastel"
            ? "bg-white/85 text-purple-900 border-purple-200/80 shadow-purple-200/50 hover:bg-purple-50"
            : "bg-zinc-900/90 text-red-100 border-red-800/80 shadow-red-950/60 hover:bg-zinc-800"
        }`}
        title="Cambiar temática visual"
      >
        <span className="text-base transition-transform group-hover:rotate-12 duration-300">
          {theme === "pastel" ? "🌸" : "🔥"}
        </span>
        <div className="flex flex-col text-left">
          <span className="leading-none font-bold">
            {theme === "pastel" ? "Modo Pastel" : "Arirang Concierto"}
          </span>
          <span
            className={`text-[10px] leading-tight opacity-75 ${
              theme === "pastel" ? "text-purple-600" : "text-red-400"
            }`}
          >
            {theme === "pastel" ? "Cambiar a Arirang (Rojo/Negro)" : "Cambiar a Pastel (Rosa/Amarillo)"}
          </span>
        </div>
      </button>
    </div>
  );
}
