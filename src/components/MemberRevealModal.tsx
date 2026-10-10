"use client";

import React from "react";
import { useLottery } from "@/context/LotteryContext";
import { useTheme } from "@/context/ThemeContext";
import { MemberAvatar } from "@/components/MemberAvatar";

export function MemberRevealModal() {
  const { activeMember, closeMemberModal, isCompleted } = useLottery();
  const { theme } = useTheme();
  const isPastel = theme === "pastel";

  if (!activeMember) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-reveal">
      <div
        className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border transition-all duration-300 max-h-[90vh] overflow-y-auto ${
          isPastel
            ? "bg-[#FAF9F6] border-[#E2DDD3] shadow-paper text-[#1E1B24]"
            : "bg-[#141418] border-[#252530] shadow-vinyl text-[#F5F5F7]"
        }`}
      >
        {/* Dismiss Button */}
        <button
          onClick={closeMemberModal}
          type="button"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono border border-inherit opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Top Eyebrow */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-mono tracking-widest uppercase opacity-65">
            Entrega #{activeMember.number} de 07
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight mt-1">
            {activeMember.name}
          </h2>
          <p className="text-xs font-mono tracking-wider opacity-60 mt-0.5">
            {activeMember.koreanName} • {activeMember.stageName}
          </p>
        </div>

        {/* Photocard Framing */}
        <div className="flex justify-center mb-6">
          <div
            className={`p-2 rounded-3xl border transition-transform duration-300 ${
              isPastel
                ? "bg-white border-[#E6E1D8] shadow-sm"
                : "bg-[#0E0E12] border-[#22222C] shadow-sm"
            }`}
          >
            <MemberAvatar member={activeMember} size="lg" />
          </div>
        </div>

        {/* Iconic Member Note */}
        <div
          className={`px-4 py-3 rounded-2xl mb-5 text-center text-xs font-serif italic border ${
            isPastel
              ? "bg-white/80 border-[#E8E4DA] text-[#423C4E]"
              : "bg-[#0E0E12]/80 border-[#22222A] text-[#C4C4CE]"
          }`}
        >
          &ldquo;{activeMember.quote}&rdquo;
        </div>

        {/* Romantic Letter from Partner to Valentina */}
        <div
          className={`p-4 sm:p-5 rounded-2xl mb-5 border ${
            isPastel
              ? "bg-white border-[#E6E1D8] text-[#1E1B24]"
              : "bg-[#0F0F14] border-[#242430] text-[#F0F0F5]"
          }`}
        >
          <span className="block text-[10px] font-mono tracking-widest uppercase opacity-60 mb-2">
            De mí para vos
          </span>
          <p className="text-xs sm:text-sm leading-relaxed font-normal">
            {activeMember.birthdayWish}
          </p>
        </div>

        {/* Sealed Gift Hint */}
        <div
          className={`p-3.5 rounded-2xl border text-xs leading-relaxed mb-6 ${
            isPastel
              ? "bg-[#F3EFE7]/80 border-[#DDD7CC] text-[#342F3E]"
              : "bg-[#1E1215] border-[#44161D] text-[#E8CCD0]"
          }`}
        >
          <span className="font-semibold block mb-0.5 text-[10px] uppercase font-mono tracking-wider opacity-75">
            Pista del paquete físico:
          </span>
          <span className="font-medium italic">
            &ldquo;{activeMember.giftHint}&rdquo;
          </span>
        </div>

        {/* Action */}
        <button
          type="button"
          onClick={closeMemberModal}
          className={`w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            isPastel
              ? "bg-[#252030] text-white hover:bg-[#342D44]"
              : "bg-[#C52233] text-white hover:bg-[#D92537]"
          }`}
        >
          {isCompleted ? "Revisar todos los regalos" : "Continuar con el sorteo"}
        </button>
      </div>
    </div>
  );
}
