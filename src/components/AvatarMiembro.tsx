// ============================================================================
// ARCHIVO: src/components/AvatarMiembro.tsx
// DESCRIPCIÓN: Avatar de cada integrante de BTS con soporte para variantes
//              Pastel y Arirang, con fallback a Photocard en caso de error.
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// React, tipos de miembros de BTS y contexto de tema activo.
// ============================================================================

import React, { useState } from "react";
import { MiembroBTS } from "@/data/miembrosBts";
import { useTema } from "@/context/ContextoTema";

// ============================================================================
// SECCIÓN 2: TIPOS E INTERFACES
// Propiedades del avatar de miembro con tamaño seleccionable.
// ============================================================================

export interface PropiedadesAvatarMiembro {
  miembro?: MiembroBTS;
  tamano?: "sm" | "md" | "lg" | "xl";
  className?: string;
  // Compatibilidad
  member?: MiembroBTS;
  size?: "sm" | "md" | "lg" | "xl";
}

// ============================================================================
// SECCIÓN 3: COMPONENTE PRINCIPAL (AVATAR MIEMBRO)
// Determina las opciones de rutas de imagen por variante temática.
// ============================================================================

export function AvatarMiembro({
  miembro,
  tamano = "md",
  className = "",
  member,
  size,
}: PropiedadesAvatarMiembro) {
  const miembroFinal = miembro || member;
  const tamanoFinal = tamano || size || "md";

  const { tema } = useTema();
  const esPastel = tema === "pastel";

  // Rutas candidatas priorizadas por variante y número
  const candidatas = React.useMemo(() => {
    if (!miembroFinal) return [];
    const carpetaTema = esPastel ? "pastel" : "arirang";
    const nombreEnMinuscula = miembroFinal.nombre.toLowerCase();

    return [
      // 1. Variante configurada directa: /img/pastel/1.png o /img/arirang/1.png
      miembroFinal.variantesImagen[esPastel ? "pastel" : "arirang"],
      // 2. Por número dentro de carpeta del tema:
      `/img/${carpetaTema}/${miembroFinal.numero}.png`,
      // 3. Por nombre dentro de carpeta del tema:
      `/img/${carpetaTema}/${nombreEnMinuscula}.png`,
      // 4. Por ruta general:
      miembroFinal.rutaImagen,
      // 5. En raíz de img:
      `/img/${miembroFinal.numero}.png`,
      `/img/${nombreEnMinuscula}.png`,
      // 6. Respaldo histórico:
      `/members/${carpetaTema}/${miembroFinal.numero}.png`,
      `/members/${carpetaTema}/${nombreEnMinuscula}.png`,
    ];
  }, [miembroFinal, esPastel]);

  if (!miembroFinal) return null;

  return (
    <VistaAvatarMiembro
      key={`${miembroFinal.id}-${tema}`}
      miembro={miembroFinal}
      tamano={tamanoFinal}
      className={className}
      candidatas={candidatas}
      esPastel={esPastel}
    />
  );
}

// ============================================================================
// SECCIÓN 4: COMPONENTE INTERNO CON TOLERANCIA A FALLOS
// Intenta cargar las rutas en orden; si todas fallan muestra una photocard conmemorativa.
// ============================================================================

function VistaAvatarMiembro({
  miembro,
  tamano,
  className,
  candidatas,
  esPastel,
}: {
  miembro: MiembroBTS;
  tamano: "sm" | "md" | "lg" | "xl";
  className: string;
  candidatas: string[];
  esPastel: boolean;
}) {
  const [indiceCandidata, setIndiceCandidata] = useState(0);
  const [todasFallaron, setTodasFallaron] = useState(false);

  const clasesTamano = {
    sm: "w-12 h-12 text-xs",
    md: "w-20 h-20 text-sm",
    lg: "w-32 h-32 text-base",
    xl: "w-40 h-40 text-lg",
  }[tamano];

  const manejarErrorImagen = () => {
    if (indiceCandidata + 1 < candidatas.length) {
      setIndiceCandidata((prev) => prev + 1);
    } else {
      setTodasFallaron(true);
    }
  };

  if (!todasFallaron) {
    return (
      <div
        className={`relative rounded-2xl overflow-hidden border-2 flex items-center justify-center transition-all shadow-sm ${clasesTamano} ${className} ${
          esPastel
            ? "border-purple-200 bg-purple-50"
            : "border-zinc-700 bg-zinc-900"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={candidatas[indiceCandidata]}
          alt={miembro.nombre}
          className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
          onError={manejarErrorImagen}
        />
      </div>
    );
  }

  // Tarjeta conmemorativa en caso de ausencia de imagen local
  return (
    <div
      className={`relative rounded-2xl border-2 flex flex-col items-center justify-center text-center p-2 transition-all shadow-xs ${clasesTamano} ${className} ${
        esPastel
          ? "border-purple-300 bg-purple-100/90 text-purple-950"
          : "border-red-600 bg-linear-to-br from-zinc-900 via-zinc-950 to-red-950 text-white"
      }`}
    >
      <span className="font-mono font-black text-sm sm:text-base leading-none">
        #{miembro.numero}
      </span>
      <span className="font-extrabold text-[11px] leading-tight truncate mt-1">
        {miembro.nombreArtistico}
      </span>
      <span className="text-[10px] mt-0.5">{esPastel ? "💜" : "❤️"}</span>
    </div>
  );
}

// ============================================================================
// SECCIÓN 5: EXPORTACIONES DE COMPATIBILIDAD
// ============================================================================
export const MemberAvatar = AvatarMiembro;
