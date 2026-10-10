// ============================================================================
// ARCHIVO: src/components/PantallaBloqueoCumple.tsx
// DESCRIPCIÓN: Pantalla de bloqueo y cuenta regresiva previa al cumpleaños de
//              Valentina: 14 de Octubre de 2026, 00:00:00 hs (hora de Argentina).
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// React, router de Next.js, confeti, contexto de tema y datos de autenticación.
// ============================================================================

import React, { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useTema } from "@/context/ContextoTema";
import { BotonCambioTema } from "@/components/BotonCambioTema";
import { TIMESTAMP_CUMPLEANIOS_VALENTINA } from "@/data/configuracionAutenticacion";

// ============================================================================
// SECCIÓN 2: LÓGICA DEL TEMPORIZADOR HASTA MEDIANOCHE
// Ticker por segundo para calcular días, horas, minutos y segundos restantes.
// ============================================================================

function suscribirTemporizadorBloqueo(notificarCambio: () => void) {
  const temporizador = setInterval(notificarCambio, 1000);
  return () => clearInterval(temporizador);
}

function obtenerInstantaneaCuentaRegresivaBloqueo(): string {
  const ahora = Date.now();
  const diferencia = TIMESTAMP_CUMPLEANIOS_VALENTINA - ahora;
  if (diferencia <= 0) {
    return "DESBLOQUEADO";
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  return `${dias}:${horas}:${minutos}:${secondsToPad(segundos)}`;
}

function secondsToPad(n: number) {
  return n;
}

function obtenerInstantaneaServidorBloqueo(): string {
  return "CALCULANDO";
}

// ============================================================================
// SECCIÓN 3: TIPOS E INTERFACES
// Propiedades para forzar estado de prueba (cuenta regresiva o 0) y callback.
// ============================================================================

export interface PropiedadesPantallaBloqueoCumple {
  alDesbloquear?: () => void;
  forzarEstado?: "cuentaRegresiva" | "cero" | "countdown" | "zero" | null;
  // Compatibilidad
  onUnlock?: () => void;
  forceState?: "countdown" | "zero" | null;
}

// ============================================================================
// SECCIÓN 4: COMPONENTE PRINCIPAL (PANTALLA DE BLOQUEO)
// Muestra el reloj, la foto de Valentina y el botón de inicio festivo.
// ============================================================================

export function PantallaBloqueoCumple({
  alDesbloquear,
  forzarEstado,
  onUnlock,
  forceState,
}: PropiedadesPantallaBloqueoCumple) {
  const router = useRouter();
  const { tema } = useTema();
  const esPastel = tema === "pastel";

  const accionDesbloqueo = alDesbloquear || onUnlock;
  const estadoForzado = forzarEstado || forceState;

  const estadoBruto = useSyncExternalStore(
    suscribirTemporizadorBloqueo,
    obtenerInstantaneaCuentaRegresivaBloqueo,
    obtenerInstantaneaServidorBloqueo
  );

  const esDesbloqueoEnVivo = estadoBruto === "DESBLOQUEADO";
  const estaDesbloqueado =
    estadoForzado === "cero" || estadoForzado === "zero"
      ? true
      : estadoForzado === "cuentaRegresiva" || estadoForzado === "countdown"
        ? false
        : esDesbloqueoEnVivo;

  // Lluvia de confeti
  const dispararConfeti = () => {
    const colores = esPastel
      ? ["#C084FC", "#F472B6", "#FDE047", "#60A5FA", "#34D399", "#A78BFA"]
      : ["#EF4444", "#DC2626", "#FFFFFF", "#B91C1C", "#F87171"];

    confetti({
      particleCount: 75,
      spread: 75,
      origin: { y: 0.6 },
      colors: colores,
      zIndex: 60,
    });
  };

  let dias = 0;
  let horas = 0;
  let minutos = 0;
  let segundos = 0;

  if (estaDesbloqueado) {
    dias = 0;
    horas = 0;
    minutos = 0;
    segundos = 0;
  } else if (estadoBruto !== "CALCULANDO" && estadoBruto !== "DESBLOQUEADO") {
    const partes = estadoBruto.split(":").map(Number);
    if (partes.length === 4) {
      [dias, horas, minutos, segundos] = partes;
    }
  }

  const rellenarCero = (n: number) => String(n).padStart(2, "0");

  return (
    <main className="min-h-screen flex flex-col justify-center items-center py-10 px-4 relative transition-colors duration-300">
      {/* Botón flotante para alternar tema */}
      <div className="absolute top-5 right-5 z-20">
        <BotonCambioTema />
      </div>

      <div className="w-full max-w-lg mx-auto animate-pop">
        <div
          className={`relative overflow-hidden rounded-3xl p-7 sm:p-10 border shadow-2xl transition-all duration-300 text-center ${esPastel
            ? "bg-white/95 border-purple-200/90 shadow-purple-200/60 text-purple-950"
            : "bg-zinc-950/95 border-zinc-800 shadow-black text-white"
            }`}
        >
          {/* Avatar con foto de Valentina */}
          <div className="relative inline-block mb-4">
            <div
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 border-3 mx-auto shadow-lg transition-transform duration-300 hover:scale-105 overflow-hidden flex items-center justify-center ${esPastel
                ? "border-purple-300 bg-purple-50 shadow-purple-200"
                : "border-red-600 bg-zinc-900 shadow-red-950"
                }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/fotoPerfil/fotoPerfilValentina.jpg"
                alt="Valentina"
                className="w-full h-full object-cover object-center rounded-full"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (!img.src.includes("/valentina.png")) {
                    img.src = "/valentina.png";
                  }
                }}
              />
            </div>

            {/* Corazón dinámico en la esquina del avatar */}
            <span
              className={`absolute bottom-0 right-1 text-lg p-1.5 rounded-full border shadow-sm ${esPastel ? "bg-purple-100 border-purple-300" : "bg-red-950 border-red-700"
                }`}
            >
              {esPastel ? "💜" : "❤️"}
            </span>
          </div>

          {/* Insignia superior */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2.5 border ${esPastel
              ? "bg-purple-100/80 text-purple-700 border-purple-200"
              : "bg-red-950/80 text-red-300 border-red-800"
              }`}
          >
            <br />
            <span>🎂</span>
            <span>Tu cumpleaños es un momento único</span>
            <span>🎂</span>
          </div>

          {/* Título y dedicatoria */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            ¡Casi es tu cumpleaños, Amor!
          </h1>

          <p
            className={`text-xs sm:text-sm font-medium leading-relaxed max-w-sm mx-auto mb-6 ${esPastel ? "text-purple-800/80" : "text-zinc-400"
              }`}
          >
            {estaDesbloqueado
              ? "¡Llegó el momento tan esperado! Ya podés entrar al login pedime la contraseña."
              : "Preparé una sorpresa enorme para vos. El acceso a todo lo que hice se desbloqueara automáticamente cuando el contador llegue a cero."}
          </p>

          {/* 4 Tarjetas del Reloj de Cuenta Regresiva */}
          <div className="relative">
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {/* Días */}
              <div
                className={`p-3 sm:p-4 rounded-2xl border transition-all duration-300 ${estaDesbloqueado
                  ? esPastel
                    ? "bg-purple-100/90 border-purple-300 shadow-sm ring-2 ring-purple-300/60"
                    : "bg-red-950/90 border-red-700 shadow-sm ring-2 ring-red-600/60"
                  : esPastel
                    ? "bg-purple-50/90 border-purple-200/90 shadow-xs"
                    : "bg-zinc-900 border-zinc-800 shadow-xs"
                  }`}
              >
                <span
                  className={`block font-mono font-black text-2xl sm:text-3xl tracking-tight ${esPastel ? "text-purple-700" : "text-red-400"
                    }`}
                >
                  {estadoBruto === "CALCULANDO" && !estaDesbloqueado ? "--" : rellenarCero(dias)}
                </span>
                <span
                  className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${esPastel ? "text-purple-600" : "text-zinc-400"
                    }`}
                >
                  Días
                </span>
              </div>

              {/* Horas */}
              <div
                className={`p-3 sm:p-4 rounded-2xl border transition-all duration-300 ${estaDesbloqueado
                  ? esPastel
                    ? "bg-purple-100/90 border-purple-300 shadow-sm ring-2 ring-purple-300/60"
                    : "bg-red-950/90 border-red-700 shadow-sm ring-2 ring-red-600/60"
                  : esPastel
                    ? "bg-purple-50/90 border-purple-200/90 shadow-xs"
                    : "bg-zinc-900 border-zinc-800 shadow-xs"
                  }`}
              >
                <span
                  className={`block font-mono font-black text-2xl sm:text-3xl tracking-tight ${esPastel ? "text-purple-700" : "text-red-400"
                    }`}
                >
                  {estadoBruto === "CALCULANDO" && !estaDesbloqueado ? "--" : rellenarCero(horas)}
                </span>
                <span
                  className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${esPastel ? "text-purple-600" : "text-zinc-400"
                    }`}
                >
                  Horas
                </span>
              </div>

              {/* Minutos */}
              <div
                className={`p-3 sm:p-4 rounded-2xl border transition-all duration-300 ${estaDesbloqueado
                  ? esPastel
                    ? "bg-purple-100/90 border-purple-300 shadow-sm ring-2 ring-purple-300/60"
                    : "bg-red-950/90 border-red-700 shadow-sm ring-2 ring-red-600/60"
                  : esPastel
                    ? "bg-purple-50/90 border-purple-200/90 shadow-xs"
                    : "bg-zinc-900 border-zinc-800 shadow-xs"
                  }`}
              >
                <span
                  className={`block font-mono font-black text-2xl sm:text-3xl tracking-tight ${esPastel ? "text-purple-700" : "text-red-400"
                    }`}
                >
                  {estadoBruto === "CALCULANDO" && !estaDesbloqueado ? "--" : rellenarCero(minutos)}
                </span>
                <span
                  className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${esPastel ? "text-purple-600" : "text-zinc-400"
                    }`}
                >
                  Min
                </span>
              </div>

              {/* Segundos */}
              <div
                className={`p-3 sm:p-4 rounded-2xl border transition-all duration-300 ${estaDesbloqueado
                  ? esPastel
                    ? "bg-purple-100/90 border-purple-300 shadow-sm ring-2 ring-purple-300/60"
                    : "bg-red-950/90 border-red-700 shadow-sm ring-2 ring-red-600/60"
                  : esPastel
                    ? "bg-purple-50/90 border-purple-200/90 shadow-xs"
                    : "bg-zinc-900 border-zinc-800 shadow-xs"
                  }`}
              >
                <span
                  className={`block font-mono font-black text-2xl sm:text-3xl tracking-tight ${esPastel ? "text-purple-700" : "text-red-400"
                    }`}
                >
                  {estadoBruto === "CALCULANDO" && !estaDesbloqueado ? "--" : rellenarCero(segundos)}
                </span>
                <span
                  className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${esPastel ? "text-purple-600" : "text-zinc-400"
                    }`}
                >
                  Seg
                </span>
              </div>
            </div>

            {/* Leyenda debajo del reloj */}
            <div
              className={`mt-6 p-3.5 rounded-2xl border text-xs sm:text-sm font-medium flex items-center justify-center gap-2 ${estaDesbloqueado
                ? esPastel
                  ? "bg-purple-100 border-purple-300 text-purple-950 font-bold"
                  : "bg-red-950 border-red-600 text-white font-bold"
                : esPastel
                  ? "bg-purple-100/60 border-purple-200 text-purple-900"
                  : "bg-red-950/40 border-red-900/60 text-red-200"
                }`}
            >
              <span>{estaDesbloqueado ? "🎉" : "🕒"}</span>
              <span>
                {estaDesbloqueado
                  ? "¡Cuenta regresiva finalizada! ¡Feliz Cumpleaños!"
                  : "Desbloqueo oficial: 14 de Octubre a las 00:00 hs (Arg)"}
              </span>
            </div>

            {/* Acciones principales */}
            <div className="mt-5 space-y-3">
              {estaDesbloqueado ? (
                <button
                  type="button"
                  onClick={() => {
                    dispararConfeti();
                    setTimeout(() => {
                      if (accionDesbloqueo) {
                        accionDesbloqueo();
                      } else {
                        router.push("/");
                      }
                    }, 350);
                  }}
                  className={`w-full py-4 px-6 rounded-2xl font-black text-base tracking-wide shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${esPastel
                    ? "bg-linear-to-r from-purple-200 via-pink-200 to-purple-300 text-purple-950 border-2 border-purple-300 shadow-purple-200/50"
                    : "bg-red-600 text-white shadow-red-950 hover:bg-red-700"
                    }`}
                >
                  🎁 ¡Comenzar a descubrir tus regalos!
                </button>
              ) : (
                <button
                  type="button"
                  onClick={dispararConfeti}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${esPastel
                    ? "bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200"
                    : "bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                    }`}
                >
                  🎉 Tirar confeti de cumpleaños
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ============================================================================
// SECCIÓN 5: EXPORTACIONES DE COMPATIBILIDAD
// ============================================================================
export const BirthdayLockScreen = PantallaBloqueoCumple;
