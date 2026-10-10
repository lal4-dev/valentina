"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { useLottery } from "@/context/LotteryContext";
import { useTheme } from "@/context/ThemeContext";
import { MemberAvatar } from "@/components/MemberAvatar";

export function MemberRevealModal() {
  const { activeMember, closeMemberModal, isCompleted } = useLottery();
  const { theme } = useTheme();
  const isPastel = theme === "pastel";

  // Trigger celebration confetti when modal opens
  useEffect(() => {
    if (activeMember) {
      const colors = isPastel
        ? ["#C084FC", "#F472B6", "#FDE047", "#60A5FA", "#34D399", "#A78BFA"]
        : ["#EF4444", "#DC2626", "#FFFFFF", "#B91C1C", "#F87171"];

      // Initial center explosion
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 },
        colors,
        zIndex: 60,
      });

      // Side showers for extra celebration
      const timer = setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.6 },
          colors,
          zIndex: 60,
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.6 },
          colors,
          zIndex: 60,
        });
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [activeMember, isPastel]);

  if (!activeMember) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-pop">
      <div
        className={`relative w-full max-w-lg rounded-3xl p-5 sm:p-6 md:p-7 border-2 shadow-2xl transition-all duration-300 max-h-[92vh] overflow-y-auto ${
          isPastel
            ? "bg-linear-to-b from-white via-purple-50/70 to-pink-50/50 border-purple-200 shadow-purple-300/50 text-purple-950"
            : "bg-zinc-950 border-red-800 shadow-red-950 text-white"
        }`}
      >
        {/* Dismiss Button */}
        <button
          onClick={closeMemberModal}
          type="button"
          className={`absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm font-bold border transition-all duration-200 hover:scale-110 active:scale-90 ${
            isPastel
              ? "bg-purple-100/80 text-purple-700 border-purple-200 hover:bg-purple-200"
              : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
          }`}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-3 sm:mb-4">
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full text-[11px] sm:text-xs font-extrabold uppercase tracking-wider mb-2 shadow-xs border ${
              isPastel
                ? "bg-purple-100 text-purple-700 border-purple-200"
                : "bg-red-950 text-red-200 border-red-800"
            }`}
          >
            <span>🎁</span>
            <span>REGALO #{activeMember.number} DESBLOQUEADO</span>
          </div>

          <h2
            className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight ${
              isPastel ? "text-purple-950" : "text-white"
            }`}
          >
            {activeMember.name}{" "}
            <span
              className={`text-base sm:text-lg font-bold ${
                isPastel ? "text-pink-600" : "text-red-400"
              }`}
            >
              ({activeMember.stageName})
            </span>
          </h2>

          <p
            className={`text-[11px] sm:text-xs mt-0.5 font-semibold ${
              isPastel ? "text-purple-600" : "text-zinc-400"
            }`}
          >
            {activeMember.realName} • {activeMember.koreanName} • {activeMember.role}
          </p>
        </div>

        {/* Center: Member Photo / Avatar */}
        <div className="flex justify-center mb-3.5 sm:mb-4">
          <div className="relative group">
            <div
              className={`absolute -inset-2 rounded-3xl blur-lg opacity-50 transition duration-300 ${
                isPastel ? "bg-purple-300" : "bg-red-600"
              }`}
            />
            <MemberAvatar member={activeMember} size="lg" className="relative z-10 shadow-md" />
          </div>
        </div>

        {/* Iconic Quote */}
        <div
          className={`p-3.5 rounded-2xl mb-4 border text-xs sm:text-sm text-center leading-relaxed font-semibold ${
            isPastel
              ? "bg-purple-100/60 border-purple-200 text-purple-900"
              : "bg-zinc-900 border-red-900/50 text-zinc-200"
          }`}
        >
          &ldquo;{activeMember.quote}&rdquo;
        </div>

        {/* Intimate Letter */}
        <div
          className={`p-4 sm:p-5 rounded-2xl mb-4 border ${
            isPastel
              ? "bg-white/95 border-purple-200 shadow-sm text-purple-950"
              : "bg-zinc-900 border-zinc-800 text-zinc-100"
          }`}
        >
          <div className="flex items-center gap-1.5 font-extrabold mb-1.5 text-xs text-pink-600 dark:text-red-400 uppercase tracking-wider">
            <span>💌</span>
            <span>Mi dedicatoria para vos</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed font-medium">
            {activeMember.birthdayWish}
          </p>
        </div>

        {/* Physical Gift Clue */}
        <div
          className={`p-3.5 rounded-xl border text-xs leading-relaxed mb-5 ${
            isPastel
              ? "bg-amber-50 border-amber-200 text-amber-950"
              : "bg-red-950/60 border-red-900 text-red-100"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">🎀</span>
            <span className="font-extrabold uppercase text-[11px] tracking-wide">
              Pista del regalo #{activeMember.number}:
            </span>
          </div>
          <p className="font-bold text-xs sm:text-sm pl-6 text-pink-700 dark:text-red-300">
            &ldquo;{activeMember.giftHint}&rdquo;
          </p>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={closeMemberModal}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
            isPastel
              ? "bg-linear-to-r from-purple-200 via-pink-200 to-purple-300 text-purple-950 font-black border-2 border-purple-300 shadow-md hover:from-purple-300 hover:to-pink-300"
              : "bg-linear-to-r from-red-600 to-zinc-900 text-white shadow-red-950 font-black"
          }`}
        >
          {isCompleted ? "¡Ver todos los regalos en la galería! 💜" : "¡Continuar el sorteo! 🎁"}
        </button>
      </div>
    </div>
  );
}
