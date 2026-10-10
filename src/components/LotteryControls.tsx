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
        className={`p-5 sm:p-6 rounded-3xl border shadow-lg transition-all duration-300 ${
          isPastel
            ? "bg-white/90 border-purple-200/80 shadow-purple-100/50 text-purple-950"
            : "bg-zinc-950/90 border-zinc-800 shadow-zinc-950 text-white"
        }`}
      >
        {/* Header Progress Counter */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎁</span>
            <div>
              <h3 className="text-sm font-extrabold leading-tight">
                Progreso de Regalos
              </h3>
              <p
                className={`text-xs font-semibold ${
                  isPastel ? "text-purple-600" : "text-zinc-400"
                }`}
              >
                {isCompleted
                  ? "¡Completaste todos los regalos! 🎉"
                  : `${countDrawn} de ${total} descubiertos (${remainingNumbers.length} pendientes)`}
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
              isPastel
                ? "bg-purple-100 text-purple-800 border-purple-200"
                : "bg-red-950 text-red-200 border-red-800"
            }`}
          >
            {countDrawn} / {total}
          </span>
        </div>

        {/* Numbers Status Badges - Clean and aligned */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const isDrawn = drawnNumbers.includes(num);
            return (
              <div
                key={num}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                  isDrawn
                    ? isPastel
                      ? "bg-purple-100/80 border-purple-300 text-purple-900 line-through opacity-70"
                      : "bg-zinc-800 border-zinc-700 text-zinc-500 line-through opacity-60"
                    : isPastel
                    ? "bg-purple-50/80 border-purple-200 text-purple-950 shadow-xs"
                    : "bg-zinc-900 border-red-900/60 text-red-200 shadow-xs"
                }`}
              >
                <span>#{num}</span>
                <span className="text-[10px] mt-0.5">
                  {isDrawn ? "✓" : "✨"}
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
            className={`flex-1 py-3.5 px-5 rounded-2xl font-bold text-sm shadow-md transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none hover:scale-[1.02] active:scale-[0.98] ${
              isPastel
                ? "bg-linear-to-r from-purple-600 via-violet-600 to-purple-700 text-white shadow-purple-300/40 hover:from-purple-500 hover:to-purple-600"
                : "bg-linear-to-r from-red-600 to-zinc-900 text-white shadow-red-950"
            }`}
          >
            {isSpinning
              ? "Girando la ruleta..."
              : isCompleted
              ? "¡Todos los regalos sorteados! 💜"
              : countDrawn === 0
              ? "Comenzar con el primer regalo 🎁"
              : `Sortear siguiente regalo (${remainingNumbers.length} disponibles)`}
          </button>

          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            disabled={isSpinning || countDrawn === 0}
            className={`px-3.5 py-3 rounded-2xl text-xs font-bold border transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none ${
              isPastel
                ? "bg-purple-100/70 text-purple-800 border-purple-200 hover:bg-purple-200"
                : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
            }`}
            title="Reiniciar sorteo"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop">
          <div
            className={`w-full max-w-sm rounded-3xl p-6 sm:p-7 border shadow-2xl ${
              isPastel
                ? "bg-white border-purple-200 text-purple-950"
                : "bg-zinc-900 border-red-900 text-white"
            }`}
          >
            <div className="text-3xl mb-2 text-center">⚠️</div>
            <h4 className="text-base font-bold text-center mb-1">
              ¿Reiniciar el sorteo?
            </h4>
            <p className="text-xs text-center opacity-80 mb-5 leading-relaxed">
              Los siete números volverán a quedar disponibles para comenzar una nueva entrega de regalos.
            </p>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  resetLottery();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700"
              >
                Sí, reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
