// ============================================================================
// ARCHIVO: src/components/RuletaRegalos.tsx
// DESCRIPCIÓN: Rueda giratoria SVG dividida en 7 sectores (uno por miembro de BTS).
//              Soporta animación física, aguja superior y colores según el tema.
// ============================================================================

"use client";

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// React, contexto de ruleta para rotación/giro, contexto de tema y datos de BTS.
// ============================================================================

import React from "react";
import { useRuleta } from "@/context/ContextoRuleta";
import { useTema } from "@/context/ContextoTema";
import { MIEMBROS_BTS } from "@/data/miembrosBts";

// ============================================================================
// SECCIÓN 2: CONSTANTES GEOMÉTRICAS DE LA RUEDA SVG
// 7 sectores de 51.43 grados cada uno, radio y coordenadas centrales.
// ============================================================================

const CANTIDAD_SECTORES = 7;
const ANGULO_SECTOR = 360 / CANTIDAD_SECTORES;
const RADIO = 180;
const CENTRO = 200;

// Construye la trayectoria SVG ('path') de cada cuña de la ruleta
function obtenerTrayectoriaSector(indice: number): string {
  const anguloInicial = (indice * ANGULO_SECTOR * Math.PI) / 180;
  const anguloFinal = ((indice + 1) * ANGULO_SECTOR * Math.PI) / 180;

  const x1 = CENTRO + RADIO * Math.cos(anguloInicial);
  const y1 = CENTRO + RADIO * Math.sin(anguloInicial);
  const x2 = CENTRO + RADIO * Math.cos(anguloFinal);
  const y2 = CENTRO + RADIO * Math.sin(anguloFinal);

  return `M ${CENTRO} ${CENTRO} L ${x1} ${y1} A ${RADIO} ${RADIO} 0 0 1 ${x2} ${y2} Z`;
}

// Paleta vibrante y alegre para el Modo Pastel
const COLORES_PASTEL = [
  "#B892FF", // 1: Yoongi (Lila Borahae pastel)
  "#FF85A2", // 2: Tae (Rosa fresa pastel)
  "#FFD166", // 3: Jimin (Amarillo sol pastel)
  "#6EC5E9", // 4: Namjoon (Celeste cielo pastel)
  "#FF9770", // 5: Jin (Durazno albaricoque pastel)
  "#5AE0A8", // 6: Hobi (Menta brillante pastel)
  "#D499E2", // 7: Jungkook (Orquídea lavanda pastel)
];

// Paleta de alto contraste para el Modo Arirang Tour (Rojo, blanco y negro)
const COLORES_ARIRANG = [
  "#EF4444", // 1: Yoongi (Rojo fuego estadio)
  "#FFFFFF", // 2: Tae (Blanco puro contraste)
  "#18181B", // 3: Jimin (Negro onyx)
  "#DC2626", // 4: Namjoon (Rojo carmesí)
  "#FFFFFF", // 5: Jin (Blanco puro contraste)
  "#18181B", // 6: Hobi (Negro onyx)
  "#FFFFFF", // 7: Jungkook (Blanco puro contraste)
];

// ============================================================================
// SECCIÓN 3: COMPONENTE PRINCIPAL (RULETA DE REGALOS)
// Renderiza el plato giratorio con los 7 miembros y la aguja indicadora.
// ============================================================================

