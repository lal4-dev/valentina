// ============================================================================
// ARCHIVO: src/components/ModalRevelacionMiembro.tsx
// DESCRIPCIÓN: Modal de celebración que se abre al develar un miembro tras el
//              giro de la ruleta. Lanza confeti y muestra la dedicatoria completa.
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// React, canvas-confetti, contexto de ruleta, contexto de tema y avatar del miembro.
// ============================================================================

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { useRuleta } from "@/context/ContextoRuleta";
import { useTema } from "@/context/ContextoTema";
import { AvatarMiembro } from "@/components/AvatarMiembro";

// ============================================================================
// SECCIÓN 2: COMPONENTE PRINCIPAL (MODAL DE REVELACIÓN)
// Renderiza el popup festivo con animación y dedicatoria personalizada.
// ============================================================================

export function ModalRevelacionMiembro() {
  const { miembroActivo, cerrarModalMiembro, estaCompletado } = useRuleta();
  const { tema } = useTema();
  const esPastel = tema === "pastel";

  // Disparar lluvia de confeti festivo al abrir el modal
  useEffect(() => {
    if (miembroActivo) {
      const colores = esPastel
        ? ["#C084FC", "#F472B6", "#FDE047", "#60A5FA", "#34D399", "#A78BFA"]
        : ["#EF4444", "#DC2626", "#FFFFFF", "#B91C1C", "#F87171"];

      // Explosión central inicial
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 },
        colors: colores,
        zIndex: 60,
      });

      // Lluvias laterales suplementarias
      const temporizador = setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.6 },
          colors: colores,
          zIndex: 60,
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.6 },
          colors: colores,
          zIndex: 60,
        });
      }, 250);

      return () => clearTimeout(temporizador);
    }
  }, [miembroActivo, esPastel]);

  if (!miembroActivo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-pop">
      <div
        className={`relative w-full max-w-lg rounded-3xl p-5 sm:p-6 md:p-7 border-2 shadow-2xl transition-all duration-300 max-h-[92vh] overflow-y-auto ${
          esPastel
            ? "bg-linear-to-b from-white via-purple-50/70 to-pink-50/50 border-purple-200 shadow-purple-300/50 text-purple-950"
            : "bg-zinc-950 border-red-800 shadow-red-950 text-white"
        }`}
      >
        {/* Botón de cierre */}
        <button
          onClick={cerrarModalMiembro}
          type="button"
          className={`absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm font-bold border transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer ${
            esPastel
              ? "bg-purple-100/80 text-purple-700 border-purple-200 hover:bg-purple-200"
              : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
          }`}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Encabezado del regalo */}
        <div className="flex flex-col items-center text-center mb-3 sm:mb-4">
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full text-[11px] sm:text-xs font-extrabold uppercase tracking-wider mb-2 shadow-xs border ${
              esPastel
                ? "bg-purple-100 text-purple-700 border-purple-200"
                : "bg-red-950 text-red-200 border-red-800"
            }`}
          >
            <span>🎁</span>
            <span>REGALO #{miembroActivo.numero} DESBLOQUEADO</span>
          </div>

          <h2
            className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight ${
              esPastel ? "text-purple-950" : "text-white"
            }`}
          >
            {miembroActivo.nombre}{" "}
            <span
              className={`text-base sm:text-lg font-bold ${
                esPastel ? "text-pink-600" : "text-red-400"
              }`}
            >
              ({miembroActivo.nombreArtistico})
            </span>
          </h2>

          <p
            className={`text-[11px] sm:text-xs mt-0.5 font-semibold ${
              esPastel ? "text-purple-600" : "text-zinc-400"
            }`}
          >
            {miembroActivo.nombreCoreano} • {miembroActivo.rol}
          </p>
        </div>

        {/* Avatar grande del integrante */}
        <div className="flex justify-center mb-3 sm:mb-4">
          <AvatarMiembro
            miembro={miembroActivo}
            tamano="lg"
            className="border-3 shadow-lg"
          />
        </div>

        {/* Cita célebre del integrante */}
        <div
          className={`p-3 rounded-2xl border mb-3 sm:mb-4 text-center text-xs font-semibold ${
            esPastel
              ? "bg-purple-100/60 border-purple-200 text-purple-900"
              : "bg-zinc-900/80 border-zinc-800 text-zinc-300"
          }`}
        >
          <span className="block text-[10px] uppercase font-bold tracking-wider opacity-60 mb-0.5">
            Cita de {miembroActivo.nombreArtistico}
          </span>
          <p className="italic leading-relaxed">&ldquo;{miembroActivo.frase}&rdquo;</p>
        </div>

        {/* Pista del regalo físico */}
        <div
          className={`p-3 rounded-2xl border mb-3 sm:mb-4 text-xs ${
            esPastel
              ? "bg-amber-50/80 border-amber-200 text-amber-950"
              : "bg-zinc-900/90 border-red-900/50 text-red-200"
          }`}
        >
          <span className="font-extrabold block text-[11px] uppercase tracking-wide mb-1">
            🎁 Pista de tu regalo:
          </span>
          <p className="font-medium italic leading-relaxed">
            &ldquo;{miembroActivo.pistaRegalo}&rdquo;
          </p>
        </div>

        {/* Carta personal de cumpleaños */}
        <div
          className={`p-4 rounded-2xl border mb-4 ${
            esPastel
              ? "bg-white/90 border-pink-200 text-purple-950 shadow-sm"
              : "bg-zinc-900 border-zinc-800 text-white"
          }`}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <span>{esPastel ? "💜" : "❤️"}</span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-pink-700 dark:text-red-400">
              Para vos, mi amor:
            </span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed font-medium">
            {miembroActivo.deseoCumpleanios}
          </p>
        </div>

        {/* Botón de acción final para continuar sorteando */}
        <button
          onClick={cerrarModalMiembro}
          type="button"
          className={`w-full py-3 px-4 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
            esPastel
              ? "bg-linear-to-r from-purple-200 via-pink-200 to-purple-300 text-purple-950 border-2 border-purple-300 shadow-purple-200/50"
              : "bg-red-600 text-white shadow-red-950 hover:bg-red-700"
          }`}
        >
          {estaCompletado
            ? (esPastel ? "¡Ver todos mis regalos completados! 💜" : "¡Ver todos mis regalos completados! ❤️")
            : "¡Guardar y seguir sorteando! 🎁"}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// SECCIÓN 3: EXPORTACIONES DE COMPATIBILIDAD
// ============================================================================
export const MemberRevealModal = ModalRevelacionMiembro;
