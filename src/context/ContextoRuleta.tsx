// ============================================================================
// ARCHIVO: src/context/ContextoRuleta.tsx
// DESCRIPCIÓN: Estado de la ruleta de sorteo de regalos de BTS (7 miembros).
//              Garantiza que el primer giro sea Namjoon (#4), los del medio
//              sean aleatorios y el último sea Jungkook (#7). Persiste en localStorage.
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// React hooks, datos de los miembros de BTS y utilidades de almacenamiento.
// ============================================================================

import React, { createContext, useContext, useState, useSyncExternalStore } from "react";
import { MiembroBTS, MIEMBROS_BTS } from "@/data/miembrosBts";

// ============================================================================
// SECCIÓN 2: TIPOS E INTERFACES
// Estructura completa de las acciones y valores expuestos por el contexto.
// ============================================================================

export interface TipoContextoRuleta {
  numerosRestantes: number[];
  numerosSorteados: number[];
  miembrosRevelados: MiembroBTS[];
  miembroActivo: MiembroBTS | null;
  estaGirando: boolean;
  rotacion: number;
  estaCompletado: boolean;
  girarRuleta: () => void;
  reiniciarRuleta: () => void;
  abrirModalMiembro: (miembro: MiembroBTS) => void;
  cerrarModalMiembro: () => void;
  ultimoNumeroSorteado: number | null;

  // Propiedades en inglés para compatibilidad
  remainingNumbers: number[];
  drawnNumbers: number[];
  revealedMembers: MiembroBTS[];
  activeMember: MiembroBTS | null;
  isSpinning: boolean;
  rotation: number;
  isCompleted: boolean;
  spin: () => void;
  resetLottery: () => void;
  openMemberModal: (member: MiembroBTS) => void;
  closeMemberModal: () => void;
  lastDrawnNumber: number | null;
}

// ============================================================================
// SECCIÓN 3: CONSTANTES Y CONFIGURACIÓN DEL SORTEO
// 7 regalos en total y clave en localStorage para guardar el progreso.
// ============================================================================

const ContextoRuleta = createContext<TipoContextoRuleta | undefined>(undefined);

const NUMEROS_INICIALES = [1, 2, 3, 4, 5, 6, 7];
const CLAVE_ALMACENAMIENTO_SORTEO = "bts_valentina_drawn_numbers";

function suscribirRuleta(notificarCambio: () => void) {
  window.addEventListener("storage", notificarCambio);
  return () => window.removeEventListener("storage", notificarCambio);
}

function obtenerInstantaneaRuleta(): string {
  return localStorage.getItem(CLAVE_ALMACENAMIENTO_SORTEO) || "[]";
}

function obtenerInstantaneaServidorRuleta(): string {
  return "[]";
}

// ============================================================================
// SECCIÓN 4: PROVEEDOR DEL CONTEXTO (COMPONENTE REACT)
// Gestiona la rotación de la rueda, lógica de premios y modales.
// ============================================================================

