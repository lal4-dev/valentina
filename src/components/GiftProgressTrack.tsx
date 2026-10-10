"use client";

import React from "react";
import { useLottery } from "@/context/LotteryContext";
import { useTheme } from "@/context/ThemeContext";
import { BTS_MEMBERS, BTSMember } from "@/data/btsMembers";
import { MemberAvatar } from "@/components/MemberAvatar";

export function GiftProgressTrack() {
  const { drawnNumbers, openMemberModal } = useLottery();
  const { theme } = useTheme();
  const isPastel = theme === "pastel";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border shadow-sm">
          <span>{isPastel ? "🌸" : "🔥"}</span>
          <span>Colección de los 7 Regalos</span>
        </div>
        <h2
          className={`text-xl sm:text-2xl font-black tracking-tight ${
            isPastel ? "text-purple-950" : "text-white"
          }`}
        >
          Los 7 Integrantes &amp; Regalos de Cumpleaños
        </h2>
        <p
          className={`text-xs sm:text-sm mt-1 max-w-lg mx-auto ${
            isPastel ? "text-purple-700/80" : "text-zinc-400"
          }`}
        >
          A medida que la ruleta gira, cada integrante revela su regalo y su mensaje. Hacé clic en
          cualquiera desbloqueado para volver a leerlo.
        </p>
      </div>

      {/* Grid of 7 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {BTS_MEMBERS.map((member) => {
          const isDrawn = drawnNumbers.includes(member.number);
          const palette = isPastel ? member.palette.pastel : member.palette.arirang;

          if (isDrawn) {
            // Unlocked Card
            return (
              <div
                key={member.id}
                onClick={() => openMemberModal(member)}
                className={`group relative overflow-hidden rounded-3xl p-4 sm:p-5 border-2 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isPastel
                    ? "bg-white/90 border-purple-200/90 shadow-purple-100 hover:border-purple-400"
                    : "bg-zinc-900/90 border-red-900/60 shadow-black hover:border-red-600"
                }`}
              >
                {/* Glow accent */}
                <div
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-40 transition-opacity group-hover:opacity-80"
                  style={{ backgroundColor: palette.primary }}
                />

                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${palette.badge}`}
                  >
                    REGALO #{member.number}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span>✓</span> Desbloqueado
                  </span>
                </div>

                <div className="flex items-center gap-3.5 mb-3">
                  <MemberAvatar member={member} size="md" />
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-base font-black truncate leading-tight ${
                        isPastel ? "text-purple-950" : "text-white"
                      }`}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={`text-xs font-semibold ${
                        isPastel ? "text-purple-600" : "text-red-400"
                      }`}
                    >
                      {member.stageName}
                    </p>
                    <p
                      className={`text-[10px] truncate ${
                        isPastel ? "text-zinc-500" : "text-zinc-400"
                      }`}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-xs italic line-clamp-2 mb-3.5 ${
                    isPastel ? "text-purple-900/80" : "text-zinc-300"
                  }`}
                >
                  &ldquo;{member.quote}&rdquo;
                </p>

                <div className="pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-bold">
                  <span
                    className={isPastel ? "text-purple-600 group-hover:underline" : "text-red-400 group-hover:underline"}
                  >
                    Ver dedicatoria 💌
                  </span>
                  <span>→</span>
                </div>
              </div>
            );
          }

          // Locked / Pending Mystery Card
          return (
            <div
              key={member.id}
              className={`relative overflow-hidden rounded-3xl p-5 border-2 border-dashed flex flex-col items-center justify-center text-center transition-all duration-300 opacity-80 hover:opacity-100 ${
                isPastel
                  ? "bg-purple-50/40 border-purple-200 text-purple-900"
                  : "bg-zinc-950/60 border-zinc-800 text-zinc-400"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl mb-2 flex items-center justify-center text-2xl shadow-inner border border-white/30 bg-white/60 dark:bg-zinc-900/80">
                🎁
              </div>
              <span
                className={`text-[11px] font-black px-2.5 py-0.5 rounded-full mb-1.5 border ${
                  isPastel
                    ? "bg-purple-100/70 border-purple-200 text-purple-800"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400"
                }`}
              >
                REGALO #{member.number}
              </span>
              <h3 className="text-sm font-bold leading-tight">
                {member.name} ({member.stageName})
              </h3>
              <p className="text-[11px] opacity-70 mt-1">Pendiente en la ruleta 🔒</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
