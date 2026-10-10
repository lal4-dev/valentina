"use client";

import React from "react";
import { useLottery } from "@/context/LotteryContext";
import { useTheme } from "@/context/ThemeContext";
import { BTS_MEMBERS } from "@/data/btsMembers";
import { MemberAvatar } from "@/components/MemberAvatar";

// Member specific accent colors for pastel cards (Warm, rich pastels with matching colored borders)
const PASTEL_ACCENTS = [
  { bg: "bg-purple-100/90", border: "border-purple-300", tag: "bg-purple-200 text-purple-900", divider: "border-purple-200" },   // 1: Yoongi
  { bg: "bg-pink-100/90", border: "border-pink-300", tag: "bg-pink-200 text-pink-900", divider: "border-pink-200" },             // 2: Tae
  { bg: "bg-amber-100/90", border: "border-amber-300", tag: "bg-amber-200 text-amber-900", divider: "border-amber-200" },        // 3: Jimin
  { bg: "bg-sky-100/90", border: "border-sky-300", tag: "bg-sky-200 text-sky-900", divider: "border-sky-200" },                 // 4: Namjoon
  { bg: "bg-orange-100/90", border: "border-orange-300", tag: "bg-orange-200 text-orange-900", divider: "border-orange-200" },   // 5: Jin
  { bg: "bg-emerald-100/90", border: "border-emerald-300", tag: "bg-emerald-200 text-emerald-900", divider: "border-emerald-200" },// 6: Hobi
  { bg: "bg-violet-100/90", border: "border-violet-300", tag: "bg-violet-200 text-violet-900", divider: "border-violet-200" },   // 7: Jungkook
];

export function GiftProgressTrack() {
  const { drawnNumbers, openMemberModal } = useLottery();
  const { theme } = useTheme();
  const isPastel = theme === "pastel";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Festive Header */}
      <div className="text-center mb-8">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 ${
            isPastel
              ? "bg-purple-100 text-purple-800 border border-purple-200"
              : "bg-red-950 text-red-200 border border-red-800"
          }`}
        >
          <span>🎉</span>
          <span>Los 7 Regalos de Cumpleaños</span>
          <span>🎉</span>
        </span>
        <h2
          className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${
            isPastel ? "text-purple-950" : "text-white"
          }`}
        >
          Tus Regalos y Mensajes Especiales
        </h2>
        <p
          className={`text-xs sm:text-sm max-w-md mx-auto mt-1.5 font-medium leading-relaxed ${
            isPastel ? "text-purple-800/80" : "text-zinc-400"
          }`}
        >
          Cada tarjeta representa un regalo físico con su dedicatoria. Podés tocar cualquier carta descubierta para releerla las veces que quieras.
        </p>
      </div>

      {/* Grid of 7 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {BTS_MEMBERS.map((member, idx) => {
          const isDrawn = drawnNumbers.includes(member.number);
          const accent = PASTEL_ACCENTS[idx];

          if (isDrawn) {
            // Unlocked Card: Festive photocard
            return (
              <div
                key={member.id}
                onClick={() => openMemberModal(member)}
                className={`group relative rounded-3xl p-5 border-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isPastel
                    ? `${accent.bg} ${accent.border} shadow-md`
                    : "bg-zinc-900 border-red-700/80 shadow-md hover:border-red-500"
                }`}
              >
                <div className="flex items-center justify-between mb-3.5">
                  <span
                    className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                      isPastel ? accent.tag : "bg-red-950 text-red-300 border border-red-800"
                    }`}
                  >
                    Regalo #0{member.number}
                  </span>
                  <span className="text-xs font-extrabold flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <span>✨</span>
                    <span>¡Descubierto!</span>
                  </span>
                </div>

                <div className="flex items-center gap-3.5 mb-3.5">
                  <MemberAvatar member={member} size="md" />
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-base font-extrabold leading-snug truncate ${
                        isPastel ? "text-purple-950" : "text-white"
                      }`}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={`text-xs font-bold truncate ${
                        isPastel ? "text-pink-600" : "text-red-400"
                      }`}
                    >
                      {member.stageName}
                    </p>
                    <span
                      className={`text-[11px] font-medium block mt-0.5 ${
                        isPastel ? "text-purple-700/70" : "text-zinc-400"
                      }`}
                    >
                      {member.koreanName} • {member.role}
                    </span>
                  </div>
                </div>

                <p
                  className={`text-xs font-medium line-clamp-2 mb-3.5 leading-relaxed ${
                    isPastel ? "text-purple-900" : "text-zinc-300"
                  }`}
                >
                  &ldquo;{member.quote}&rdquo;
                </p>

                <div
                  className={`pt-2.5 border-t text-xs font-bold flex items-center justify-between transition-colors ${
                    isPastel
                      ? `${accent.divider} text-purple-700 group-hover:text-purple-950`
                      : "border-zinc-800 text-red-400 group-hover:text-red-300"
                  }`}
                >
                  <span>Ver dedicatoria y pista</span>
                  <span className="transition-transform group-hover:translate-x-1">💜 →</span>
                </div>
              </div>
            );
          }

          // Locked / Pending Slot: Festive mystery gift box
          return (
            <div
              key={member.id}
              className={`relative rounded-3xl p-5 border-2 border-dashed flex flex-col items-center justify-center text-center transition-all duration-200 ${
                isPastel
                  ? "bg-purple-50/70 border-purple-300/80 text-purple-950 shadow-xs"
                  : "bg-zinc-950/70 border-zinc-800 text-zinc-400 shadow-xs"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2.5 shadow-xs border ${
                  isPastel
                    ? "bg-purple-200/60 border-purple-300 text-purple-700"
                    : "bg-zinc-900 border-zinc-800 text-red-400"
                }`}
              >
                🎁
              </div>
              <span
                className={`text-xs font-extrabold uppercase tracking-wider mb-1 ${
                  isPastel ? "text-purple-600" : "text-zinc-400"
                }`}
              >
                Regalo #0{member.number}
              </span>
              <h3
                className={`text-sm font-extrabold ${
                  isPastel ? "text-purple-950" : "text-zinc-200"
                }`}
              >
                {member.name}
              </h3>
              <span
                className={`text-[11px] font-medium mt-0.5 ${
                  isPastel ? "text-purple-700/60" : "text-zinc-500"
                }`}
              >
                {member.koreanName}
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full mt-3.5 border ${
                  isPastel
                    ? "bg-purple-200/70 border-purple-300 text-purple-800"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400"
                }`}
              >
                ¡Esperando su turno! ✨
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
