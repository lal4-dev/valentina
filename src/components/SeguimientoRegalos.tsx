// ============================================================================
// ARCHIVO: src/components/SeguimientoRegalos.tsx
// DESCRIPCIÓN: Galería de seguimiento de los 7 regalos. Muestra photocards de
//              los miembros desbloqueados y tarjetas bloqueadas con pistas.
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// React, contexto de ruleta, contexto de tema, datos de BTS y avatar del miembro.
// ============================================================================

import React from "react";
import { useRuleta } from "@/context/ContextoRuleta";
import { useTema } from "@/context/ContextoTema";
import { MIEMBROS_BTS } from "@/data/miembrosBts";
import { AvatarMiembro } from "@/components/AvatarMiembro";

// ============================================================================
// SECCIÓN 2: ESTILOS DE ACENTO PARA CADA INTEGRANTE EN MODO PASTEL
// Colores armoniosos personalizados por integrante para modo Pastel.
// ============================================================================

const ACENTOS_PASTEL = [
  { fondo: "bg-purple-100/90", borde: "border-purple-300", etiqueta: "bg-purple-200 text-purple-900", divisor: "border-purple-200" },   // 1: Yoongi
  { fondo: "bg-pink-100/90", borde: "border-pink-300", etiqueta: "bg-pink-200 text-pink-900", divisor: "border-pink-200" },             // 2: Tae
  { fondo: "bg-amber-100/90", borde: "border-amber-300", etiqueta: "bg-amber-200 text-amber-900", divisor: "border-amber-200" },        // 3: Jimin
  { fondo: "bg-sky-100/90", borde: "border-sky-300", etiqueta: "bg-sky-200 text-sky-900", divisor: "border-sky-200" },                 // 4: Namjoon
  { fondo: "bg-orange-100/90", borde: "border-orange-300", etiqueta: "bg-orange-200 text-orange-900", divisor: "border-orange-200" },   // 5: Jin
  { fondo: "bg-emerald-100/90", borde: "border-emerald-300", etiqueta: "bg-emerald-200 text-emerald-900", divisor: "border-emerald-200" },// 6: Hobi
  { fondo: "bg-violet-100/90", borde: "border-violet-300", etiqueta: "bg-violet-200 text-violet-900", divisor: "border-violet-200" },   // 7: Jungkook
];

// ============================================================================
// SECCIÓN 3: COMPONENTE PRINCIPAL (SEGUIMIENTO DE REGALOS)
// Cuadrícula responsive de 7 tarjetas con estados bloqueado y descubierto.
// ============================================================================

