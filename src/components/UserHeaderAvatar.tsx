"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface UserHeaderAvatarProps {
  userId?: string;
  name?: string;
}

export function UserHeaderAvatar({ userId, name }: UserHeaderAvatarProps) {
  const { theme } = useTheme();
  const isPastel = theme === "pastel";
  const [hasError, setHasError] = useState(false);

  const isValentina = userId === "valentina";

  if (isValentina && !hasError) {
    return (
      <div
        className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 shadow-xs transition-transform duration-200 hover:scale-105 flex items-center justify-center ${
          isPastel ? "border-purple-300 bg-purple-100" : "border-red-600 bg-zinc-900"
        }`}
        title="Foto de Valentina (colocá valentina.png en public/)"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/valentina.png"
          alt={name || "Valentina"}
          className="w-full h-full object-cover object-center"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Fallback avatar / Admin avatar
  return (
    <div
      className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 shadow-xs transition-all duration-200 ${
        isPastel
          ? "bg-purple-100 border-purple-300 text-purple-700"
          : "bg-red-950 border-red-700 text-red-200"
      }`}
      title={isValentina ? "Foto de perfil de Valentina (subí valentina.png a public/)" : "Panel de Admin"}
    >
      {isValentina ? "💜" : "🛠️"}
    </div>
  );
}
