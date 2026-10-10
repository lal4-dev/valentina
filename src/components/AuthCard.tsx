"use client";

import React, { useState } from "react";
import { USER_PROFILES } from "@/data/authConfig";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export function AuthCard() {
  const { login } = useAuth();
  const { theme } = useTheme();

  const [selectedProfile, setSelectedProfile] = useState<"valentina" | "admin">("valentina");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPastel = theme === "pastel";
  const activeProfileData = USER_PROFILES.find((p) => p.id === selectedProfile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    const result = login(selectedProfile, password);
    if (!result.success) {
      setErrorMsg(result.error || "Clave incorrecta");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6">
      <div
        className={`relative rounded-3xl p-7 sm:p-9 border transition-all duration-300 ${
          isPastel
            ? "bg-white/95 border-[#E6E2DA] shadow-paper text-[#1E1B24]"
            : "bg-[#141418] border-[#24242C] shadow-vinyl text-[#F5F5F7]"
        }`}
      >
        {/* Subtle Brand Watermark / Monogram */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-inherit opacity-70">
          <span className="text-[11px] font-mono tracking-widest uppercase">
            BTS • 07 GIFTS
          </span>
          <span className="text-xs font-serif italic">
            {isPastel ? "Edición Especial Cumpleaños" : "Arirang Edition '26"}
          </span>
        </div>

        {/* Header */}
        <div className="mb-7">
          <p
            className={`text-xs tracking-wider uppercase mb-1 font-medium ${
              isPastel ? "text-[#8B6FA8]" : "text-[#C52233]"
            }`}
          >
            {selectedProfile === "valentina" ? "Para Valentina" : "Acceso Administrativo"}
          </p>
          <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight leading-snug">
            {selectedProfile === "valentina"
              ? "Siete regalos para celebrar tu día"
              : "Gestión del Sorteo"}
          </h1>
          <p
            className={`text-xs sm:text-sm mt-2 leading-relaxed ${
              isPastel ? "text-[#6E6A78]" : "text-[#8E8D99]"
            }`}
          >
            {selectedProfile === "valentina"
              ? "Cada integrante guarda un detalle preparado con todo el amor. Ingresá tu fecha para comenzar."
              : "Herramienta para control y restablecimiento de regalos."}
          </p>
        </div>

        {/* Profile Tabs */}
        <div
          className={`grid grid-cols-2 p-1 rounded-xl mb-6 border text-xs font-medium ${
            isPastel
              ? "bg-[#F3F1EC] border-[#E2DED6]"
              : "bg-[#0E0E12] border-[#202028]"
          }`}
        >
          {USER_PROFILES.map((profile) => {
            const isSelected = selectedProfile === profile.id;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => {
                  setSelectedProfile(profile.id as "valentina" | "admin");
                  setPassword("");
                  setErrorMsg("");
                }}
                className={`py-2 px-3 rounded-lg text-center transition-all duration-200 ${
                  isSelected
                    ? isPastel
                      ? "bg-white text-[#1E1B24] shadow-sm font-semibold"
                      : "bg-[#1E1E26] text-[#FFFFFF] shadow-sm font-semibold"
                    : isPastel
                    ? "text-[#6E6A78] hover:text-[#1E1B24]"
                    : "text-[#7A7A88] hover:text-[#FFFFFF]"
                }`}
              >
                {profile.name}
              </button>
            );
          })}
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="auth-password-input"
              className="block text-xs font-medium mb-1.5 opacity-80"
            >
              Contraseña
            </label>
            <input
              id="auth-password-input"
              type="password"
              inputMode={selectedProfile === "valentina" ? "numeric" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={selectedProfile === "valentina" ? "14102026" : "Clave admin"}
              className={`w-full px-4 py-3 rounded-xl text-sm transition-all outline-none border ${
                isPastel
                  ? "bg-[#FAF9F6] border-[#DCD7CD] text-[#1E1B24] placeholder-[#A09B90] focus:border-[#8B6FA8] focus:bg-white"
                  : "bg-[#0E0E12] border-[#282834] text-[#F5F5F7] placeholder-[#5A5A6A] focus:border-[#C52233] focus:bg-[#121216]"
              }`}
              required
            />

            {/* Note */}
            <p
              className={`mt-2 text-xs leading-relaxed ${
                isPastel ? "text-[#7A7584]" : "text-[#7E7D8A]"
              }`}
            >
              {activeProfileData?.defaultPasswordHint}
            </p>
          </div>

          {errorMsg && (
            <div
              className={`p-3 rounded-xl text-xs border ${
                isPastel
                  ? "bg-[#FFF0F2] border-[#F2C4CB] text-[#9E2A38]"
                  : "bg-[#2A0E12] border-[#661822] text-[#F497A3]"
              }`}
            >
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !password}
            className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none ${
              isPastel
                ? "bg-[#252030] text-white hover:bg-[#342D44] active:scale-[0.99]"
                : "bg-[#C52233] text-white hover:bg-[#D92D3F] active:scale-[0.99]"
            }`}
          >
            {selectedProfile === "valentina" ? "Comenzar la experiencia" : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