export function SeguimientoRegalos() {
  const { numerosSorteados, abrirModalMiembro } = useRuleta();
  const { tema } = useTema();
  const esPastel = tema === "pastel";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Encabezado festivo */}
      <div className="text-center mb-8">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 ${
            esPastel
              ? "bg-purple-100 text-purple-800 border border-purple-200"
              : "bg-red-950 text-red-200 border border-red-800"
          }`}
        >
          <span>🎉</span>
          <span>Los 7 Regalos de Cumpleaños</span>
          <span>🎉</span>
        </span>
        <h2
          className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${
            esPastel ? "text-purple-950" : "text-white"
          }`}
        >
          Tus Regalos y Mensajes Especiales
        </h2>
        <p
          className={`text-xs sm:text-sm max-w-md mx-auto mt-1.5 font-medium leading-relaxed ${
            esPastel ? "text-purple-800/80" : "text-zinc-400"
          }`}
        >
          Cada tarjeta representa un regalo físico con su dedicatoria. Podés tocar cualquier carta descubierta para releerla las veces que quieras.
        </p>
      </div>

      {/* Cuadrícula de 7 tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {MIEMBROS_BTS.map((miembro, idx) => {
          const yaSorteado = numerosSorteados.includes(miembro.numero);
          const acento = ACENTOS_PASTEL[idx];

          if (yaSorteado) {
            // Tarjeta Descubierta: Photocard festiva interactiva
            return (
              <div
                key={miembro.id}
                onClick={() => abrirModalMiembro(miembro)}
                className={`group relative rounded-3xl p-5 border-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  esPastel
                    ? `${acento.fondo} ${acento.borde} shadow-md`
                    : "bg-zinc-900 border-red-700/80 shadow-md hover:border-red-500"
                }`}
              >
                <div className="flex items-center justify-between mb-3.5">
                  <span
                    className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                      esPastel ? acento.etiqueta : "bg-red-950 text-red-300 border border-red-800"
                    }`}
                  >
                    Regalo #0{miembro.numero}
                  </span>
                  <span className="text-xs font-extrabold flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <span>✨</span>
                    <span>¡Descubierto!</span>
                  </span>
                </div>

                <div className="flex items-center gap-3.5 mb-3.5">
                  <AvatarMiembro miembro={miembro} tamano="md" />
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-base font-extrabold leading-snug truncate ${
                        esPastel ? "text-purple-950" : "text-white"
                      }`}
                    >
                      {miembro.nombre}
                    </h3>
                    <p
                      className={`text-xs font-bold truncate ${
                        esPastel ? "text-pink-600" : "text-red-400"
                      }`}
                    >
                      {miembro.nombreArtistico}
                    </p>
                    <span
                      className={`text-[11px] font-medium block mt-0.5 ${
                        esPastel ? "text-purple-700/70" : "text-zinc-400"
                      }`}
                    >
                      {miembro.nombreCoreano} • {miembro.rol}
                    </span>
                  </div>
                </div>

                {/* Vista previa de la dedicatoria */}
                <p
                  className={`text-xs italic line-clamp-2 leading-relaxed mb-3.5 pt-2 border-t ${
                    esPastel
                      ? `${acento.divisor} text-purple-900/90 font-medium`
                      : "border-zinc-800 text-zinc-300"
                  }`}
                >
                  &ldquo;{miembro.deseoCumpleanios}&rdquo;
                </p>

                <div className="text-center">
                  <span
                    className={`inline-block text-[11px] font-extrabold py-1 px-3 rounded-full transition-transform group-hover:scale-105 ${
                      esPastel
                        ? "bg-white text-purple-900 border border-purple-200 shadow-xs"
                        : "bg-red-950 text-red-200 border border-red-800"
                    }`}
                  >
                    Tocar para abrir dedicatoria →
                  </span>
                </div>
              </div>
            );
          }

          // Tarjeta Bloqueada: Contiene la pista secreta
          return (
            <div
              key={miembro.id}
              className={`rounded-3xl p-5 border-2 border-dashed transition-all duration-300 flex flex-col justify-between ${
                esPastel
                  ? "bg-purple-50/50 border-purple-200/80 text-purple-950"
                  : "bg-zinc-950/60 border-zinc-800 text-zinc-400"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                      esPastel ? "bg-purple-100 text-purple-700" : "bg-zinc-900 text-zinc-400"
                    }`}
                  >
                    Regalo #0{miembro.numero}
                  </span>
                  <span className="text-xs opacity-60 font-bold">🔒 Bloqueado</span>
                </div>

                <div className="text-center py-4">
                  <div
                    className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-2.5 border ${
                      esPastel
                        ? "bg-purple-100/70 border-purple-200 text-purple-600"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500"
                    }`}
                  >
                    🎁
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider opacity-75">
                    Girá la ruleta para descubrir
                  </p>
                </div>
              </div>

              {/* Pista del regalo misterioso */}
              <div
                className={`p-2.5 rounded-2xl text-[11px] border font-medium ${
                  esPastel
                    ? "bg-white/80 border-purple-100 text-purple-800"
                    : "bg-zinc-900/60 border-zinc-800/80 text-zinc-400"
                }`}
              >
                <span className="font-extrabold block mb-0.5">💡 Pista del regalo:</span>
                <span className="italic leading-tight">&ldquo;{miembro.pistaRegalo}&rdquo;</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// SECCIÓN 4: EXPORTACIONES DE COMPATIBILIDAD
// ============================================================================
export const GiftProgressTrack = SeguimientoRegalos;
