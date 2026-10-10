"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggleFAB() {
  const { theme, toggleTheme } = useTheme();
  const isPastel = theme === "pastel";

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        onClick={toggleTheme}
        type="button"
        className={`group flex items-center gap-3 px-3.5 py-2 rounded-full text-xs tracking-normal transition-all duration-300 border backdrop-blur-md ${
          isPastel
            ? "bg-white/80 border-[#E4E0D7] text-[#2C2738] shadow-sm hover:border-[#C5BFB0] hover:bg-white"
            : "bg-[#141418]/90 border-[#2A2A34] text-[#E4E4E8] shadow-sm hover:border-[#3E3E4C] hover:bg-[#1A1A20]"
        }`}
        aria-label="Cambiar tema visual"
      >
        <span
          className={`inline-block w-2 h-2 rounded-full transition-colors duration-300 ${
            isPastel ? "bg-[#9A80B4]" : "bg-[#C52233]"
          }`}
        />
        <div className="flex flex-col text-left">
          <span className="font-medium text-[11px] leading-tight">
            {isPastel ? "Pastel Atelier" : "Arirang Tour"}
          </span>
          <span
            className={`text-[9px] transition-colors leading-none ${
              isPastel ? "text-[#7B7586]" : "text-[#8E8D99]"
            }`}
          >
            {isPastel ? "Modo Concierto" : "Modo Pastel"}
          </span>
        </div>
      </button>
    </div>
  );
}
