// ============================================================================
// ARCHIVO: src/components/TarjetaAutenticacion.tsx
// DESCRIPCIÓN: Tarjeta de inicio de sesión para Valentina o el Administrador.
//              Permite cambiar de pestaña y validar la contraseña de acceso.
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// React, datos de perfiles y contextos de autenticación y tema.
// ============================================================================

import React, { useState } from "react";
import { PERFILES_USUARIO, IdentificadorUsuario } from "@/data/configuracionAutenticacion";
import { useAutenticacion } from "@/context/ContextoAutenticacion";
import { useTema } from "@/context/ContextoTema";

// ============================================================================
// SECCIÓN 2: COMPONENTE PRINCIPAL (TARJETA DE AUTENTICACIÓN)
// Formulario para ingreso de contraseña según perfil seleccionado.
// ============================================================================

export function TarjetaAutenticacion() {
  const { iniciarSesion } = useAutenticacion();
  const { tema } = useTema();

  const [perfilSeleccionado, setPerfilSeleccionado] = useState<IdentificadorUsuario>("valentina");
  const [clave, setClave] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [estaEnviando, setEstaEnviando] = useState(false);

  const esPastel = tema === "pastel";
  const datosPerfilActivo = PERFILES_USUARIO.find((p) => p.id === perfilSeleccionado);

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeError("");
    setEstaEnviando(true);

    const claveLimpia = clave.trim();
    // Detección automática si ingresa la clave maestra de admin
    const perfilDestino: IdentificadorUsuario = claveLimpia === "admin290344" ? "admin" : perfilSeleccionado;
    const resultado = iniciarSesion(perfilDestino, claveLimpia);

    if (!resultado.exito) {
      setMensajeError(resultado.error || "Clave incorrecta");
      setEstaEnviando(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 animate-pop">
      <div
        className={`relative overflow-hidden rounded-3xl p-7 sm:p-9 border shadow-xl transition-all duration-300 ${
          esPastel
            ? "bg-white/95 border-purple-200/90 shadow-purple-200/50 text-purple-950"
            : "bg-zinc-950/95 border-zinc-800 shadow-black text-white"
        }`}
      >
        {/* Emblema superior festivo */}
        <div className="text-center mb-6">
          <div
            className={`inline-block p-3 rounded-2xl mb-3 text-2xl shadow-sm border ${
              esPastel
                ? "bg-purple-100/80 border-purple-200 text-purple-700"
                : "bg-red-950/80 border-red-800 text-red-200"
            }`}
          >
            {perfilSeleccionado === "valentina" ? (esPastel ? "💜" : "❤️") : "🔑"}
          </div>

          <p
            className={`text-xs font-bold uppercase tracking-wider mb-1 ${
              esPastel ? "text-purple-600" : "text-red-400"
            }`}
          >
            {perfilSeleccionado === "valentina" ? "Edición Especial de Cumpleaños" : "Panel de Control"}
          </p>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {perfilSeleccionado === "valentina" ? "¡Hola, Valentina!" : "Modo Administrador"}
          </h1>

          <p
            className={`text-xs sm:text-sm mt-2 leading-relaxed font-medium ${
              esPastel ? "text-purple-800/80" : "text-zinc-400"
            }`}
          >
            {perfilSeleccionado === "valentina"
              ? "Tus 7 regalos de BTS están listos para ser sorteados. Ingresá tu fecha para comenzar."
              : "Acceso para gestión y reinicio del sorteo de regalos."}
          </p>
        </div>

        {/* Pestañas para seleccionar perfil */}
        <div
          className={`grid grid-cols-2 p-1.5 rounded-2xl mb-6 border text-xs font-bold ${
            esPastel
              ? "bg-purple-50 border-purple-200/70"
              : "bg-zinc-900 border-zinc-800"
          }`}
        >
          {PERFILES_USUARIO.map((perfil) => {
            const estaSeleccionado = perfilSeleccionado === perfil.id;
            return (
              <button
                key={perfil.id}
                type="button"
                onClick={() => {
                  setPerfilSeleccionado(perfil.id);
                  setClave("");
                  setMensajeError("");
                }}
                className={`py-2 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  estaSeleccionado
                    ? esPastel
                      ? "bg-white text-purple-950 shadow-sm font-extrabold"
                      : "bg-zinc-800 text-white shadow-sm font-extrabold"
                    : esPastel
                    ? "text-purple-700/70 hover:text-purple-900"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>{perfil.id === "valentina" ? (esPastel ? "💜" : "❤️") : "🛠️"}</span>
                <span>{perfil.nombre}</span>
              </button>
            );
          })}
        </div>

        {/* Formulario de Contraseña */}
        <form onSubmit={manejarEnvio} className="space-y-4">
          <div>
            <label
              htmlFor="clave"
              className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                esPastel ? "text-purple-900" : "text-zinc-300"
              }`}
            >
              {perfilSeleccionado === "valentina" ? "Fecha de Cumpleaños" : "Clave de Acceso"}
            </label>

            <div className="relative">
              <input
                id="clave"
                type="password"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                placeholder={
                  perfilSeleccionado === "valentina"
                    ? "Ej: 14102026"
                    : "Clave de administrador"
                }
                autoComplete="current-password"
                className={`w-full px-4 py-3 rounded-2xl text-sm font-medium border transition-all duration-200 outline-none ${
                  mensajeError
                    ? "border-red-500 ring-2 ring-red-400/20"
                    : esPastel
                    ? "bg-purple-50/50 border-purple-200 text-purple-950 focus:border-purple-400 focus:bg-white focus:ring-3 focus:ring-purple-200/50"
                    : "bg-zinc-900 border-zinc-700 text-white focus:border-red-500 focus:ring-3 focus:ring-red-500/20"
                }`}
              />
            </div>

            <p
              className={`text-[11px] mt-2 font-medium ${
                esPastel ? "text-purple-600" : "text-zinc-400"
              }`}
            >
              💡 {datosPerfilActivo?.pistaClavePorDefecto}
            </p>
          </div>

          {/* Mensaje de error si la clave es incorrecta */}
          {mensajeError && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold border ${
                esPastel
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-red-950/80 text-red-300 border-red-800"
              }`}
            >
              {mensajeError}
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={estaEnviando || !clave.trim()}
            className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm tracking-wide shadow-md transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
              esPastel
                ? "bg-linear-to-r from-purple-200 via-pink-200 to-purple-300 text-purple-950 border-2 border-purple-300 shadow-purple-200/50 hover:from-purple-300 hover:to-pink-300"
                : "bg-red-600 text-white shadow-red-950 hover:bg-red-700"
            }`}
          >
            {estaEnviando
              ? "Verificando..."
              : perfilSeleccionado === "valentina"
              ? "Entrar a mis regalos ✨"
              : "Ingresar como Administrador"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// SECCIÓN 3: EXPORTACIONES DE COMPATIBILIDAD
// ============================================================================
export const AuthCard = TarjetaAutenticacion;
