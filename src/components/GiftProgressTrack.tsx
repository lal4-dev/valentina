"use client";

import React from "react";
import { useLottery } from "@/context/LotteryContext";
import { useTheme } from "@/context/ThemeContext";
import { BTS_MEMBERS } from "@/data/btsMembers";
import { MemberAvatar } from "@/components/MemberAvatar";

export function GiftProgressTrack() {
  const { drawnNumbers, openMemberModal } = useLottery();
  const { theme } = useTheme();
  const isPastel = theme === "pastel";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Editorial Section Header */}
      <div className="text-center mb-8">
        <span className="text-[10px] font-mono tracking-widest uppercase opacity-65">
          Colección de Siete Entregas
        </span>
        <h2 className="text-xl sm:text-2xl font-serif font-normal tracking-tight mt-1">
          Las Siete Fichas de Valentina
        </h2>
        <p className="text-xs max-w-md mx-auto opacity-70 mt-1 leading-relaxed">
          Cada tarjeta representa un regalo físico y un mensaje especial. Podés volver a abrir cualquier carta descubierta en cualquier momento.
        </p>
      </div>

      {/* Grid of 7 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {BTS_MEMBERS.map((member) => {
          const isDrawn = drawnNumbers.includes(member.number);

          if (isDrawn) {
            // Unlocked Card
            return (
              <div
                key={member.id}
                onClick={() => openMemberModal(member)}
                className={`group relative rounded-2xl p-4 sm:p-5 border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                  isPastel
                    ? "bg-white border-[#E6E1D8] shadow-paper hover:border-[#C8C2B6]"
                    : "bg-[#141418] border-[#24242C] shadow-vinyl hover:border-[#383844]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-wider opacity-65">
                    0{member.number} / 07
                  </span>
                  <span className="text-[10px] font-medium opacity-80 text-emerald-600 dark:text-emerald-400">
                    Desbloqueado
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <MemberAvatar member={member} size="md" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-serif font-normal truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs opacity-75 truncate">
                      {member.stageName}
                    </p>
                    <span className="text-[10px] font-mono opacity-50 block mt-0.5">
                      {member.koreanName}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-serif italic line-clamp-2 mb-3 opacity-80 leading-relaxed">
                  &ldquo;{member.quote}&rdquo;
                </p>

                <div className="pt-2 border-t border-inherit text-[11px] font-medium flex items-center justify-between opacity-75 group-hover:opacity-100 transition-opacity">
                  <span>Leer dedicatoria</span>
                  <span className="font-mono">→</span>
                </div>
              </div>
            );
          }

          // Locked / Pending Slot
          return (
            <div
              key={member.id}
              className={`relative rounded-2xl p-5 border border-dashed flex flex-col items-center justify-center text-center transition-opacity opacity-75 ${
                isPastel
                  ? "bg-[#FAF9F5] border-[#DCD7CD] text-[#7A7584]"
                  : "bg-[#0E0E12] border-[#22222A] text-[#6E6E7C]"
              }`}
            >
              <span className="text-[10px] font-mono tracking-widest opacity-60 mb-2">
                0{member.number}
              </span>
              <h3 className="text-xs font-serif font-normal">
                {member.name}
              </h3>
              <span className="text-[10px] font-mono opacity-50 mt-0.5">
                {member.koreanName}
              </span>
              <span className="text-[10px] opacity-60 mt-3">
                Pendiente de sorteo
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
