// ============================================================================
// ARCHIVO: src/components/BotonCambioTema.tsx
// DESCRIPCIÓN: Botón flotante/accesible para alternar entre el Modo Pastel
//              (colores lilas/rosas) y el Modo Arirang (rojo y negro estadio).
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// React y el hook de contexto para gestionar el tema visual.
// ============================================================================

import React from "react";
import { useTema } from "@/context/ContextoTema";

// ============================================================================
// SECCIÓN 2: TIPOS E INTERFACES
// Propiedades recibidas por el componente.
// ============================================================================

export interface PropiedadesBotonCambioTema {
  className?: string;
}

// ============================================================================
// SECCIÓN 3: COMPONENTE BOTÓN DE CAMBIO DE TEMA
// Renderiza el botón con estilo pasteles o arirang según el estado actual.
// ============================================================================

export function BotonCambioTema({ className = "" }: PropiedadesBotonCambioTema) {
  const { tema, alternarTema } = useTema();
  const esPastel = tema === "pastel";

  return (
    <button
      onClick={alternarTema}
      type="button"
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border shadow-xs hover:scale-102 active:scale-98 cursor-pointer ${
        esPastel
          ? "bg-white/90 border-purple-200 text-purple-900 hover:bg-purple-50 hover:border-purple-300"
          : "bg-zinc-900/90 border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-500"
      } ${className}`}
      aria-label="Cambiar tema visual"
      title={esPastel ? "Cambiar a Modo Arirang Tour" : "Cambiar a Modo Cumpleaños Pastel"}
    >
      {/* Indicador luminoso circular que cambia según el tema */}
      <span
        className={`w-2.5 h-2.5 rounded-full transition-transform duration-200 group-hover:scale-125 ${
          esPastel ? "bg-purple-500" : "bg-red-500"
        }`}
      />
      <span className="font-extrabold text-[11px] whitespace-nowrap">
        {esPastel ? "Modo Pastel" : "Modo Arirang"}
      </span>
      <span className="text-[10px] opacity-60 font-normal hidden lg:inline">
        ({esPastel ? "🌸" : "🇦🇷"})
      </span>
    </button>
  );
}

// ============================================================================
// SECCIÓN 4: EXPORTACIONES DE COMPATIBILIDAD
// ============================================================================
export const ThemeToggle = BotonCambioTema;
export const ThemeToggleFAB = BotonCambioTema;
