// ============================================================================
// ARCHIVO: src/app/page.tsx
// DESCRIPCIÓN: Página principal de la experiencia de cumpleaños para Valentina.
//              Maneja el bloqueo hasta el 14 de Octubre de 2026, la barra de pruebas
//              de Administrador, el inicio de sesión y la ruleta de regalos de BTS.
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// React, router y utilidades de navegación de Next.js, contextos y componentes.
// ============================================================================

import React, { useState, useSyncExternalStore, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAutenticacion } from "@/context/ContextoAutenticacion";
import { useTema } from "@/context/ContextoTema";
import { TarjetaAutenticacion } from "@/components/TarjetaAutenticacion";
import { PantallaBloqueoCumple } from "@/components/PantallaBloqueoCumple";
import { RuletaRegalos } from "@/components/RuletaRegalos";
import { ControlesRuleta } from "@/components/ControlesRuleta";
import { SeguimientoRegalos } from "@/components/SeguimientoRegalos";
import { ModalRevelacionMiembro } from "@/components/ModalRevelacionMiembro";
import { ContadorConcierto } from "@/components/ContadorConcierto";
import { AvatarEncabezadoUsuario } from "@/components/AvatarEncabezadoUsuario";
import { BotonCambioTema } from "@/components/BotonCambioTema";
import { TIMESTAMP_CUMPLEANIOS_VALENTINA } from "@/data/configuracionAutenticacion";

// ============================================================================
// SECCIÓN 2: TEMPORIZADOR Y FECHA LÍMITE DE CUMPLEAÑOS
// Desbloqueo oficial: 14 de Octubre de 2026 a las 00:00:00 hs (hora de Argentina).
// ============================================================================

function suscribirTemporizadorCumple(notificarCambio: () => void) {
  const temporizador = setInterval(notificarCambio, 1000);
  return () => clearInterval(temporizador);
}

function obtenerInstantaneaCumpleDesbloqueado(): boolean {
  return Date.now() >= TIMESTAMP_CUMPLEANIOS_VALENTINA;
}

function obtenerInstantaneaServidorCumpleDesbloqueado(): boolean {
  return false;
}

// ============================================================================
// SECCIÓN 3: CONTENIDO DE LA PÁGINA (LÓGICA REACTIVA Y ESTADOS)
// Orquesta los modos de visualización: cuenta regresiva, login o ruleta activa.
// ============================================================================

