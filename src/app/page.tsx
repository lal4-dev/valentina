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
      <main className="min-h-screen flex flex-col justify-center items-center py-12 px-4 relative">
        <AuthCard />
      </main>
    );
  }

  // Authenticated experience
  return (
    <main className="min-h-screen flex flex-col relative transition-colors duration-500 pb-16">
      {/* Editorial Navigation */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b px-5 sm:px-10 py-3.5 flex items-center justify-between transition-colors duration-300 ${
          isPastel
            ? "bg-[#F8F7F4]/80 border-[#E4E0D7]"
            : "bg-[#0C0C0F]/85 border-[#1E1E26]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-widest uppercase opacity-70">
            BTS • 07
          </span>
          <span className="h-3 w-px bg-inherit opacity-40" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif font-medium">
              {currentUser?.name}
            </span>
            {isAdmin && (
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border border-red-500/50 text-red-400">
                ADMIN
              </span>
            )}
          </div>
        </div>

        {/* Right tools (avoid colliding with floating FAB on far right) */}
        <div className="flex items-center gap-4 mr-32 sm:mr-36">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono opacity-70">
            <span>ARIRANG &apos;26</span>
            <span className="opacity-40">•</span>
            <span>ARGENTINA</span>
          </div>

          <button
            onClick={logout}
            type="button"
            className="text-xs font-mono opacity-65 hover:opacity-100 transition-opacity underline-offset-4 hover:underline"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Hero Welcome */}
      <section className="text-center pt-10 sm:pt-14 px-4 max-w-2xl mx-auto">
        <span className="text-[10px] font-mono tracking-widest uppercase opacity-60 block mb-2">
          Edición Especial de Cumpleaños
        </span>

        <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight leading-tight">
          Para Valentina
        </h1>

        <p className="mt-3 text-xs sm:text-sm max-w-lg mx-auto opacity-75 leading-relaxed">
          Siete regalos pensados uno a uno, inspirados en los integrantes de BTS y dedicados desde lo más profundo del corazón. Girad la ruleta para descubrir cada entrega.
        </p>
      </section>

      {/* Interactive Turntable Section */}
      <section className="mt-4 sm:mt-6 flex flex-col items-center">
        <RouletteWheel />
        <LotteryControls />
      </section>

      {/* Collectible Photocard Gallery */}
      <section className="mt-8">
        <GiftProgressTrack />
      </section>

      {/* Modal for Revealed Member */}
      <MemberRevealModal />

      {/* Minimalist Footer */}
      <footer className="mt-auto text-center py-8 text-[11px] font-mono opacity-50 border-t border-inherit">
        <p>Borahae Valentina • BTS &amp; Arirang 2026</p>
      </footer>
    </main>
  );
}
