// ============================================================================
// ARCHIVO: src/components/AvatarEncabezadoUsuario.tsx
// DESCRIPCIÓN: Avatar del usuario autenticado en la barra superior.
//              Muestra la foto de perfil de Valentina con soporte dinámico de temas.
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// React y contexto del tema para adaptar bordes y colores.
// ============================================================================

import React, { useState } from "react";
import { useTema } from "@/context/ContextoTema";

// ============================================================================
// SECCIÓN 2: TIPOS E INTERFACES
// Propiedades del componente con el ID del usuario y nombre opcional.
// ============================================================================

export interface PropiedadesAvatarEncabezadoUsuario {
  idUsuario?: string;
  nombre?: string;
  // Compatibilidad
  userId?: string;
  name?: string;
}

// ============================================================================
// SECCIÓN 3: COMPONENTE PRINCIPAL (AVATAR DE ENCABEZADO)
// Determina la lista de rutas candidatas para la foto de Valentina.
// ============================================================================

export function AvatarEncabezadoUsuario({ idUsuario, nombre, userId, name }: PropiedadesAvatarEncabezadoUsuario) {
  const { tema } = useTema();
  const esPastel = tema === "pastel";

  const idFinal = idUsuario || userId;
  const nombreFinal = nombre || name;
  const esValentina = idFinal === "valentina";

  // Rutas candidatas priorizadas para la foto de perfil
  const candidatas = React.useMemo(() => {
    return [
      `/img/fotoPerfil/fotoPerfilValentina.jpg`,
      `/img/fotoPerfil/fotoPerfilValentina.png`,
      `/img/fotoPerfil/fotoPerfilValentina.jpeg`,
      `/img/fotoPerfil/valentina.jpg`,
      `/img/fotoPerfil/valentina.png`,
      `/img/fotoPerfil/${tema}.jpg`,
      `/img/fotoPerfil/${tema}.png`,
      `/valentina-${tema}.png`,
      `/valentina_${tema}.png`,
      `/valentina.png`,
      `/valentina.jpg`,
      `/valentina.jpeg`,
      `/valentina.webp`,
    ];
  }, [tema]);

  return (
    <VistaAvatarEncabezado
      key={`${idFinal}-${tema}`}
      esValentina={esValentina}
      nombre={nombreFinal}
      esPastel={esPastel}
      candidatas={candidatas}
    />
  );
}

// ============================================================================
// SECCIÓN 4: COMPONENTE INTERNO DE RENDERIZADO VISUAL
// Maneja la degradación elegante (fallback) si alguna imagen falla al cargar.
// ============================================================================

function VistaAvatarEncabezado({
  esValentina,
  nombre,
  esPastel,
  candidatas,
}: {
  esValentina: boolean;
  nombre?: string;
  esPastel: boolean;
  candidatas: string[];
}) {
  const [indiceCandidata, setIndiceCandidata] = useState(0);
  const [todasFallaron, setTodasFallaron] = useState(false);

  const manejarErrorImagen = () => {
    if (indiceCandidata + 1 < candidatas.length) {
      setIndiceCandidata((prev) => prev + 1);
    } else {
      setTodasFallaron(true);
    }
  };

  if (esValentina && !todasFallaron) {
    return (
      <div
        className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 shadow-xs transition-transform duration-200 hover:scale-105 flex items-center justify-center ${
          esPastel ? "border-purple-300 bg-purple-100" : "border-red-600 bg-zinc-900"
        }`}
        title="Foto de Valentina"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={candidatas[indiceCandidata]}
          alt={nombre || "Valentina"}
          className="w-full h-full object-cover object-center"
          onError={manejarErrorImagen}
        />
      </div>
    );
  }

  // Fallback para Administrador o si la foto de Valentina no se encuentra
  return (
    <div
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center text-sm font-black shadow-xs transition-colors duration-200 ${
        esValentina
          ? esPastel
            ? "border-purple-300 bg-linear-to-br from-purple-200 to-pink-200 text-purple-900"
            : "border-red-600 bg-linear-to-br from-red-600 to-zinc-900 text-white"
          : esPastel
          ? "border-purple-200 bg-purple-100 text-purple-800"
          : "border-zinc-700 bg-zinc-800 text-zinc-300"
      }`}
    >
      <span>{esValentina ? (esPastel ? "💜" : "❤️") : "🛠️"}</span>
    </div>
  );
}

// ============================================================================
// SECCIÓN 5: EXPORTACIONES DE COMPATIBILIDAD
// ============================================================================
export const UserHeaderAvatar = AvatarEncabezadoUsuario;
