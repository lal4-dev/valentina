// ============================================================================
// ARCHIVO: src/context/ContextoTema.tsx
// DESCRIPCIÓN: Administrador del tema visual global (Modo Pastel y Modo Arirang).
//              Persiste la selección en localStorage y sincroniza entre pestañas.
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// Hooks nativos de React para sincronización externa y efectos del DOM.
// ============================================================================

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

// ============================================================================
// SECCIÓN 2: TIPOS E INTERFACES
// Definición de variantes de tema visual y funciones del contexto.
// ============================================================================

export type TemaVisual = "pastel" | "arirang";

export interface TipoContextoTema {
  tema: TemaVisual;
  alternarTema: () => void;
  fijarTema: (nuevoTema: TemaVisual) => void;
  // Propiedades en inglés para compatibilidad
  theme: TemaVisual;
  toggleTheme: () => void;
  setTheme: (theme: TemaVisual) => void;
}

// ============================================================================
// SECCIÓN 3: CONSTANTES Y ALMACENAMIENTO
// Clave de almacenamiento en localStorage para recordar el tema preferido.
// ============================================================================

const ContextoTema = createContext<TipoContextoTema | undefined>(undefined);

const CLAVE_ALMACENAMIENTO_TEMA = "bts_valentina_theme";

// Suscripción al evento de almacenamiento para sincronizar cambios en tiempo real
function suscribirTema(notificarCambio: () => void) {
  window.addEventListener("storage", notificarCambio);
  return () => window.removeEventListener("storage", notificarCambio);
}

// Obtener valor actual en el cliente desde localStorage
function obtenerInstantaneaTema(): TemaVisual {
  const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO_TEMA);
  return guardado === "arirang" ? "arirang" : "pastel";
}

// Valor por defecto seguro para SSR (Server Side Rendering)
function obtenerInstantaneaServidorTema(): TemaVisual {
  return "pastel";
}

// ============================================================================
// SECCIÓN 4: PROVEEDOR DEL CONTEXTO (COMPONENTE REACT)
// Provee el estado del tema a toda la jerarquía de componentes hijos.
// ============================================================================

export function ProveedorTema({ children }: { children: React.ReactNode }) {
  // Sincronización libre de errores de hidratación mediante useSyncExternalStore
  const tema = useSyncExternalStore(
    suscribirTema,
    obtenerInstantaneaTema,
    obtenerInstantaneaServidorTema
  );

  // Aplicar atributo data-theme en la raíz HTML para selectores globales de CSS
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
  }, [tema]);

  const fijarTema = (nuevoTema: TemaVisual) => {
    localStorage.setItem(CLAVE_ALMACENAMIENTO_TEMA, nuevoTema);
    window.dispatchEvent(new Event("storage"));
  };

  const alternarTema = () => {
    const siguienteTema: TemaVisual = tema === "pastel" ? "arirang" : "pastel";
    fijarTema(siguienteTema);
  };

  return (
    <ContextoTema.Provider
      value={{
        tema,
        alternarTema,
        fijarTema,
        // Compatibilidad con código previo
        theme: tema,
        toggleTheme: alternarTema,
        setTheme: fijarTema,
      }}
    >
      <div className={tema === "arirang" ? "theme-arirang" : "theme-pastel"}>
        {children}
      </div>
    </ContextoTema.Provider>
  );
}

// ============================================================================
// SECCIÓN 5: HOOK PERSONALIZADO
// Permite a cualquier componente acceder y modificar el tema visual activo.
// ============================================================================

export function useTema() {
  const contexto = useContext(ContextoTema);
  if (!contexto) {
    throw new Error("useTema debe usarse dentro de un ProveedorTema");
  }
  return contexto;
}

// ============================================================================
// SECCIÓN 6: EXPORTACIONES DE COMPATIBILIDAD
// ============================================================================
export type VisualTheme = TemaVisual;
export const ThemeProvider = ProveedorTema;
export const useTheme = useTema;
