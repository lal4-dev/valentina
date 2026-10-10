// ============================================================================
// ARCHIVO: src/hooks/usarHidratacion.ts
// DESCRIPCIÓN: Hook para verificar si el componente ya fue hidratado en el cliente.
// ============================================================================

"use client";

import { useSyncExternalStore } from "react";

const suscripcionVacia = () => () => {};

export function useEstaHidratado(): boolean {
  return useSyncExternalStore(
    suscripcionVacia,
    () => true,
    () => false
  );
}

// Compatibilidad
export const useIsHydrated = useEstaHidratado;