export function RuletaRegalos() {
  const { rotacion, estaGirando, numerosSorteados } = useRuleta();
  const { tema } = useTema();
  const esPastel = tema === "pastel";

  return (
    <div className="relative flex flex-col items-center justify-center p-3 sm:p-5">
      {/* Aguja indicadora superior fija */}
      <div className="relative z-20 -mb-5 flex flex-col items-center pointer-events-none">
        <svg
          viewBox="0 0 28 36"
          className={`w-8 h-10 drop-shadow-lg transition-transform duration-300 ${
            estaGirando ? "scale-110" : ""
          }`}
        >
          <polygon
            points="14,34 2,4 26,4"
            fill={esPastel ? "#9333EA" : "#EF4444"}
            stroke="#FFFFFF"
            strokeWidth={2.5}
          />
          <circle cx={14} cy={11} r={4} fill="#FFFFFF" />
        </svg>
      </div>

      {/* Contenedor biselado de la ruleta */}
      <div className="relative w-85 h-85 sm:w-102.5 sm:h-102.5 max-w-[90vw] max-h-[90vw] flex items-center justify-center">
        {/* Halo resplandeciente exterior */}
        <div
          className={`absolute inset-0 rounded-full blur-2xl opacity-60 transition-all duration-500 ${
            estaGirando
              ? esPastel
                ? "bg-purple-300 scale-105"
                : "bg-red-500 scale-105"
              : esPastel
              ? "bg-pink-300/60"
              : "bg-red-950"
          }`}
        />

        {/* Anillo exterior decorativo */}
        <div
          className={`relative w-full h-full rounded-full p-2.5 transition-all duration-300 border-4 shadow-2xl ${
            esPastel
              ? "bg-white border-purple-300 shadow-purple-200/60"
              : "bg-zinc-950 border-white/90 shadow-red-950"
          }`}
        >
          {/* Plato SVG giratorio con aceleración y desaceleración fluida */}
          <div
            className="w-full h-full rounded-full overflow-hidden"
            style={{
              transform: `rotate(${rotacion}deg)`,
              transition: estaGirando
                ? "transform 3.6s cubic-bezier(0.18, 0.88, 0.22, 1)"
                : "none",
            }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {/* Renderizado de los 7 sectores */}
              {MIEMBROS_BTS.map((miembro, indice) => {
                const yaSorteado = numerosSorteados.includes(miembro.numero);
                const colorOriginal = esPastel ? COLORES_PASTEL[indice] : COLORES_ARIRANG[indice];
                const rellenoCuña = yaSorteado
                  ? esPastel
                    ? "#D8B4FE"
                    : "#27272A"
                  : colorOriginal;

                const anguloMedio = (indice * ANGULO_SECTOR + ANGULO_SECTOR / 2) * (Math.PI / 180);
                const radioTexto = RADIO * 0.65;
                const tx = CENTRO + radioTexto * Math.cos(anguloMedio);
                const ty = CENTRO + radioTexto * Math.sin(anguloMedio);
                const rotacionTexto = indice * ANGULO_SECTOR + ANGULO_SECTOR / 2 + 90;

                const colorTexto = yaSorteado
                  ? esPastel
                    ? "#7E22CE"
                    : "#71717A"
                  : esPastel
                  ? "#2E1065"
                  : indice === 1 || indice === 4 || indice === 6
                  ? "#09090B"
                  : "#FFFFFF";

                return (
                  <g key={miembro.id}>
                    <path
                      d={obtenerTrayectoriaSector(indice)}
                      fill={rellenoCuña}
                      stroke={esPastel ? "#FFFFFF" : "#3F3F46"}
                      strokeWidth={2}
                      opacity={yaSorteado ? 0.75 : 1}
                    />

                    {/* Número y nombre del miembro dentro del sector */}
                    <g transform={`translate(${tx}, ${ty}) rotate(${rotacionTexto})`}>
                      <text
                        x="0"
                        y="-6"
                        textAnchor="middle"
                        fill={colorTexto}
                        fontSize="15"
                        fontWeight="900"
                        fontFamily="var(--font-outfit), sans-serif"
                      >
                        #{miembro.numero}
                      </text>
                      <text
                        x="0"
                        y="10"
                        textAnchor="middle"
                        fill={colorTexto}
                        fontSize="10"
                        fontWeight="800"
                        fontFamily="var(--font-plus-jakarta), sans-serif"
                        opacity={yaSorteado ? 0.7 : 0.95}
                      >
                        {miembro.nombre}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Botón central decorativo */}
              <circle
                cx={CENTRO}
                cy={CENTRO}
                r={36}
                fill={esPastel ? "#FAF5FF" : "#09090B"}
                stroke={esPastel ? "#C084FC" : "#DC2626"}
                strokeWidth={3}
              />
              <circle
                cx={CENTRO}
                cy={CENTRO}
                r={28}
                fill={esPastel ? "#A855F7" : "#EF4444"}
              />
              <text
                x={CENTRO}
                y={CENTRO + 5}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="14"
                fontWeight="900"
                fontFamily="var(--font-outfit), sans-serif"
              >
                BTS
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECCIÓN 4: EXPORTACIONES DE COMPATIBILIDAD
// ============================================================================
export const RouletteWheel = RuletaRegalos;
