"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { AuthCard } from "@/components/AuthCard";
import { RouletteWheel } from "@/components/RouletteWheel";
import { LotteryControls } from "@/components/LotteryControls";
import { GiftProgressTrack } from "@/components/GiftProgressTrack";
import { MemberRevealModal } from "@/components/MemberRevealModal";

export default function HomePage() {
  const { isAuthenticated, currentUser, logout, isAdmin } = useAuth();
  const { theme } = useTheme();
  const isPastel = theme === "pastel";

  // If not logged in, show the login card
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center py-12 px-4 relative">
        <AuthCard />
      </main>
    );
  }

  // Logged-in experience
  return (
    <main className="min-h-screen flex flex-col relative transition-colors duration-500 pb-16">
      {/* Top Navbar */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors duration-300 ${
          isPastel
            ? "bg-white/75 border-purple-200/60 shadow-sm"
            : "bg-zinc-950/80 border-zinc-800 shadow-sm"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-inner border ${
              isPastel
                ? "bg-purple-100 border-purple-200"
                : "bg-zinc-900 border-red-800"
            }`}
          >
            {currentUser?.id === "valentina" ? "🎂" : "🛠️"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1
                className={`text-sm sm:text-base font-extrabold leading-none ${
                  isPastel ? "text-purple-950" : "text-white"
                }`}
              >
                {currentUser?.name}
              </h1>
              {isAdmin && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white">
                  ADMIN
                </span>
              )}
            </div>
            <p
              className={`text-[11px] leading-tight mt-0.5 ${
                isPastel ? "text-purple-600" : "text-zinc-400"
              }`}
            >
              {currentUser?.roleTitle}
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3 mr-36 sm:mr-44">
          <div
            className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              isPastel
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : "bg-red-950/60 text-red-300 border-red-800/80"
            }`}
          >
            <span>🇦🇷</span>
            <span>Arirang Argentina • ¡3 semanas!</span>
          </div>

          <button
            onClick={logout}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 hover:scale-105 active:scale-95 ${
              isPastel
                ? "bg-white/80 border-purple-200 text-purple-700 hover:bg-purple-50"
                : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            Salir
          </button>
        </div>
      </header>

      {/* Hero Welcome Banner */}
      <section className="text-center pt-8 sm:pt-12 px-4 max-w-3xl mx-auto">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 shadow-sm border ${
            isPastel
              ? "bg-purple-100 text-purple-800 border-purple-200"
              : "bg-red-950/80 text-red-200 border-red-800"
          }`}
        >
          <span>💜</span>
          <span>BTS Birthday Special Edition</span>
          <span>💜</span>
        </div>

        <h2
          className={`text-2xl sm:text-4xl font-black tracking-tight leading-tight ${
            isPastel
              ? "bg-gradient-to-r from-purple-700 via-pink-600 to-amber-600 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-red-500 via-red-200 to-white bg-clip-text text-transparent"
          }`}
        >
          ¡Sorteo de tus 7 Regalos, Valentina!
        </h2>

        <p
          className={`mt-2 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${
            isPastel ? "text-purple-800/80" : "text-zinc-400"
          }`}
        >
          Cada número del 1 al 7 está conectado con uno de los integrantes de BTS según tus
          favoritos. Girad la ruleta para develar cada regalo y su dedicatoria.
        </p>
      </section>

      {/* Main Roulette Section */}
      <section className="mt-4 sm:mt-6 flex flex-col items-center">
        <RouletteWheel />
        <LotteryControls />
      </section>

      {/* 7 Gifts Progress & Review Track */}
      <section className="mt-8">
        <GiftProgressTrack />
      </section>

      {/* Modal for Revealed Member */}
      <MemberRevealModal />

      {/* Footer */}
      <footer
        className={`mt-auto text-center py-8 text-xs border-t ${
          isPastel
            ? "border-purple-200/50 text-purple-500"
            : "border-zinc-800 text-zinc-600"
        }`}
      >
        <p className="font-semibold">
          Hecho con mucho amor 💜 • Borahae Valentina • BTS &amp; Arirang 2026
        </p>
      </footer>
    </main>
  );
}
