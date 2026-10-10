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

  const isPastel = theme === "pastel";

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 transition-all duration-500">
      <div
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 backdrop-blur-xl border shadow-2xl transition-all duration-500 ${
          isPastel
            ? "bg-white/80 border-purple-200/70 shadow-purple-200/50"
            : "bg-zinc-950/85 border-red-900/60 shadow-red-950/60"
        }`}
      >
        {/* Decorative corner glows */}
        <div
          className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-50 ${
            isPastel ? "bg-pink-300" : "bg-red-600"
          }`}
        />
        <div
          className={`absolute -bottom-16 -left-16 w-36 h-36 rounded-full blur-3xl opacity-50 ${
            isPastel ? "bg-purple-300" : "bg-red-800"
          }`}
        />

        {/* Header */}
        <div className="relative text-center mb-6">
          <div className="inline-block p-3 rounded-2xl mb-3 text-3xl shadow-inner border border-white/40 animate-bounce duration-1000">
            {selectedProfile === "valentina" ? "💜" : "🔑"}
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isPastel
                ? "bg-gradient-to-r from-purple-700 via-pink-600 to-amber-600 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-red-500 via-red-200 to-white bg-clip-text text-transparent"
            }`}
          >
            {selectedProfile === "valentina"
              ? "¡Feliz Cumple, Valentina!"
              : "Panel de Administrador"}
          </h1>
          <p
            className={`text-xs sm:text-sm mt-1.5 ${
              isPastel ? "text-purple-700/80" : "text-zinc-400"
            }`}
          >
            {selectedProfile === "valentina"
              ? "Tus 7 regalos temáticos de BTS te están esperando"
              : "Acceso para gestión, pruebas y reinicio del sorteo"}
          </p>
        </div>

        {/* Profile Switcher Tabs */}
        <div
          className={`grid grid-cols-2 gap-2 p-1.5 rounded-2xl mb-6 border ${
            isPastel
              ? "bg-purple-100/60 border-purple-200/60"
              : "bg-zinc-900/80 border-zinc-800"
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
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? isPastel
                      ? "bg-white text-purple-900 shadow-md shadow-purple-200/50"
                      : "bg-red-600 text-white shadow-md shadow-red-900/50"
                    : isPastel
                    ? "text-purple-600 hover:text-purple-900 hover:bg-white/50"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                <span>{profile.avatarIcon}</span>
                <span>{profile.name}</span>
              </button>
            );
          })}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative space-y-4">
          <div>
            <label
              htmlFor="password-input"
              className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                isPastel ? "text-purple-900" : "text-zinc-300"
              }`}
            >
              Contraseña de Acceso
            </label>
            <input
              id="password-input"
              type="password"
              inputMode={selectedProfile === "valentina" ? "numeric" : "text"}
              pattern={selectedProfile === "valentina" ? "[0-9]*" : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                selectedProfile === "valentina" ? "Ej: 14102026" : "Clave admin"
              }
              className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 outline-none border ${
                isPastel
                  ? "bg-white/90 border-purple-200 text-purple-950 placeholder-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  : "bg-zinc-900/90 border-zinc-700 text-white placeholder-zinc-500 focus:border-red-500 focus:ring-4 focus:ring-red-950/50"
              }`}
              required
            />

            {/* Explicit instruction note as requested */}
            <div
              className={`mt-2 flex items-start gap-1.5 text-xs rounded-lg p-2.5 border ${
                isPastel
                  ? "bg-purple-50/70 border-purple-100 text-purple-700"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-400"
              }`}
            >
              <span className="text-sm">💡</span>
              <div>
                <p className="font-semibold">
                  {selectedProfile === "valentina" ? "Nota de ingreso:" : "Clave de acceso:"}
                </p>
                <p className="text-[11px] leading-relaxed">
                  {activeProfileData?.defaultPasswordHint}
                </p>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div
              className={`p-3 rounded-xl text-xs font-medium border flex items-center gap-2 animate-shake ${
                isPastel
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "bg-red-950/80 border-red-700 text-red-200"
              }`}
            >
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !password}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${
              isPastel
                ? "bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white shadow-purple-300/50 hover:shadow-purple-400/60"
                : "bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white shadow-red-950 hover:shadow-red-900"
            }`}
          >
            {selectedProfile === "valentina" ? "Comenzar el Sorteo 🎁" : "Entrar al Panel"}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-6 text-center">
          <p
            className={`text-[11px] tracking-wider uppercase font-semibold ${
              isPastel ? "text-purple-400" : "text-zinc-600"
            }`}
          >
            Bangtan Sonyeondan • 7 Regalos • 7 Miembros
          </p>
        </div>
      </div>
    </div>
  );
}
