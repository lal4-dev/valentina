"use client";

import React from "react";
import { useLottery } from "@/context/LotteryContext";
import { useTheme } from "@/context/ThemeContext";
import { BTS_MEMBERS } from "@/data/btsMembers";

const NUM_SECTORS = 7;
const SECTOR_ANGLE = 360 / NUM_SECTORS;
const RADIUS = 180;
const CENTER = 200;

function getSectorPath(index: number): string {
  const startAngle = (index * SECTOR_ANGLE * Math.PI) / 180;
  const endAngle = ((index + 1) * SECTOR_ANGLE * Math.PI) / 180;

  const x1 = CENTER + RADIUS * Math.cos(startAngle);
  const y1 = CENTER + RADIUS * Math.sin(startAngle);
  const x2 = CENTER + RADIUS * Math.cos(endAngle);
  const y2 = CENTER + RADIUS * Math.sin(endAngle);

  return `M ${CENTER} ${CENTER} L ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 0 1 ${x2} ${y2} Z`;
}

// Vibrant, joyful pastel palette (Real cheerful birthday pastels: lila borahae, rosa fresa, amarillo sol, celeste cielo, durazno, menta fresca, orquídea)
const PASTEL_COLORS = [
  "#B892FF", // 1: Yoongi (Pastel Borahae Purple)
  "#FF85A2", // 2: Tae (Pastel Strawberry Rose)
  "#FFD166", // 3: Jimin (Pastel Sunshine Yellow)
  "#6EC5E9", // 4: Namjoon (Pastel Sky Cyan)
  "#FF9770", // 5: Jin (Pastel Peach Apricot)
  "#5AE0A8", // 6: Hobi (Pastel Bright Mint)
  "#D499E2", // 7: Jungkook (Pastel Lavender Orchid)
];

// High-contrast Arirang Tour palette: alternating Stadium Red, Pure Crisp White, and Tour Onyx Black
const ARIRANG_COLORS = [
  "#EF4444", // 1: Yoongi (Rojo fuego estadio)
  "#FFFFFF", // 2: Tae (Blanco puro contraste)
  "#18181B", // 3: Jimin (Negro onyx)
  "#DC2626", // 4: Namjoon (Rojo carmesí)
  "#FFFFFF", // 5: Jin (Blanco puro contraste)
  "#18181B", // 6: Hobi (Negro onyx)
  "#FFFFFF", // 7: Jungkook (Blanco puro contraste)
];

