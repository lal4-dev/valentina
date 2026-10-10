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

  // Login view
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center py-10 px-4 relative">
        <AuthCard />
      </main>
    );
  }

  // Logged-in experience
  return (
    <main className="min-h-screen flex flex-col relative transition-colors duration-300 pb-16">
      {/* Navbar */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b px-5 sm:px-10 py-3.5 flex items-center justify-between transition-colors duration-300 ${
          isPastel
            ? "bg-white/80 border-purple-200/60 shadow-sm"
            : "bg-zinc-950/85 border-zinc-800 shadow-sm"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm border shadow-sm ${
              isPastel
                ? "bg-purple-100 text-purple-700 border-purple-200"
                : "bg-red-950 text-red-200 border-red-800"
            }`}
          >
            {currentUser?.id === "valentina" ? "💜" : "🛠️"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-extrabold text-sm sm:text-base leading-none ${
                  isPastel ? "text-purple-950" : "text-white"
                }`}
              >
                {currentUser?.name}
              </span>
              {isAdmin && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white">
                  ADMIN
                </span>
              )}
            </div>
            <p
              className={`text-[11px] leading-tight mt-0.5 font-medium ${
                isPastel ? "text-purple-600" : "text-zinc-400"
              }`}
            >
              {currentUser?.roleTitle}
            </p>
          </div>
        </div>

        {/* Right side info (keeps clearance for FAB toggle on top-right) */}
        <div className="flex items-center gap-3 sm:gap-4 mr-36 sm:mr-44">
          <div
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${
              isPastel
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : "bg-red-950 text-red-200 border-red-800"
            }`}
          >
            <span>🇦🇷</span>
            <span>Arirang Argentina • ¡3 semanas!</span>
          </div>

          <button
            onClick={logout}
            type="button"
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 ${
              isPastel
                ? "bg-white border-purple-200 text-purple-700 hover:bg-purple-50"
                : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            Salir
          </button>
        </div>
      </header>

      {/* Hero Welcome Banner */}
      <section className="text-center pt-8 sm:pt-12 px-4 max-w-2xl mx-auto">
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide mb-3 shadow-sm border ${
            isPastel
              ? "bg-purple-100 text-purple-700 border-purple-200"
              : "bg-red-950 text-red-200 border-red-800"
          }`}
        >
          <span>💜</span>
          <span>BTS Birthday Special</span>
          <span>💜</span>
        </div>

        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${
            isPastel
              ? "text-purple-950"
              : "text-white"
          }`}
        >
          ¡Feliz Cumpleaños, Valentina!
        </h1>

        <p
          className={`mt-3 text-xs sm:text-base max-w-lg mx-auto font-medium leading-relaxed ${
            isPastel ? "text-purple-800/80" : "text-zinc-300"
          }`}
        >
          Siete regalos preparados con todo el amor, uno por cada miembro de BTS. Girad la ruleta para develar cada regalo y su mensaje.
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

      {/* Festive Footer */}
      <footer
        className={`mt-auto text-center py-8 text-xs font-medium border-t ${
          isPastel
            ? "border-purple-200/60 text-purple-600"
            : "border-zinc-800 text-zinc-500"
        }`}
      >
        <p>Hecho con mucho amor 💜 • Borahae Valentina • BTS &amp; Arirang 2026</p>
      </footer>
    </main>
  );
}