export function ProveedorRuleta({ children }: { children: React.ReactNode }) {
  // Números sorteados guardados en localStorage
  const numerosSorteadosBrutos = useSyncExternalStore(
    suscribirRuleta,
    obtenerInstantaneaRuleta,
    obtenerInstantaneaServidorRuleta
  );

  let numerosSorteados: number[] = [];
  try {
    const parseados = JSON.parse(numerosSorteadosBrutos);
    if (Array.isArray(parseados)) {
      numerosSorteados = parseados.filter((n) => typeof n === "number" && n >= 1 && n <= 7);
    }
  } catch {
    numerosSorteados = [];
  }

  // Estados locales para la animación y modales
  const [miembroActivo, setMiembroActivo] = useState<MiembroBTS | null>(null);
  const [estaGirando, setEstaGirando] = useState<boolean>(false);
  const [rotacion, setRotacion] = useState<number>(0);
  const [ultimoNumeroSorteado, setUltimoNumeroSorteado] = useState<number | null>(null);

  const numerosRestantes = NUMEROS_INICIALES.filter((n) => !numerosSorteados.includes(n));
  const estaCompletado = numerosRestantes.length === 0;

  const miembrosRevelados = numerosSorteados
    .map((num) => MIEMBROS_BTS.find((m) => m.numero === num))
    .filter((m): m is MiembroBTS => !!m);

  // ==========================================================================
  // FUNCIÓN: girarRuleta
  // Ejecuta la animación de giro con las siguientes reglas especiales:
  // 1. El primer regalo (giro 1) siempre es el #4 (Namjoon: carta/dedicatoria de amor).
  // 2. Los regalos intermedios (giros 2 al 6) son aleatorios entre [1, 2, 3, 5, 6].
  // 3. El séptimo y último regalo (giro 7) siempre es el #7 (Jungkook: brindis final).
  // ==========================================================================
  const girarRuleta = () => {
    if (estaGirando || numerosRestantes.length === 0) return;

    setEstaGirando(true);

    let numeroElegido: number;
    // Regla 1: Si es el primer regalo jamás sorteado, sale el #4 (Namjoon)
    if (numerosSorteados.length === 0 && numerosRestantes.includes(4)) {
      numeroElegido = 4;
    }
    // Regla 3: Si es el 7mo giro (último regalo), sale el #7 (Jungkook)
    else if (numerosSorteados.length === 6 && numerosRestantes.includes(7)) {
      numeroElegido = 7;
    }
    // Regla 2: Giros intermedios (del 2 al 6). El 7 se reserva exclusivamente para el final
    else {
      const opcionesIntermedias = numerosRestantes.filter((n) => n !== 7);
      if (opcionesIntermedias.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * opcionesIntermedias.length);
        numeroElegido = opcionesIntermedias[indiceAleatorio];
      } else {
        numeroElegido = numerosRestantes[0];
      }
    }

    setUltimoNumeroSorteado(numeroElegido);

    // Cálculo del ángulo objetivo para que la aguja superior apunte al sector exacto
    const anguloPorSector = 360 / 7;
    const centroDelSector = (numeroElegido - 1) * anguloPorSector + anguloPorSector / 2;

    const vueltasAdicionales = 5;
    const anguloActualRueda = rotacion % 360;
    const desplazamientoObjetivo = ((270 - centroDelSector - anguloActualRueda) % 360 + 360) % 360;
    const nuevaRotacion = rotacion + 360 * vueltasAdicionales + desplazamientoObjetivo;

    setRotacion(nuevaRotacion);

    // Al terminar los 3.6s de giro de la ruleta, abrir el modal con confeti
    setTimeout(() => {
      setEstaGirando(false);
      const nuevosSorteados = [...numerosSorteados, numeroElegido];
      localStorage.setItem(CLAVE_ALMACENAMIENTO_SORTEO, JSON.stringify(nuevosSorteados));
      window.dispatchEvent(new Event("storage"));

      const miembro = MIEMBROS_BTS.find((m) => m.numero === numeroElegido);
      if (miembro) {
        setMiembroActivo(miembro);
      }
    }, 3600);
  };

  // Función de reinicio (exclusiva del panel de administración)
  const reiniciarRuleta = () => {
    if (estaGirando) return;
    localStorage.removeItem(CLAVE_ALMACENAMIENTO_SORTEO);
    window.dispatchEvent(new Event("storage"));
    setMiembroActivo(null);
    setUltimoNumeroSorteado(null);
    setRotacion(0);
  };

  const abrirModalMiembro = (miembro: MiembroBTS) => {
    setMiembroActivo(miembro);
  };

  const cerrarModalMiembro = () => {
    setMiembroActivo(null);
  };

  return (
    <ContextoRuleta.Provider
      value={{
        numerosRestantes,
        numerosSorteados,
        miembrosRevelados,
        miembroActivo,
        estaGirando,
        rotacion,
        estaCompletado,
        girarRuleta,
        reiniciarRuleta,
        abrirModalMiembro,
        cerrarModalMiembro,
        ultimoNumeroSorteado,
        // Compatibilidad con nombres en inglés
        remainingNumbers: numerosRestantes,
        drawnNumbers: numerosSorteados,
        revealedMembers: miembrosRevelados,
        activeMember: miembroActivo,
        isSpinning: estaGirando,
        rotation: rotacion,
        isCompleted: estaCompletado,
        spin: girarRuleta,
        resetLottery: reiniciarRuleta,
        openMemberModal: abrirModalMiembro,
        closeMemberModal: cerrarModalMiembro,
        lastDrawnNumber: ultimoNumeroSorteado,
      }}
    >
      {children}
    </ContextoRuleta.Provider>
  );
}

// ============================================================================
// SECCIÓN 5: HOOK PERSONALIZADO
// Acceso rápido a las funciones y estados del sorteo en cualquier componente.
// ============================================================================

export function useRuleta() {
  const contexto = useContext(ContextoRuleta);
  if (!contexto) {
    throw new Error("useRuleta debe usarse dentro de un ProveedorRuleta");
  }
  return contexto;
}

// ============================================================================
// SECCIÓN 6: EXPORTACIONES DE COMPATIBILIDAD
// ============================================================================
export const LotteryProvider = ProveedorRuleta;
export const useLottery = useRuleta;
