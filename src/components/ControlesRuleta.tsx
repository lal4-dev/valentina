// ============================================================================
// ARCHIVO: src/components/ControlesRuleta.tsx
// DESCRIPCIÓN: Panel de control de sorteo. Muestra el progreso de regalos (X de 7),
//              los badges de estado para cada número y el botón principal para girar.
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// React, contexto de ruleta y contexto de tema.
// ============================================================================

import React from "react";
import { useRuleta } from "@/context/ContextoRuleta";
import { useTema } from "@/context/ContextoTema";

// ============================================================================
// SECCIÓN 2: COMPONENTE CONTROLES DE RULETA
// Panel visual de interacción para Valentina.
// ============================================================================

export function ControlesRuleta() {
  const {
    girarRuleta,
    estaGirando,
    numerosRestantes,
    numerosSorteados,
    estaCompletado,
  } = useRuleta();
  const { tema } = useTema();

  const esPastel = tema === "pastel";
  const total = 7;
  const cantidadSorteados = numerosSorteados.length;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2">
      <div
        className={`p-4 sm:p-6 rounded-3xl border shadow-lg transition-all duration-300 ${
          esPastel
            ? "bg-white/90 border-purple-200/80 shadow-purple-100/50 text-purple-950"
            : "bg-zinc-950/90 border-zinc-800 shadow-zinc-950 text-white"
        }`}
      >
        {/* Encabezado: Contador de Progreso */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎁</span>
            <div>
              <h3 className="text-sm font-extrabold leading-tight">
                Progreso de Regalos
              </h3>
              <p
                className={`text-xs font-semibold ${
                  esPastel ? "text-purple-600" : "text-zinc-400"
                }`}
              >
                {estaCompletado
                  ? "¡Completaste todos los regalos! 🎉"
                  : `${cantidadSorteados} de ${total} descubiertos (${numerosRestantes.length} pendientes)`}
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
              esPastel
                ? "bg-purple-100 text-purple-800 border-purple-200"
                : "bg-red-950 text-red-200 border-red-800"
            }`}
          >
            {cantidadSorteados} / {total}
          </span>
        </div>

        {/* Insignias de estado de cada número del 1 al 7 */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const yaSorteado = numerosSorteados.includes(num);
            return (
              <div
                key={num}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                  yaSorteado
                    ? esPastel
                      ? "bg-purple-100/80 border-purple-300 text-purple-900 line-through opacity-70"
                      : "bg-zinc-800 border-zinc-700 text-zinc-500 line-through opacity-60"
                    : esPastel
                    ? "bg-purple-50/80 border-purple-200 text-purple-950 shadow-xs"
                    : "bg-zinc-900 border-red-900/60 text-red-200 shadow-xs"
                }`}
              >
                <span>#{num}</span>
                <span className="text-[10px] mt-0.5">
                  {yaSorteado ? "✓" : "✨"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Botón único de Giro (El botón de reinicio es exclusivo de /admin) */}
        <div>
          <button
            type="button"
            onClick={girarRuleta}
            disabled={estaGirando || estaCompletado}
            className={`w-full py-3.5 px-5 rounded-2xl font-bold text-sm shadow-md transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
              esPastel
                ? "bg-linear-to-r from-purple-200 via-pink-200 to-purple-300 text-purple-950 font-black border-2 border-purple-300 shadow-md hover:from-purple-300 hover:to-pink-300"
                : "bg-linear-to-r from-red-600 to-zinc-900 text-white shadow-red-950 font-black"
            }`}
          >
            {estaGirando
              ? "Girando la ruleta..."
              : estaCompletado
              ? (esPastel ? "¡Todos los regalos sorteados! 💜" : "¡Todos los regalos sorteados! ❤️")
              : cantidadSorteados === 0
              ? "Comenzar con el primer regalo 🎁"
              : `Sortear siguiente regalo (${numerosRestantes.length} disponibles)`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECCIÓN 3: EXPORTACIONES DE COMPATIBILIDAD
// ============================================================================
export const LotteryControls = ControlesRuleta;