export function RouletteWheel() {
  const { rotation, isSpinning, drawnNumbers, spin, isCompleted } = useLottery();
  const { theme } = useTheme();
  const isPastel = theme === "pastel";

  return (
    <div className="relative flex flex-col items-center justify-center p-3 sm:p-5">
      {/* Top Pointer Needle */}
      <div className="relative z-20 -mb-5 flex flex-col items-center pointer-events-none">
        <svg
          viewBox="0 0 28 36"
          className={`w-8 h-10 drop-shadow-lg transition-transform duration-300 ${
            isSpinning ? "scale-110" : ""
          }`}
        >
          <polygon
            points="14,34 2,4 26,4"
            fill={isPastel ? "#9333EA" : "#EF4444"}
            stroke="#FFFFFF"
            strokeWidth={2.5}
          />
          <circle cx={14} cy={11} r={4} fill="#FFFFFF" />
        </svg>
      </div>

      {/* Wheel Bezel Container */}
      <div className="relative w-85 h-85 sm:w-102.5 sm:h-102.5 flex items-center justify-center">
        {/* Glow Halo */}
        <div
          className={`absolute inset-0 rounded-full blur-2xl opacity-60 transition-all duration-500 ${
            isSpinning
              ? isPastel
                ? "bg-purple-300 scale-105"
                : "bg-red-500 scale-105"
              : isPastel
              ? "bg-pink-300/60"
              : "bg-red-950"
          }`}
        />

        {/* Outer Ring */}
        <div
          className={`relative w-full h-full rounded-full p-2.5 transition-all duration-300 border-4 shadow-2xl ${
            isPastel
              ? "bg-white border-purple-300 shadow-purple-200/60"
              : "bg-zinc-950 border-white/90 shadow-red-950"
          }`}
        >
          {/* Spinning SVG Platter */}
          <div
            className="w-full h-full rounded-full overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? "transform 3.6s cubic-bezier(0.18, 0.88, 0.22, 1)"
                : "none",
            }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {/* Sectors */}
              {BTS_MEMBERS.map((member, index) => {
                const isDrawn = drawnNumbers.includes(member.number);
                const rawColor = isPastel ? PASTEL_COLORS[index] : ARIRANG_COLORS[index];
                const sliceFill = isDrawn
                  ? isPastel
                    ? "#E9D5FF"
                    : "#27272A"
                  : rawColor;

                // Sector text colors: ensure crisp, high contrast
                let textColor: string;
                if (isDrawn) {
                  textColor = isPastel ? "#7E22CE" : "#A1A1AA";
                } else if (isPastel) {
                  textColor = "#2E1065"; // Deep royal violet for clear pastel contrast
                } else {
                  // In Arirang mode: pure black on white slice, pure white on red/dark slices
                  textColor = sliceFill === "#FFFFFF" ? "#09090B" : "#FFFFFF";
                }

                const midAngle = ((index + 0.5) * SECTOR_ANGLE * Math.PI) / 180;
                const textDistance = RADIUS * 0.65;
                const textX = CENTER + textDistance * Math.cos(midAngle);
                const textY = CENTER + textDistance * Math.sin(midAngle);
                const rotationDeg = (index + 0.5) * SECTOR_ANGLE + 90;

                return (
                  <g key={member.id}>
                    {/* Slice */}
                    <path
                      d={getSectorPath(index)}
                      fill={sliceFill}
                      stroke={isPastel ? "#FFFFFF" : sliceFill === "#FFFFFF" ? "#EF4444" : "#FFFFFF"}
                      strokeWidth={2.5}
                      opacity={isDrawn ? 0.65 : 1}
                    />

                    {/* Content */}
                    <g
                      transform={`translate(${textX}, ${textY}) rotate(${rotationDeg})`}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <text
                        y={-12}
                        fill={textColor}
                        className="font-black text-base tracking-wider"
                      >
                        {isDrawn ? `✓ #${member.number}` : `#${member.number}`}
                      </text>

                      <text
                        y={8}
                        fill={textColor}
                        className="font-extrabold text-xs tracking-tight"
                      >
                        {member.name}
                      </text>

                      <text
                        y={22}
                        fill={textColor}
                        className="text-[10px] font-bold opacity-90"
                      >
                        {member.koreanName}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Center Hub Outer Ring */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={48}
                fill={isPastel ? "#FFFFFF" : "#18181B"}
                stroke={isPastel ? "#C084FC" : "#FFFFFF"}
                strokeWidth={3.5}
              />
            </svg>
          </div>

          {/* Central Spin Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={spin}
              disabled={isSpinning || isCompleted}
              className={`pointer-events-auto w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold text-xs shadow-xl transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-60 ${
                isPastel
                  ? "bg-linear-to-tr from-purple-200 via-pink-200 to-purple-300 text-purple-950 font-black shadow-purple-200/60 hover:scale-105 border-2 border-purple-300"
                  : "bg-linear-to-tr from-red-600 via-red-500 to-zinc-950 text-white border-2 border-white shadow-red-950 hover:scale-105"
              }`}
            >
              {isSpinning ? (
                <span className="text-xl animate-spin">💜</span>
              ) : isCompleted ? (
                <>
                  <span className="text-base font-extrabold">¡LISTO!</span>
                  <span className="text-[10px] opacity-90">7 de 7</span>
                </>
              ) : (
                <>
                  <span className="text-sm font-extrabold tracking-wider">GIRAR</span>
                  <span className="text-[10px] font-bold opacity-95 mt-0.5">Sorteo</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
