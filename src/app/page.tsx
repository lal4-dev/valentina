"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { AuthCard } from "@/components/AuthCard";
import { RouletteWheel } from "@/components/RouletteWheel";
import { LotteryControls } from "@/components/LotteryControls";
import { GiftProgressTrack } from "@/components/GiftProgressTrack";
import { MemberRevealModal } from "@/components/MemberRevealModal";
import { ConcertCountdown } from "@/components/ConcertCountdown";
import { UserHeaderAvatar } from "@/components/UserHeaderAvatar";
import { ThemeToggle } from "@/components/ThemeToggleFAB";

export default function HomePage() {
  const { isAuthenticated, currentUser, logout, isAdmin } = useAuth();
  const { theme } = useTheme();
  const isPastel = theme === "pastel";

  // Login view
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center py-10 px-4 relative">
        <div className="absolute top-5 right-5 z-20">
          <ThemeToggle />
        </div>
        <AuthCard />
      </main>
    );
  }

  // Logged-in experience
  return (
    <main className="min-h-screen flex flex-col relative transition-colors duration-300 pb-16">
      {/* Navbar */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 sm:px-8 py-3 flex items-center justify-between transition-colors duration-300 ${isPastel
          ? "bg-white/85 border-purple-200/80 shadow-xs"
          : "bg-zinc-950/90 border-zinc-800 shadow-xs"
          }`}
      >
        {/* Left: User Profile with photo placeholder */}
        <div className="flex items-center gap-3 min-w-0">
          <UserHeaderAvatar userId={currentUser?.id} name={currentUser?.name} />
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-black text-sm sm:text-base leading-none ${isPastel ? "text-purple-950" : "text-white"
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
              className={`text-[11px] leading-tight mt-0.5 font-medium ${isPastel ? "text-purple-600" : "text-zinc-400"
                }`}
            >
              {currentUser?.roleTitle}
            </p>
          </div>
        </div>

        {/* Center: Prominent Concert Countdown on tablet landscape and desktop */}
        <div className="hidden md:flex items-center justify-center px-2">
          <ConcertCountdown />
        </div>

        {/* Right side: Theme Toggle & Logout */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <ThemeToggle />

          <button
            onClick={logout}
            type="button"
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 ${isPastel
              ? "bg-white border-purple-200 text-purple-700 hover:bg-purple-50"
              : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              }`}
          >
            Salir
          </button>
        </div>
      </header>

      {/* Prominent Center Countdown on mobile screens */}
      <div className="md:hidden flex justify-center pt-3 px-4">
        <ConcertCountdown />
      </div>

      {/* Hero Welcome Banner */}
      <section className="text-center pt-4 sm:pt-6 md:pt-8 px-4 max-w-2xl mx-auto">
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide mb-3 shadow-xs border ${isPastel
            ? "bg-purple-100 text-purple-700 border-purple-200"
            : "bg-red-950 text-red-200 border-red-800"
            }`}
        >
          <span>💜</span>
          <span>BTS Birthday Special</span>
          <span>💜</span>
        </div>

        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${isPastel
            ? "text-purple-950"
            : "text-white"
            }`}
        >
          ¡Feliz Cumpleaños, Amor mio!
        </h1>

        <p
          className={`mt-3 text-xs sm:text-base max-w-lg mx-auto font-medium leading-relaxed ${isPastel ? "text-purple-800/80" : "text-zinc-300"
            }`}
        >
          Siete regalos preparados con todo el amor, uno por cada miembro de BTS.
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
        className={`mt-auto text-center py-8 text-xs font-medium border-t ${isPastel
          ? "border-purple-200/60 text-purple-600"
          : "border-zinc-800 text-zinc-500"
          }`}
      >
        <p>Hecho con mucho amor para Valentina 💜 • Feliz Cumpleaños 2026</p>
      </footer>
    </main>
  );
}
