// ============================================================================
// ARCHIVO: src/context/ContextoAutenticacion.tsx
// DESCRIPCIÓN: Manejo de autenticación para Valentina y el Administrador.
//              Almacena el usuario autenticado en localStorage y valida claves.
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// Dependencias de React y configuraciones de usuarios y credenciales.
// ============================================================================

import React, { createContext, useContext, useSyncExternalStore } from "react";
import {
  PerfilUsuario,
  PERFILES_USUARIO,
  CREDENCIALES_ACCESO,
  IdentificadorUsuario,
} from "@/data/configuracionAutenticacion";

// ============================================================================
// SECCIÓN 2: TIPOS E INTERFACES
// Estructura de respuestas de inicio de sesión y contrato del contexto.
// ============================================================================

export interface ResultadoInicioSesion {
  exito: boolean;
  error?: string;
  // Compatibilidad
  success: boolean;
}

export interface TipoContextoAutenticacion {
  usuarioActual: PerfilUsuario | null;
  estaAutenticado: boolean;
  esAdmin: boolean;
  iniciarSesion: (idPerfil: IdentificadorUsuario, claveIngresada: string) => ResultadoInicioSesion;
  cerrarSesion: () => void;
  // Propiedades en inglés para compatibilidad
  currentUser: PerfilUsuario | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (profileId: IdentificadorUsuario, passwordInput: string) => { success: boolean; error?: string };
  logout: () => void;
}

// ============================================================================
// SECCIÓN 3: CONSTANTES Y ALMACENAMIENTO LOCAL
// Clave persistente en localStorage para el usuario con sesión iniciada.
// ============================================================================

const ContextoAutenticacion = createContext<TipoContextoAutenticacion | undefined>(undefined);

const CLAVE_ALMACENAMIENTO_AUTENTICACION = "bts_valentina_auth_user";

// Suscripción al almacenamiento del navegador
function suscribirAutenticacion(notificarCambio: () => void) {
  window.addEventListener("storage", notificarCambio);
  return () => window.removeEventListener("storage", notificarCambio);
}

// Lectura de la clave en cliente
function obtenerInstantaneaAutenticacion(): string {
  return localStorage.getItem(CLAVE_ALMACENAMIENTO_AUTENTICACION) || "";
}

// Valor en servidor seguro para evitar diferencias de hidratación
function obtenerInstantaneaServidorAutenticacion(): string {
  return "";
}

// ============================================================================
// SECCIÓN 4: PROVEEDOR DEL CONTEXTO (COMPONENTE REACT)
// Provee la sesión y funciones de inicio y cierre de sesión a la aplicación.
// ============================================================================

export function ProveedorAutenticacion({ children }: { children: React.ReactNode }) {
  // Identificador de usuario activo sincronizado en tiempo real
  const claveUsuarioAutenticado = useSyncExternalStore(
    suscribirAutenticacion,
    obtenerInstantaneaAutenticacion,
    obtenerInstantaneaServidorAutenticacion
  );

  const usuarioActual = PERFILES_USUARIO.find((p) => p.id === claveUsuarioAutenticado) || null;
  const estaAutenticado = Boolean(usuarioActual);
  const esAdmin = usuarioActual?.id === "admin";

  // Función para validar credenciales e iniciar sesión
  const iniciarSesion = (idPerfil: IdentificadorUsuario, claveIngresada: string): ResultadoInicioSesion => {
    const claveLimpia = claveIngresada.trim();
    const credenciales = CREDENCIALES_ACCESO[idPerfil];

    if (!credenciales) {
      return { exito: false, success: false, error: "Perfil no encontrado." };
    }

    if (claveLimpia === credenciales.clave) {
      localStorage.setItem(CLAVE_ALMACENAMIENTO_AUTENTICACION, idPerfil);
      window.dispatchEvent(new Event("storage"));
      return { exito: true, success: true };
    } else {
      return {
        exito: false,
        success: false,
        error:
          idPerfil === "valentina"
            ? "Contraseña incorrecta. Pista: ingresá tu fecha de cumpleaños sin espacios (ej: DDMMAAAA)."
            : "Clave de administrador incorrecta.",
      };
    }
  };

  // Función para cerrar la sesión actual
  const cerrarSesion = () => {
    localStorage.removeItem(CLAVE_ALMACENAMIENTO_AUTENTICACION);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <ContextoAutenticacion.Provider
      value={{
        usuarioActual,
        estaAutenticado,
        esAdmin,
        iniciarSesion,
        cerrarSesion,
        // Compatibilidad con código en inglés
        currentUser: usuarioActual,
        isAuthenticated: estaAutenticado,
        isAdmin: esAdmin,
        login: (profileId, pass) => iniciarSesion(profileId, pass),
        logout: cerrarSesion,
      }}
    >
      {children}
    </ContextoAutenticacion.Provider>
  );
}

// ============================================================================
// SECCIÓN 5: HOOK PERSONALIZADO
// Permite a cualquier componente consultar el estado y manipular la autenticación.
// ============================================================================

export function useAutenticacion() {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto) {
    throw new Error("useAutenticacion debe usarse dentro de un ProveedorAutenticacion");
  }
  return contexto;
}

// ============================================================================
// SECCIÓN 6: EXPORTACIONES DE COMPATIBILIDAD
// ============================================================================
export const AuthProvider = ProveedorAutenticacion;
export const useAuth = useAutenticacion;
