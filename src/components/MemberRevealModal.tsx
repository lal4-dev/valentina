"use client";

import React, { useEffect, useState } from "react";
import { useLottery } from "@/context/LotteryContext";
import { useTheme } from "@/context/ThemeContext";
import { MemberAvatar } from "@/components/MemberAvatar";

export function MemberRevealModal() {
  const { activeMember, closeMemberModal, isCompleted } = useLottery();
  const { theme } = useTheme();
  const isPastel = theme === "pastel";

  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (activeMember) {
      setAnimateIn(true);
    } else {
      setAnimateIn(false);
    }
  }, [activeMember]);

  if (!activeMember) return null;

  const palette = isPastel ? activeMember.palette.pastel : activeMember.palette.arirang;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all duration-300">
      {/* Floating Sparkles & Confetti Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <span className="absolute -top-10 left-10 text-4xl animate-bounce duration-700">
          ✨
        </span>
        <span className="absolute top-20 right-12 text-3xl animate-pulse duration-1000">
          💜
        </span>
        <span className="absolute bottom-16 left-14 text-4xl animate-spin duration-3000">
          🎉
        </span>
        <span className="absolute -bottom-8 right-16 text-3xl animate-bounce duration-500">
          ⭐
        </span>
      </div>

      {/* Main Card Container */}
      <div
        className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border-2 shadow-2xl transition-all duration-500 transform ${
          animateIn ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
        } ${
          isPastel
            ? "bg-gradient-to-b from-white via-purple-50/70 to-pink-50/50 border-purple-200 shadow-purple-300/50 text-purple-950"
            : "bg-gradient-to-b from-zinc-950 via-zinc-900 to-black border-red-800 shadow-red-950 text-white"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={closeMemberModal}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border transition-all duration-200 hover:scale-110 active:scale-90 ${
            isPastel
              ? "bg-purple-100/80 text-purple-700 border-purple-200 hover:bg-purple-200"
              : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
          }`}
          title="Cerrar"
        >
          ✕
        </button>

        {/* Gift Number & Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <div
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase mb-3 shadow-sm border ${palette.badge}`}
          >
            <span>🎁</span>
            <span>REGALO #{activeMember.number} DESBLOQUEADO</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl font-black tracking-tight"
            style={{ color: isPastel ? palette.accent : palette.accent }}
          >
            {activeMember.name}{" "}
            <span className="text-lg font-bold opacity-80">({activeMember.stageName})</span>
          </h2>
          <p
            className={`text-xs mt-0.5 font-medium ${
              isPastel ? "text-purple-600" : "text-zinc-400"
            }`}
          >
            {activeMember.realName} • {activeMember.koreanName} • {activeMember.role}
          </p>
        </div>

        {/* Center: Member Avatar Photo */}
        <div className="flex justify-center mb-5">
          <div className="relative group">
            <div
              className="absolute -inset-2 rounded-3xl blur-lg opacity-60 transition duration-500 group-hover:opacity-100"
              style={{ backgroundColor: palette.primary }}
            />
            <MemberAvatar member={activeMember} size="xl" className="relative z-10" />
          </div>
        </div>

        {/* Quote Section */}
        <div
          className={`p-3.5 rounded-2xl mb-4 border italic text-xs sm:text-sm text-center leading-relaxed ${
            isPastel
              ? "bg-purple-100/40 border-purple-200/80 text-purple-900"
              : "bg-zinc-900/90 border-red-900/40 text-zinc-200"
          }`}
        >
          &ldquo;{activeMember.quote}&rdquo;
        </div>

        {/* Birthday Wish Section */}
        <div
          className={`p-4 rounded-2xl mb-4 border text-xs sm:text-sm leading-relaxed ${
            isPastel
              ? "bg-white/90 border-purple-200 shadow-sm text-purple-950"
              : "bg-zinc-900 border-zinc-800 text-zinc-100"
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1.5 text-xs text-pink-600 dark:text-red-400 uppercase tracking-wider">
            <span>💌</span>
            <span>Dedicatoria para Valentina</span>
          </div>
          <p className="font-medium">{activeMember.birthdayWish}</p>
        </div>

        {/* Gift Hint */}
        <div
          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs ${
            isPastel
              ? "bg-amber-50/70 border-amber-200/80 text-amber-900"
              : "bg-red-950/40 border-red-900/60 text-red-200"
          }`}
        >
          <span className="text-lg">🎀</span>
          <div>
            <span className="font-bold">Pista del regalo #{activeMember.number}:</span>{" "}
            <span>{activeMember.giftHint}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex gap-2">
          <button
            onClick={closeMemberModal}
            className={`w-full py-3 px-4 rounded-xl font-extrabold text-sm shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
              isPastel
                ? "bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white shadow-purple-200"
                : "bg-gradient-to-r from-red-600 via-red-500 to-zinc-900 text-white shadow-red-950"
            }`}
          >
            {isCompleted ? "¡Ver todos los regalos en la galería! 💜" : "¡Continuar el sorteo! 🎁"}
          </button>
        </div>
      </div>
    </div>
  );
}
