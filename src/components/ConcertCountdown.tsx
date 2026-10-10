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
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-colors shadow-xs ${
          isPastel
            ? "bg-purple-100/90 text-purple-900 border-purple-300"
            : "bg-red-950/90 text-red-200 border-red-800"
        }`}
      >
        <span>🇦🇷</span>
        <span>Concierto Arirang • 24 Oct</span>
      </div>
    );
  }

  if (countdownText === "PAST") {
    return (
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black border transition-colors shadow-xs ${
          isPastel
            ? "bg-purple-100 text-purple-900 border-purple-300"
            : "bg-red-900 text-white border-red-700"
        }`}
      >
        <span>🎉</span>
        <span>¡HOY ES EL CONCIERTO ARIRANG!</span>
        <span>🇦🇷</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 sm:gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold border-2 transition-all duration-300 shadow-sm ${
        isPastel
          ? "bg-purple-100/90 text-purple-950 border-purple-300 shadow-purple-200/50"
          : "bg-zinc-950 text-white border-red-600 shadow-red-950/60"
      }`}
      title="Concierto BTS Arirang en Argentina: 24 de Octubre de 2026 a las 20:00 hs"
    >
      <span className="text-base leading-none">🇦🇷</span>
      <span className="font-extrabold uppercase tracking-wide text-[11px] sm:text-xs opacity-90">
        Concierto Arirang:
      </span>
      <span
        className={`font-mono font-black tracking-tight text-xs sm:text-sm px-2 py-0.5 rounded-lg border ${
          isPastel
            ? "bg-white/80 border-purple-200 text-purple-900"
            : "bg-red-950/80 border-red-800 text-red-200"
        }`}
      >
        {countdownText}
      </span>
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isPastel ? "bg-purple-400" : "bg-red-400"
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isPastel ? "bg-purple-600" : "bg-red-500"
          }`}
        />
      </span>
    </div>
  );
}
