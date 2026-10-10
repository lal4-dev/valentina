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
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 animate-pop">
      <div
        className={`relative overflow-hidden rounded-3xl p-7 sm:p-9 border shadow-xl transition-all duration-300 ${
          isPastel
            ? "bg-white/95 border-purple-200/90 shadow-purple-200/50 text-purple-950"
            : "bg-zinc-950/95 border-zinc-800 shadow-black text-white"
        }`}
      >
        {/* Subtle Top Badge */}
        <div className="text-center mb-6">
          <div
            className={`inline-block p-3 rounded-2xl mb-3 text-2xl shadow-sm border ${
              isPastel
                ? "bg-purple-100/80 border-purple-200 text-purple-700"
                : "bg-red-950/80 border-red-800 text-red-200"
            }`}
          >
            {selectedProfile === "valentina" ? "💜" : "🔑"}
          </div>

          <p
            className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              isPastel ? "text-purple-600" : "text-red-400"
            }`}
          >
            {selectedProfile === "valentina" ? "Edición Especial de Cumpleaños" : "Panel de Control"}
          </p>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {selectedProfile === "valentina" ? "¡Hola, Valentina!" : "Modo Administrador"}
          </h1>

          <p
            className={`text-xs sm:text-sm mt-2 leading-relaxed font-medium ${
              isPastel ? "text-purple-800/80" : "text-zinc-400"
            }`}
          >
            {selectedProfile === "valentina"
              ? "Tus 7 regalos de BTS están listos para ser sorteados. Ingresá tu fecha para comenzar."
              : "Acceso para gestión y reinicio del sorteo de regalos."}
          </p>
        </div>

        {/* Profile Tabs */}
        <div
          className={`grid grid-cols-2 p-1.5 rounded-2xl mb-6 border text-xs font-bold ${
            isPastel
              ? "bg-purple-50 border-purple-200/70"
              : "bg-zinc-900 border-zinc-800"
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
                className={`py-2 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? isPastel
                      ? "bg-white text-purple-950 shadow-sm font-extrabold"
                      : "bg-red-600 text-white shadow-sm font-extrabold"
                    : isPastel
                    ? "text-purple-700 hover:text-purple-950 hover:bg-white/50"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>{profile.id === "valentina" ? "🎂" : "🛠️"}</span>
                <span>{profile.name}</span>
              </button>
            );
          })}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="auth-password-input"
              className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                isPastel ? "text-purple-900" : "text-zinc-300"
              }`}
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
              className={`w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all outline-none border ${
                isPastel
                  ? "bg-white border-purple-200 text-purple-950 placeholder-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                  : "bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-red-500 focus:ring-4 focus:ring-red-950/50"
              }`}
              required
            />

            {/* Hint note */}
            <div
              className={`mt-2 flex items-start gap-2 p-2.5 rounded-xl border text-xs ${
                isPastel
                  ? "bg-purple-50/80 border-purple-100 text-purple-800"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400"
              }`}
            >
              <span className="text-sm">💡</span>
              <div>
                <span className="font-bold">Pista: </span>
                <span className="font-medium">{activeProfileData?.defaultPasswordHint}</span>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div
              className={`p-3 rounded-xl text-xs font-bold border flex items-center gap-2 ${
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
            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm tracking-wide shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${
              isPastel
                ? "bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white shadow-purple-200 hover:shadow-purple-300"
                : "bg-red-600 text-white shadow-red-950 hover:bg-red-700"
            }`}
          >
            {selectedProfile === "valentina" ? "Comenzar el Sorteo 🎁" : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
