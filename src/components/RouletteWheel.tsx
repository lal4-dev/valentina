"use client";

import React from "react";
import { useLottery } from "@/context/LotteryContext";
import { useTheme } from "@/context/ThemeContext";
import { BTS_MEMBERS } from "@/data/btsMembers";

export function RouletteWheel() {
  const { rotation, isSpinning, drawnNumbers, spin, isCompleted } = useLottery();
  const { theme } = useTheme();

  const isPastel = theme === "pastel";
  const numSectors = 7;
  const sectorAngle = 360 / numSectors;
  const radius = 180;
  const center = 200;

  // Sector colors based on theme
  const getSectorFill = (index: number, isDrawn: boolean) => {
    if (isPastel) {
      const pastelColors = [
        "#DDD6FE", // Yoongi (Lila)
        "#FBCFE8", // Tae (Rosa)
        "#FEF08A", // Jimin (Amarillo)
        "#BAE6FD", // Namjoon (Celeste)
        "#FED7AA", // Jin (Durazno)
        "#BBF7D0", // Hobi (Menta)
        "#E9D5FF", // Jungkook (Lavanda)
      ];
      return isDrawn ? "#E2E8F0" : pastelColors[index];
    } else {
      const arirangColors = [
        "#991B1B",
        "#18181B",
        "#DC2626",
        "#09090B",
        "#B91C1C",
        "#27272A",
        "#EF4444",
      ];
      return isDrawn ? "#27272A" : arirangColors[index];
    }
  };

  const getTextColor = (index: number, isDrawn: boolean) => {
    if (isPastel) {
      return isDrawn ? "#94A3B8" : "#4C1D95";
    }
    return isDrawn ? "#71717A" : "#FFFFFF";
  };

  const getSectorPath = (index: number) => {
    const startAngle = (index * sectorAngle * Math.PI) / 180;
    const endAngle = ((index + 1) * sectorAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* Pointer at the top */}
      <div className="relative z-20 -mb-5 flex flex-col items-center pointer-events-none">
        <div
          className={`w-7 h-9 transition-transform duration-300 ${
            isSpinning ? "animate-pulse scale-110" : ""
          }`}
        >
          <svg viewBox="0 0 28 36" className="w-full h-full drop-shadow-lg">
            <polygon
              points="14,34 2,4 26,4"
              fill={isPastel ? "#8B5CF6" : "#EF4444"}
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
            <circle cx="14" cy="10" r="4" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* Roulette Container */}
      <div className="relative w-[340px] h-[340px] sm:w-[400px] h-[400px] flex items-center justify-center">
        {/* Outer Glowing Ring */}
        <div
          className={`absolute inset-0 rounded-full blur-xl opacity-60 transition-all duration-700 ${
            isSpinning
              ? isPastel
                ? "bg-purple-400 scale-105"
                : "bg-red-600 scale-105"
              : isPastel
              ? "bg-pink-200"
              : "bg-red-950"
          }`}
        />

        {/* Outer Decorative Rim */}
        <div
          className={`relative w-full h-full rounded-full p-3 shadow-2xl border-4 transition-all duration-500 ${
            isPastel
              ? "bg-white/90 border-purple-300 shadow-purple-200"
              : "bg-zinc-900 border-red-700 shadow-black"
          }`}
        >
          {/* Rotating SVG Wheel */}
          <div
            className="w-full h-full rounded-full overflow-hidden"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? "transform 3.5s cubic-bezier(0.15, 0.9, 0.2, 1)"
                : "none",
            }}
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.06))" }}
            >
              {BTS_MEMBERS.map((member, index) => {
                const isDrawn = drawnNumbers.includes(member.number);
                const fill = getSectorFill(index, isDrawn);
                const textColor = getTextColor(index, isDrawn);
                const midAngle = ((index + 0.5) * sectorAngle * Math.PI) / 180;
                const textDistance = radius * 0.68;
                const textX = center + textDistance * Math.cos(midAngle);
                const textY = center + textDistance * Math.sin(midAngle);
                const rotationDeg = (index + 0.5) * sectorAngle + 90;

                return (
                  <g key={member.id} className="transition-colors duration-300">
                    <path
                      d={getSectorPath(index)}
                      fill={fill}
                      stroke={isPastel ? "#FFFFFF" : "#3F3F46"}
                      strokeWidth="2.5"
                      opacity={isDrawn ? 0.6 : 1}
                    />

                    <g
                      transform={`translate(${textX}, ${textY}) rotate(${rotationDeg})`}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <text
                        y="-10"
                        fill={textColor}
                        fontSize="20"
                        fontWeight="900"
                        fontFamily="sans-serif"
                      >
                        #{member.number}
                      </text>

                      <text
                        y="10"
                        fill={textColor}
                        fontSize="13"
                        fontWeight="700"
                        fontFamily="sans-serif"
                        letterSpacing="0.5"
                      >
                        {member.name}
                      </text>

                      {isDrawn && (
                        <text y="26" fontSize="12" fill={isPastel ? "#7C3AED" : "#EF4444"}>
                          ✓
                        </text>
                      )}
                    </g>
                  </g>
                );
              })}

              <circle
                cx={center}
                cy={center}
                r="46"
                fill={isPastel ? "#FFFFFF" : "#18181B"}
                stroke={isPastel ? "#DDD6FE" : "#EF4444"}
                strokeWidth="4"
              />
            </svg>
          </div>

          {/* Fixed Center Hub (Spin Button) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={spin}
              disabled={isSpinning || isCompleted}
              className={`pointer-events-auto w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold text-xs shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-75 ${
                isPastel
                  ? "bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-purple-400/50 hover:shadow-purple-400/80"
                  : "bg-gradient-to-tr from-red-600 to-zinc-900 text-white shadow-red-950 hover:shadow-red-800"
              }`}
            >
              {isSpinning ? (
                <span className="text-2xl animate-spin">💜</span>
              ) : isCompleted ? (
                <>
                  <span className="text-xl">🎉</span>
                  <span className="text-[10px] uppercase font-bold mt-0.5">¡Listo!</span>
                </>
              ) : (
                <>
                  <span className="text-xl">✨</span>
                  <span className="text-xs uppercase font-extrabold tracking-wider mt-0.5">
                    GIRAR
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
