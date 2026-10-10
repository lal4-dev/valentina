// ============================================================================
// ARCHIVO: src/app/admin/page.tsx
// DESCRIPCIÓN: Panel de Control de Administrador (/admin).
//              Permite probar el sorteo sin restricciones de fecha, simular las
//              pantallas de Valentina y reiniciar el sorteo de regalos.
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// React, utilidades de navegación de Next.js, contextos y datos de BTS.
// ============================================================================

import React, { useState } from "react";
import Link from "next/link";
import { useAutenticacion } from "@/context/ContextoAutenticacion";
import { useTema } from "@/context/ContextoTema";
import { useRuleta } from "@/context/ContextoRuleta";
import { BotonCambioTema } from "@/components/BotonCambioTema";
import { MIEMBROS_BTS } from "@/data/miembrosBts";

// ============================================================================
// SECCIÓN 2: COMPONENTE PRINCIPAL (PANEL DE ADMINISTRADOR)
// Administra el acceso por clave maestra (admin290344) y herramientas de control.
// ============================================================================

export default function PaginaAdministrador() {
  const { esAdmin, iniciarSesion, cerrarSesion } = useAutenticacion();
  const { tema } = useTema();
  const { numerosSorteados, reiniciarRuleta } = useRuleta();

  const [clave, setClave] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [estaEnviando, setEstaEnviando] = useState(false);
  const [reinicioExitoso, setReinicioExitoso] = useState(false);

  const esPastel = tema === "pastel";

  // Manejador del formulario de autenticación de admin
  const manejarInicioAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeError("");
    setEstaEnviando(true);

    const respuesta = iniciarSesion("admin", clave);
    if (!respuesta.exito) {
      setMensajeError(respuesta.error || "Contraseña de administrador incorrecta.");
      setEstaEnviando(false);
    }
  };

  // Manejador del botón de reinicio del sorteo
  const manejarReinicioSorteo = () => {
    if (confirm("¿Estás seguro de que querés reiniciar los regalos sorteados? El sorteo volverá a comenzar desde el regalo #4.")) {
      reiniciarRuleta();
      setReinicioExitoso(true);
      setTimeout(() => setReinicioExitoso(false), 3000);
    }
  };

  // ==========================================================================
  // VISTA 1: Formulario de inicio de sesión de Administrador
  // Se presenta si el usuario aún no ha colocado la clave maestra.
  // ==========================================================================
  if (!esAdmin) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center py-10 px-4 relative transition-colors duration-300">
        <div className="absolute top-5 right-5 z-20">
          <BotonCambioTema />
        </div>

        <div className="w-full max-w-md mx-auto animate-pop">
          <div
            className={`relative overflow-hidden rounded-3xl p-7 sm:p-9 border shadow-xl transition-all duration-300 ${
              esPastel
                ? "bg-white/95 border-purple-200/90 shadow-purple-200/50 text-purple-950"
                : "bg-zinc-950/95 border-zinc-800 shadow-black text-white"
            }`}
          >
            {/* Encabezado */}
            <div className="text-center mb-6">
              <div
                className={`inline-block p-3 rounded-2xl mb-3 text-2xl shadow-sm border ${
                  esPastel
                    ? "bg-purple-100/80 border-purple-200 text-purple-700"
                    : "bg-red-950/80 border-red-800 text-red-200"
                }`}
              >
                🛠️
              </div>

              <p
                className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                  esPastel ? "text-purple-600" : "text-red-400"
                }`}
              >
                Acceso Exclusivo de Gestión
              </p>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Panel de Administrador
              </h1>

              <p
                className={`text-xs sm:text-sm mt-2 leading-relaxed font-medium ${
                  esPastel ? "text-purple-800/80" : "text-zinc-400"
                }`}
              >
                Ingresá la contraseña para acceder a la ruleta y probar todo antes del cumpleaños.
              </p>
            </div>

            {/* Formulario de Login */}
            <form onSubmit={manejarInicioAdmin} className="space-y-4">
              <div>
                <label
                  htmlFor="clave-admin"
                  className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    esPastel ? "text-purple-900" : "text-zinc-300"
                  }`}
                >
                  Contraseña de Administrador
                </label>
                <input
                  id="clave-admin"
                  type="password"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-2xl text-sm font-semibold transition-all outline-none border ${
                    esPastel
                      ? "bg-white border-purple-200 text-purple-950 placeholder-purple-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                      : "bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-red-500 focus:ring-4 focus:ring-red-950/50"
                  }`}
                  required
                />
              </div>

              {mensajeError && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold border flex items-center gap-2 ${
                    esPastel
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "bg-red-950/80 border-red-700 text-red-200"
                  }`}
                >
                  <span>⚠️</span>
                  <span>{mensajeError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={estaEnviando || !clave}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm tracking-wide shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer ${
                  esPastel
                    ? "bg-linear-to-r from-purple-200 via-pink-200 to-purple-300 text-purple-950 border-2 border-purple-300 hover:from-purple-300 hover:to-pink-300"
                    : "bg-red-600 text-white shadow-red-950 hover:bg-red-700"
                }`}
              >
                Ingresar como Admin
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className={`text-xs font-bold inline-flex items-center gap-1 hover:underline ${
                  esPastel ? "text-purple-700" : "text-zinc-400"
                }`}
              >
                ← Volver a la página principal
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================================================
  // VISTA 2: Dashboard de Control del Administrador
  // Visible una vez validada la sesión de administrador.
  // ==========================================================================
  return (
    <main className="min-h-screen flex flex-col py-8 px-4 sm:px-8 max-w-4xl mx-auto transition-colors duration-300">
      {/* Barra superior del panel */}
      <header className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
            🛠️
          </div>
          <div>
            <h1 className="text-xl font-extrabold flex items-center gap-2">
              Panel de Administrador
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                ACTIVO
              </span>
            </h1>
            <p className="text-xs opacity-75">Bypass de fecha habilitado para pruebas</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BotonCambioTema />
          <button
            onClick={cerrarSesion}
            type="button"
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              esPastel
                ? "bg-white border-purple-200 text-purple-800 hover:bg-purple-50"
                : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Tarjetas de administración y herramientas */}
      <div className="mt-6 space-y-6">
        {/* Tarjeta de Acceso Rápido a la Ruleta */}
        <div
          className={`p-6 rounded-3xl border shadow-sm ${
            esPastel ? "bg-white border-purple-200" : "bg-zinc-950 border-zinc-800"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black flex items-center gap-2">
                <span>🎁</span>
                <span>Probar la Ruleta de Regalos</span>
              </h2>
              <p className="text-xs sm:text-sm mt-1 opacity-80 leading-relaxed">
                Podés acceder y probar el sorteo completo sin importar la fecha actual. Como administrador, la fecha de bloqueo no te afecta.
              </p>
            </div>

            <Link
              href="/"
              className={`px-5 py-3 rounded-2xl font-black text-sm text-center shrink-0 shadow-md transition-transform hover:scale-105 active:scale-95 ${
                esPastel
                  ? "bg-linear-to-r from-purple-200 via-pink-200 to-purple-300 text-purple-950 border border-purple-300"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              Ir a la Ruleta de Regalos →
            </Link>
          </div>
        </div>

        {/* Información de estado y Reinicio exclusivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tarjeta: Progreso del sorteo */}
          <div
            className={`p-5 rounded-3xl border ${
              esPastel ? "bg-purple-50/70 border-purple-200" : "bg-zinc-900 border-zinc-800"
            }`}
          >
            <h3 className="font-extrabold text-sm mb-3 flex items-center gap-2">
              <span>📊</span>
              <span>Progreso de Regalos Sorteados</span>
            </h3>

            <p className="text-2xl font-black mb-2">
              {numerosSorteados.length} / 7 regalos develados
            </p>

            <div className="text-xs space-y-1 opacity-85 mb-4">
              <p>
                • Primer giro garantizado: <strong>Regalo #4 (Namjoon)</strong>
              </p>
              <p>
                • Siguientes giros: <strong>Aleatorio de los restantes</strong>
              </p>
              <p>
                • Desbloqueo de Valentina: <strong>14 de Octubre de 2026, 00:00 hs (Arg)</strong>
              </p>
            </div>

            {reinicioExitoso && (
              <div className="p-2 mb-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center">
                ✓ ¡Regalos reiniciados con éxito!
              </div>
            )}

            <button
              type="button"
              onClick={manejarReinicioSorteo}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                esPastel
                  ? "bg-white border-purple-300 text-purple-900 hover:bg-purple-100"
                  : "bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700"
              }`}
            >
              🔄 Reiniciar sorteo de regalos (volver a empezar)
            </button>
          </div>

          {/* Tarjeta: Miembros ya sorteados */}
          <div
            className={`p-5 rounded-3xl border ${
              esPastel ? "bg-purple-50/70 border-purple-200" : "bg-zinc-900 border-zinc-800"
            }`}
          >
            <h3 className="font-extrabold text-sm mb-3 flex items-center gap-2">
              <span>{esPastel ? "💜" : "❤️"}</span>
              <span>Miembros ya develados ({numerosSorteados.length})</span>
            </h3>

            {numerosSorteados.length === 0 ? (
              <p className="text-xs opacity-60 italic py-4">
                Aún no se ha girado la ruleta. Al girar por primera vez saldrá el regalo #4.
              </p>
            ) : (
              <ul className="text-xs space-y-1.5">
                {numerosSorteados.map((num, idx) => {
                  const miembro = MIEMBROS_BTS.find((m) => m.numero === num);
                  return (
                    <li
                      key={num}
                      className="flex items-center justify-between p-2 rounded-xl bg-white/50 dark:bg-zinc-950/50"
                    >
                      <span className="font-bold">
                        Giro #{idx + 1}: Regalo #{num} ({miembro?.nombreArtistico})
                      </span>
                      <span className="text-[10px] opacity-75">#{miembro?.nombre}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Simulador de pantalla de Valentina */}
        <div
          className={`p-6 rounded-3xl border ${
            esPastel ? "bg-white border-purple-200" : "bg-zinc-950 border-zinc-800"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-extrabold text-sm flex items-center gap-2">
                <span>👀</span>
                <span>Simulador de Pantalla de Valentina</span>
              </h4>
              <p className="text-xs opacity-75 mt-1 leading-relaxed">
                Probá cómo ve Valentina la página antes de medianoche y cómo se verá exactamente cuando el contador llegue a 00:00:00:00.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/?preview=lock"
                className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                  esPastel
                    ? "bg-purple-100 border-purple-200 text-purple-900 hover:bg-purple-200"
                    : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                ⏱️ Con Contador Activo
              </Link>

              <Link
                href="/?preview=zero"
                className={`text-xs font-black px-4 py-2 rounded-xl border shadow-sm transition-all hover:scale-105 active:scale-95 ${
                  esPastel
                    ? "bg-linear-to-r from-purple-200 via-pink-200 to-purple-300 text-purple-950 border-purple-300 shadow-purple-100"
                    : "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700 shadow-emerald-950"
                }`}
              >
                🎉 Probar Contador en 0
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
