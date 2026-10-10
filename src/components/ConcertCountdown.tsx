"use client";

import React, { useSyncExternalStore } from "react";
import { useTheme } from "@/context/ThemeContext";

// Concierto Arirang Argentina: 24 de octubre de 2026, 20:00 hs (hora de Argentina, UTC-3)
const CONCERT_DATE_ISO = "2026-10-24T20:00:00-03:00";
const targetTime = new Date(CONCERT_DATE_ISO).getTime();

function subscribeToTicker(callback: () => void) {
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
}

function getCountdownSnapshot(): string {
  const diff = targetTime - Date.now();
  if (diff <= 0) {
    return "PAST";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

function getServerSnapshot(): string {
  return "CALCULATING";
}

export function ConcertCountdown() {
  const { theme } = useTheme();
  const isPastel = theme === "pastel";
  const countdownText = useSyncExternalStore(
    subscribeToTicker,
    getCountdownSnapshot,
    getServerSnapshot
  );

  if (countdownText === "CALCULATING") {
    return (
      <div
        className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
          isPastel
            ? "bg-purple-50 text-purple-800 border-purple-200"
            : "bg-red-950 text-red-200 border-red-800"
        }`}
      >
        <span>🇦🇷</span>
        <span>Arirang 24 Oct</span>
      </div>
    );
  }

  if (countdownText === "PAST") {
    return (
      <div
        className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black border transition-colors ${
          isPastel
            ? "bg-purple-100 text-purple-900 border-purple-300 shadow-xs"
            : "bg-red-900 text-white border-red-700 shadow-xs"
        }`}
      >
        <span>🎉</span>
        <span>¡Llegó el Concierto Arirang!</span>
        <span>🇦🇷</span>
      </div>
    );
  }

  return (
    <div
      className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold border transition-colors shadow-xs ${
        isPastel
          ? "bg-purple-50/90 text-purple-900 border-purple-200/90"
          : "bg-red-950/90 text-red-100 border-red-800/90"
      }`}
      title="Concierto Arirang en Argentina: 24 de Octubre de 2026 a las 20:00 hs"
    >
      <span className="text-sm">🇦🇷</span>
      <span className="font-bold opacity-80">Arirang:</span>
      <span className="font-mono tracking-tight font-black">
        {countdownText}
      </span>
    </div>
  );
}
