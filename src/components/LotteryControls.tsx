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
  const progressPercent = Math.round((drawnNumbers.length / total) * 100);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-3">
      {/* Progress & Counter Card */}
      <div
        className={`p-4 sm:p-5 rounded-2xl backdrop-blur-md border shadow-lg transition-all duration-300 ${
          isPastel
            ? "bg-white/80 border-purple-200/80 shadow-purple-100"
            : "bg-zinc-900/80 border-zinc-800 shadow-zinc-950"
        }`}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎁</span>
            <div>
              <h3
                className={`text-sm font-bold leading-tight ${
                  isPastel ? "text-purple-950" : "text-white"
                }`}
              >
                Progreso de Regalos
              </h3>
              <p
                className={`text-xs ${
                  isPastel ? "text-purple-600" : "text-zinc-400"
                }`}
              >
                {isCompleted
                  ? "¡Completaste todos los regalos!"
                  : `${drawnNumbers.length} de 7 descubiertos (${remainingNumbers.length} pendientes)`}
              </p>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
              isPastel
                ? "bg-purple-100 text-purple-800 border-purple-200"
                : "bg-red-950/80 text-red-200 border-red-800"
            }`}
          >
            {progressPercent}%
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className={`w-full h-3 rounded-full overflow-hidden mb-4 border ${
            isPastel
              ? "bg-purple-100/70 border-purple-200"
              : "bg-zinc-800 border-zinc-700"
          }`}
        >
          <div
            className={`h-full transition-all duration-700 rounded-full ${
              isPastel
                ? "bg-gradient-to-r from-purple-500 via-pink-400 to-amber-400"
                : "bg-gradient-to-r from-red-700 via-red-500 to-red-400"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Numbers Status Badges */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const isDrawn = drawnNumbers.includes(num);
            return (
              <div
                key={num}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl border text-xs font-bold transition-all duration-300 ${
                  isDrawn
                    ? isPastel
                      ? "bg-purple-100/90 border-purple-300 text-purple-900 line-through opacity-70"
                      : "bg-zinc-800 border-zinc-700 text-zinc-500 line-through opacity-60"
                    : isPastel
                    ? "bg-white border-purple-200 text-purple-900 shadow-sm"
                    : "bg-zinc-950 border-red-900/60 text-red-300 shadow-sm"
                }`}
              >
                <span>#{num}</span>
                <span className="text-[10px]">
                  {isDrawn ? "✓" : "✨"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={spin}
            disabled={isSpinning || isCompleted}
            className={`flex-1 py-3 px-5 rounded-xl font-extrabold text-sm shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${
              isPastel
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-purple-300/60"
                : "bg-gradient-to-r from-red-600 to-zinc-900 text-white shadow-red-950"
            }`}
          >
            {isSpinning
              ? "Girando la ruleta..."
              : isCompleted
              ? "¡Todos los regalos sorteados! 🎉"
              : drawnNumbers.length === 0
              ? "Iniciar con el primer regalo 🎁"
              : `Sortear siguiente regalo (${remainingNumbers.length} disponibles)`}
          </button>

          {/* Reset button */}
          <button
            onClick={() => setShowResetConfirm(true)}
            disabled={isSpinning || drawnNumbers.length === 0}
            className={`px-3.5 py-3 rounded-xl text-xs font-bold border transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none ${
              isPastel
                ? "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
            }`}
            title="Reiniciar sorteo"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-sm rounded-2xl p-6 border shadow-2xl ${
              isPastel
                ? "bg-white border-purple-200 text-purple-950"
                : "bg-zinc-900 border-red-900 text-white"
            }`}
          >
            <div className="text-3xl mb-2 text-center">⚠️</div>
            <h4 className="text-base font-bold text-center mb-1">
              ¿Reiniciar el sorteo?
            </h4>
            <p className="text-xs text-center mb-5 opacity-80">
              Esta acción volverá a habilitar los 7 números como pendientes para que puedan sortearse de nuevo.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  resetLottery();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700"
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
