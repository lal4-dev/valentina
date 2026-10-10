"use client";

import React, { useState } from "react";
import { useLottery } from "@/context/LotteryContext";
import { useTheme } from "@/context/ThemeContext";

export function LotteryControls() {
  const {
    spin,
    isSpinning,
    remainingNumbers,
    drawnNumbers,
    isCompleted,
    resetLottery,
  } = useLottery();
  const { theme } = useTheme();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const isPastel = theme === "pastel";
  const total = 7;
  const countDrawn = drawnNumbers.length;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2">
      <div
        className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 ${
          isPastel
            ? "bg-white border-[#E6E1D8] shadow-paper text-[#1E1B24]"
            : "bg-[#141418] border-[#24242C] shadow-vinyl text-[#F5F5F7]"
        }`}
      >
        {/* Header Progress Counter */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-mono tracking-widest uppercase opacity-75">
              Estado de la Entrega
            </h3>
            <p className="text-base sm:text-lg font-serif font-normal mt-0.5">
              {isCompleted
                ? "Todos los regalos han sido develados"
                : `${countDrawn} de ${total} descubiertos`}
            </p>
          </div>
          <span className="text-xs font-mono font-medium opacity-60">
            {remainingNumbers.length} restantes
          </span>
        </div>

        {/* Minimal Stepper Bar */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-5">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const isDrawn = drawnNumbers.includes(num);
            return (
              <div
                key={num}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-center border transition-all duration-300 ${
                  isDrawn
                    ? isPastel
                      ? "bg-[#F0ECE4] border-[#E0DCD2] text-[#8C8678]"
                      : "bg-[#1D1D24] border-[#2A2A36] text-[#727280]"
                    : isPastel
                    ? "bg-[#FAF9F6] border-[#E8E4DA] text-[#2C2738] font-semibold"
                    : "bg-[#0E0E12] border-[#24242E] text-[#E4E4EC] font-semibold"
                }`}
              >
                <span className="text-[10px] font-mono opacity-60">#{num}</span>
                <span className="text-xs mt-0.5">
                  {isDrawn ? "—" : "•"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={spin}
            disabled={isSpinning || isCompleted}
            className={`flex-1 py-3 px-5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.99] ${
              isPastel
                ? "bg-[#252030] text-white hover:bg-[#342D44]"
                : "bg-[#C52233] text-white hover:bg-[#D92537]"
            }`}
          >
            {isSpinning
              ? "Girando..."
              : isCompleted
              ? "Colección completa"
              : countDrawn === 0
              ? "Iniciar con el primer regalo"
              : `Sortear siguiente regalo (${remainingNumbers.length} disponibles)`}
          </button>

          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            disabled={isSpinning || countDrawn === 0}
            className={`px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none ${
              isPastel
                ? "bg-[#F8F7F4] border-[#DDD7CD] text-[#555060] hover:bg-[#EFECE4]"
                : "bg-[#0E0E12] border-[#282834] text-[#8E8D99] hover:bg-[#1A1A22]"
            }`}
            title="Reiniciar el sorteo"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-reveal">
          <div
            className={`w-full max-w-sm rounded-3xl p-6 sm:p-7 border ${
              isPastel
                ? "bg-white border-[#E6E1D8] text-[#1E1B24]"
                : "bg-[#141418] border-[#262630] text-white"
            }`}
          >
            <h4 className="text-base font-serif font-normal mb-2">
              ¿Deseas reiniciar el sorteo?
            </h4>
            <p className="text-xs opacity-75 mb-6 leading-relaxed">
              Los siete números volverán a quedar disponibles en la ruleta para comenzar una nueva entrega.
            </p>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-medium border border-inherit opacity-80 hover:opacity-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  resetLottery();
                  setShowResetConfirm(false);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold text-white ${
                  isPastel ? "bg-[#252030]" : "bg-[#C52233]"
                }`}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
