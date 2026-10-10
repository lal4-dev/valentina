// ============================================================================
// ARCHIVO: src/components/ContadorConcierto.tsx
// DESCRIPCIÓN: Contador en tiempo real hacia el concierto BTS Arirang en Argentina:
//              24 de Octubre de 2026, 20:00 hs (hora de Argentina, UTC-3).
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// React, useSyncExternalStore para sincronizar el segundero sin errores de SSR,
// y contexto de tema para el diseño adaptable.
// ============================================================================

import React, { useSyncExternalStore } from "react";
import { useTema } from "@/context/ContextoTema";

// ============================================================================
// SECCIÓN 2: CONSTANTES Y FECHA OBJETIVO DEL CONCIERTO
// 24 de octubre de 2026, 20:00 hs (hora de Argentina, UTC-3).
// ============================================================================

const FECHA_CONCIERTO_ISO = "2026-10-24T20:00:00-03:00";
const TIMESTAMP_CONCIERTO = new Date(FECHA_CONCIERTO_ISO).getTime();

// Función de suscripción al temporizador por segundo
function suscribirSegundero(notificarCambio: () => void) {
  const temporizador = setInterval(notificarCambio, 1000);
  return () => clearInterval(temporizador);
}

// Cálculo del tiempo restante en formato días, horas, minutos y segundos
function obtenerInstantaneaCuentaRegresiva(): string {
  const diferencia = TIMESTAMP_CONCIERTO - Date.now();
  if (diferencia <= 0) {
    return "PASADO";
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  const rellenar = (n: number) => String(n).padStart(2, "0");
  return `${dias}d ${rellenar(horas)}h ${rellenar(minutos)}m ${rellenar(segundos)}s`;
}

// Valor seguro para la primera pasada de renderizado en servidor
function obtenerInstantaneaServidor(): string {
  return "CALCULANDO";
}

// ============================================================================
// SECCIÓN 3: COMPONENTE PRINCIPAL (CONTADOR CONCIERTO)
// Muestra el ticker con animación de pulso y diseño adaptativo.
// ============================================================================

export function ContadorConcierto() {
  const { tema } = useTema();
  const esPastel = tema === "pastel";

  const textoCuentaRegresiva = useSyncExternalStore(
    suscribirSegundero,
    obtenerInstantaneaCuentaRegresiva,
    obtenerInstantaneaServidor
  );

  // Estado inicial mientras se sincroniza en el cliente
  if (textoCuentaRegresiva === "CALCULANDO") {
    return (
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-colors shadow-xs ${
          esPastel
            ? "bg-purple-100/90 text-purple-900 border-purple-300"
            : "bg-red-950/90 text-red-200 border-red-800"
        }`}
      >
        <span>🇦🇷</span>
        <span>Concierto Arirang • 24 Oct</span>
      </div>
    );
  }

  // Si ya llegó la fecha del concierto
  if (textoCuentaRegresiva === "PASADO") {
    return (
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black border transition-colors shadow-xs ${
          esPastel
            ? "bg-purple-100 text-purple-900 border-purple-300"
            : "bg-red-900 text-white border-red-700"
        }`}
      >
        <span>🎉</span>
        <span>¡HOY ES EL CONCIERTO ARIRANG!</span>
        <span>🇦🇷</span>
      </div>
    );
  }

  // Ticker activo con luz parpadeante y segundero en vivo
  return (
    <div
      className={`inline-flex items-center gap-2 sm:gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold border-2 transition-all duration-300 shadow-sm ${
        esPastel
          ? "bg-purple-100/90 text-purple-950 border-purple-300 shadow-purple-200/50"
          : "bg-zinc-950 text-white border-red-600 shadow-red-950/60"
      }`}
      title="Concierto BTS Arirang en Argentina: 24 de Octubre de 2026 a las 20:00 hs"
    >
      <span className="text-base leading-none">🇦🇷</span>
      <span className="font-extrabold uppercase tracking-wide text-[11px] sm:text-xs opacity-90">
        Concierto Arirang:
      </span>
      <span
        className={`font-mono font-black tracking-tight text-xs sm:text-sm px-2 py-0.5 rounded-lg border ${
          esPastel
            ? "bg-white/80 border-purple-200 text-purple-900"
            : "bg-red-950/80 border-red-800 text-red-200"
        }`}
      >
        {textoCuentaRegresiva}
      </span>
      {/* Luz titilante que respeta el modo: morada en Pastel, roja en Arirang */}
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            esPastel ? "bg-purple-400" : "bg-red-400"
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            esPastel ? "bg-purple-600" : "bg-red-500"
          }`}
        />
      </span>
    </div>
  );
}

// ============================================================================
// SECCIÓN 4: EXPORTACIONES DE COMPATIBILIDAD
// ============================================================================
export const ConcertCountdown = ContadorConcierto;