function ContenidoPrincipal() {
  const enrutador = useRouter();
  const { estaAutenticado, usuarioActual, cerrarSesion, esAdmin } = useAutenticacion();
  const { tema } = useTema();
  const esPastel = tema === "pastel";

  // Lectura de parámetros de URL para las pruebas del Administrador
  const parametrosBusqueda = useSearchParams();
  const parametroPrueba = parametrosBusqueda.get("preview");

  let vistaPruebaActiva: "cuentaRegresiva" | "cero" | "login" | null = null;
  if (parametroPrueba === "zero" || parametroPrueba === "cero" || parametroPrueba === "unlocked") {
    vistaPruebaActiva = "cero";
  } else if (parametroPrueba === "lock" || parametroPrueba === "cuentaRegresiva" || parametroPrueba === "countdown") {
    vistaPruebaActiva = "cuentaRegresiva";
  } else if (parametroPrueba === "login") {
    vistaPruebaActiva = "login";
  }

  // Verificación en vivo si ya se alcanzó la fecha oficial de desbloqueo
  const estaDesbloqueadoTiempo = useSyncExternalStore(
    suscribirTemporizadorCumple,
    obtenerInstantaneaCumpleDesbloqueado,
    obtenerInstantaneaServidorCumpleDesbloqueado
  );

  const [desbloqueoManual, setDesbloqueoManual] = useState(false);
  const [barraPruebaColapsada, setBarraPruebaColapsada] = useState(false);
  const [adminBannerColapsado, setAdminBannerColapsado] = useState(false);
  const estaDesbloqueado = estaDesbloqueadoTiempo || desbloqueoManual;

  // ==========================================================================
  // ESCENARIO A: Modo de Pruebas del Administrador
  // Permite simular cómo se ve el contador activo, el contador en 0 y el login.
  // ==========================================================================
  if (esAdmin && vistaPruebaActiva !== null) {
    return (
      <div className="relative">
        {/* Barra flotante colapsable para pruebas de administrador */}
        {barraPruebaColapsada ? (
          <aside
            aria-label="Barra de prueba de administrador minimizada"
            className="fixed top-2.5 left-1/2 -translate-x-1/2 z-50 animate-pop"
          >
            <button
              type="button"
              onClick={() => setBarraPruebaColapsada(false)}
              className="bg-neutral-900/95 backdrop-blur-md text-white text-xs font-black py-1.5 px-3.5 rounded-full shadow-2xl border border-neutral-700 flex items-center gap-2 hover:bg-neutral-800 transition-all active:scale-95 cursor-pointer"
            >
              <span>🛠️</span>
              <span>
                {vistaPruebaActiva === "cero"
                  ? "Prueba: En 0"
                  : vistaPruebaActiva === "cuentaRegresiva"
                  ? "Prueba: Contador"
                  : "Prueba: Login"}
              </span>
              <span className="text-neutral-400 text-[10px]">▼ Expandir</span>
            </button>
          </aside>
        ) : (
          <aside
            aria-label="Barra de prueba de administrador"
            className="fixed top-2.5 sm:top-3 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-1.5rem)] bg-neutral-900/95 backdrop-blur-md text-white text-xs font-bold py-2 px-3 sm:px-4 rounded-3xl sm:rounded-full shadow-2xl border border-neutral-700 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 animate-pop"
          >
            <span className="hidden sm:inline text-neutral-400">Modo Prueba:</span>

            {/* Botón para probar la cuenta regresiva activa con segundero */}
            <Link
              href="/?preview=lock"
              className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                vistaPruebaActiva === "cuentaRegresiva"
                  ? "bg-purple-600 text-white font-black shadow-xs"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              ⏱️ Contador
            </Link>

            {/* Botón para probar el contador finalizado en 0 */}
            <Link
              href="/?preview=zero"
              className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                vistaPruebaActiva === "cero"
                  ? "bg-emerald-600 text-white font-black shadow-xs"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              🎉 Contador en 0
            </Link>

            {/* Botón para probar la tarjeta de inicio de sesión */}
            <Link
              href="/?preview=login"
              className={`px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                vistaPruebaActiva === "login"
                  ? "bg-amber-600 text-white font-black shadow-xs"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              🔑 Login
            </Link>

            <div className="h-4 w-px bg-neutral-700 mx-0.5 hidden sm:block" />

            {/* Enlaces para volver al panel o a la ruleta */}
            <Link
              href="/admin"
              className="bg-neutral-800 hover:bg-neutral-700 text-white px-2.5 py-1 rounded-full text-[11px] border border-neutral-600 transition-colors"
            >
              Panel Admin
            </Link>
            <Link
              href="/"
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-[11px] transition-colors font-extrabold cursor-pointer"
            >
              Ruleta →
            </Link>

            <button
              type="button"
              onClick={() => setBarraPruebaColapsada(true)}
              title="Minimizar barra de prueba"
              className="text-neutral-400 hover:text-white text-[11px] px-2 py-0.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 transition-colors cursor-pointer ml-1"
            >
              ▲ Ocultar
            </button>
          </aside>
        )}

        {vistaPruebaActiva === "login" ? (
          <main className="min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 relative">
            <div className="absolute top-5 right-5 z-20">
              <BotonCambioTema />
            </div>
            <TarjetaAutenticacion />
          </main>
        ) : (
          <div className="pt-2 sm:pt-0">
            <PantallaBloqueoCumple
              forzarEstado={vistaPruebaActiva === "cero" ? "cero" : "cuentaRegresiva"}
              alDesbloquear={() => {
                enrutador.push("/");
              }}
            />
          </div>
        )}
      </div>
    );
  }

  // ==========================================================================
  // ESCENARIO B: Pantalla de Bloqueo para Valentina
  // Activa hasta las 00:00:00 hs del 14 de Octubre de 2026.
  // ==========================================================================
  if (!esAdmin && !estaDesbloqueado) {
    return <PantallaBloqueoCumple alDesbloquear={() => setDesbloqueoManual(true)} />;
  }

  // ==========================================================================
  // ESCENARIO C: Pantalla de Inicio de Sesión
  // Una vez desbloqueada la fecha pero antes de iniciar sesión.
  // ==========================================================================
  if (!estaAutenticado) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center py-10 px-4 relative">
        <div className="absolute top-5 right-5 z-20">
          <BotonCambioTema />
        </div>
        <TarjetaAutenticacion />
      </main>
    );
  }

  // ==========================================================================
  // ESCENARIO D: Experiencia Principal de Cumpleaños y Ruleta
  // Valentina autenticada (o Administrador en modo prueba).
  // ==========================================================================
  return (
    <main className="min-h-screen flex flex-col relative transition-colors duration-300 pb-16">
      {/* Contenedor Superior Adherente (Header + Banner Admin unificados) */}
      <div className="sticky top-0 z-40">
        {/* Banner discreto y colapsable superior para el Administrador */}
        {esAdmin && (
          <aside
            aria-label="Aviso de administrador"
            className="bg-linear-to-r from-red-600 via-rose-600 to-red-700 text-white text-xs font-bold py-1.5 px-3 sm:px-6 shadow-xs border-b border-red-700/60"
          >
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
              {/* Izquierda: Indicador de modo */}
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-sm">🛠️</span>
                <span className="truncate text-[11px] sm:text-xs">
                  <span className="font-black">Modo Admin</span>
                  <span className="hidden sm:inline font-normal opacity-90"> (Bypass de fecha habilitado)</span>
                </span>
              </div>

              {/* Derecha: Accesos rápidos y control de colapso */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => setAdminBannerColapsado(!adminBannerColapsado)}
                  className="bg-black/30 hover:bg-black/50 px-2 py-0.5 rounded-md transition-colors text-white font-medium cursor-pointer sm:hidden"
                >
                  {adminBannerColapsado ? "▾ Herramientas" : "▲ Ocultar"}
                </button>

                {/* En móvil se ocultan si está colapsado; en pantallas medianas siempre visibles */}
                <div className={`items-center gap-1.5 sm:gap-2 ${adminBannerColapsado ? "hidden sm:flex" : "flex"}`}>
                  <Link
                    href="/?preview=lock"
                    className="bg-black/25 hover:bg-black/45 px-2 py-0.5 rounded-md transition-colors text-white"
                  >
                    ⏱️ Contador
                  </Link>
                  <Link
                    href="/?preview=zero"
                    className="bg-emerald-700 hover:bg-emerald-800 px-2 py-0.5 rounded-md transition-colors text-white font-medium"
                  >
                    🎉 En 0
                  </Link>
                  <Link
                    href="/admin"
                    className="bg-white text-red-700 hover:bg-gray-100 px-2 py-0.5 rounded-md transition-colors font-black shadow-xs"
                  >
                    Panel
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Barra de navegación superior */}
        <header
          className={`backdrop-blur-md border-b px-3 sm:px-8 py-2.5 sm:py-3 transition-colors duration-300 ${
            esPastel
              ? "bg-white/90 border-purple-200/80 shadow-xs"
              : "bg-zinc-950/92 border-zinc-800 shadow-xs"
          }`}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
            {/* Izquierda: Perfil de usuario con avatar */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 mr-1">
              <AvatarEncabezadoUsuario idUsuario={usuarioActual?.id} nombre={usuarioActual?.nombre} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-black text-xs sm:text-base leading-none truncate ${
                      esPastel ? "text-purple-950" : "text-white"
                    }`}
                  >
                    {usuarioActual?.nombre}
                  </span>
                  {esAdmin && (
                    <span className="shrink-0 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-red-600 text-white">
                      ADMIN
                    </span>
                  )}
                </div>
                <p
                  className={`text-[10px] sm:text-[11px] leading-tight mt-0.5 font-medium truncate ${
                    esPastel ? "text-purple-600" : "text-zinc-400"
                  }`}
                >
                  {usuarioActual?.tituloRol}
                </p>
              </div>
            </div>

            {/* Centro: Contador del Concierto Arirang en tablet apaisada y computadoras */}
            <div className="hidden md:flex items-center justify-center px-2 shrink-0">
              <ContadorConcierto />
            </div>

            {/* Derecha: Botón de cambio de tema y cerrar sesión */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <BotonCambioTema />

              <button
                onClick={cerrarSesion}
                type="button"
                className={`text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
                  esPastel
                    ? "bg-white border-purple-200 text-purple-700 hover:bg-purple-50"
                    : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                Salir
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Contador de concierto centrado en móviles */}
      <div className="md:hidden flex justify-center pt-3 px-4">
        <ContadorConcierto />
      </div>

      {/* Encabezado de Bienvenida y Cumpleaños */}
      <section className="text-center pt-4 sm:pt-6 md:pt-8 px-4 max-w-2xl mx-auto">
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide mb-3 shadow-xs border ${
            esPastel
              ? "bg-purple-100 text-purple-700 border-purple-200"
              : "bg-red-950 text-red-200 border-red-800"
          }`}
        >
          <span>{esPastel ? "💜" : "❤️"}</span>
          <span>BTS Birthday Special</span>
          <span>{esPastel ? "💜" : "❤️"}</span>
        </div>

        <h1
          className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${
            esPastel ? "text-purple-950" : "text-white"
          }`}
        >
          ¡Feliz Cumpleaños, Amor mio!
        </h1>

        <p
          className={`mt-3 text-xs sm:text-base max-w-lg mx-auto font-medium leading-relaxed ${
            esPastel ? "text-purple-800/80" : "text-zinc-300"
          }`}
        >
          Siete regalos preparados con todo el amor, uno por cada miembro de BTS.
        </p>
      </section>

      {/* Sección Principal de la Ruleta y Controles */}
      <section className="mt-4 sm:mt-6 flex flex-col items-center">
        <RuletaRegalos />
        <ControlesRuleta />
      </section>

      {/* Galería de Seguimiento de los 7 Regalos */}
      <section className="mt-8">
        <SeguimientoRegalos />
      </section>

      {/* Modal de Revelación al Salir un Miembro */}
      <ModalRevelacionMiembro />

      {/* Pie de página conmemorativo */}
      <footer
        className={`mt-auto text-center py-8 text-xs font-medium border-t ${
          esPastel
            ? "border-purple-200/60 text-purple-600"
            : "border-zinc-800 text-zinc-500"
        }`}
      >
        <p>Hecho con mucho amor para Valentina {esPastel ? "💜" : "❤️"} • Feliz Cumpleaños 2026</p>
      </footer>
    </main>
  );
}

// ============================================================================
// SECCIÓN 4: EXPORTACIÓN POR DEFECTO CON BOUNDARY DE SUSPENSE
// Previene advertencias de prerenderizado al utilizar useSearchParams() en cliente.
// ============================================================================

export default function PaginaPrincipal() {
  return (
    <Suspense fallback={null}>
      <ContenidoPrincipal />
    </Suspense>
  );
}
