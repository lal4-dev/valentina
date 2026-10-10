"use client";

import React from "react";
import { useLottery } from "@/context/LotteryContext";
import { useTheme } from "@/context/ThemeContext";
import { BTS_MEMBERS } from "@/data/btsMembers";

const NUM_SECTORS = 7;
const SECTOR_ANGLE = 360 / NUM_SECTORS;
const RADIUS = 185;
const CENTER = 200;

function getSectorPath(index: number) {
  const startAngle = (index * SECTOR_ANGLE * Math.PI) / 180;
  const endAngle = ((index + 1) * SECTOR_ANGLE * Math.PI) / 180;

  const x1 = CENTER + RADIUS * Math.cos(startAngle);
  const y1 = CENTER + RADIUS * Math.sin(startAngle);
  const x2 = CENTER + RADIUS * Math.cos(endAngle);
  const y2 = CENTER + RADIUS * Math.sin(endAngle);

  return `M ${CENTER} ${CENTER} L ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 0 1 ${x2} ${y2} Z`;
}

// Tasteful, muted designer palette
const PASTEL_PALETTE = [
  "#E8E3F0", // Yoongi (Muted lavender)
  "#F2DFE4", // Tae (Dusty rose)
  "#F5ECE0", // Jimin (Soft linen champagne)
  "#DFE7EC", // Namjoon (Cloud blue)
  "#EFE7DA", // Jin (Warm almond)
  "#E0EBE2", // Hobi (Soft celadon sage)
  "#E5DEF2", // Jungkook (Delicate lilac)
];

const ARIRANG_PALETTE = [
  "#1A1A22", // Dark obsidian
  "#7A1822", // Muted crimson
  "#14141A", // Pure asphalt
  "#961E2A", // Concert red
  "#1D1D26", // Steel graphite
  "#5A131A", // Deep oxblood
  "#B52230", // Stage flame
];

export function RouletteWheel() {
  const { rotation, isSpinning, drawnNumbers, spin, isCompleted } = useLottery();
  const { theme } = useTheme();
  const isPastel = theme === "pastel";

  return (
    <div className="relative flex flex-col items-center justify-center p-3 sm:p-5">
      {/* Precision Indicator Needle at Top */}
      <div className="relative z-20 -mb-4 flex flex-col items-center pointer-events-none">
        <svg width="22" height="30" viewBox="0 0 22 30" fill="none">
          <path
            d="M11 28L4 4H18L11 28Z"
            fill={isPastel ? "#2C2738" : "#C52233"}
            stroke={isPastel ? "#FFFFFF" : "#141418"}
            strokeWidth="1.5"
          />
          <circle cx="11" cy="7" r="3" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Turntable / Dial Frame */}
      <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
        {/* Subtle Ambient Backing */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-700 ${
            isPastel
              ? "bg-[#E6E1D8]/60 blur-xl opacity-60"
              : "bg-[#7A1822]/40 blur-2xl opacity-50"
          }`}
        />

        {/* Outer Bezel */}
        <div
          className={`relative w-full h-full rounded-full p-2.5 transition-all duration-300 border ${
            isPastel
              ? "bg-white border-[#DDD7CD] shadow-paper"
              : "bg-[#111116] border-[#252530] shadow-vinyl"
          }`}
        >
          {/* Rotating Platter */}
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
              {/* Subtle Concentric Vinyl Grooves */}
              <circle cx={CENTER} cy={CENTER} r="185" fill="none" stroke="#000000" strokeOpacity="0.04" strokeWidth="1" />
              <circle cx={CENTER} cy={CENTER} r="150" fill="none" stroke="#000000" strokeOpacity="0.04" strokeWidth="1" />
              <circle cx={CENTER} cy={CENTER} r="115" fill="none" stroke="#000000" strokeOpacity="0.04" strokeWidth="1" />

              {/* Sectors */}
              {BTS_MEMBERS.map((member, index) => {
                const isDrawn = drawnNumbers.includes(member.number);
                const baseColor = isPastel ? PASTEL_PALETTE[index] : ARIRANG_PALETTE[index];
                const sliceFill = isDrawn ? (isPastel ? "#ECE9E2" : "#1A1A20") : baseColor;
                const textColor = isDrawn
                  ? isPastel
                    ? "#A8A398"
                    : "#585864"
                  : isPastel
                  ? "#2A2534"
                  : "#F0F0F4";

                const midAngle = ((index + 0.5) * SECTOR_ANGLE * Math.PI) / 180;
                const textDistance = RADIUS * 0.66;
                const textX = CENTER + textDistance * Math.cos(midAngle);
                const textY = CENTER + textDistance * Math.sin(midAngle);
                const rotationDeg = (index + 0.5) * SECTOR_ANGLE + 90;

                return (
                  <g key={member.id}>
                    {/* Wedge */}
                    <path
                      d={getSectorPath(index)}
                      fill={sliceFill}
                      stroke={isPastel ? "#FFFFFF" : "#282834"}
                      strokeWidth="1.5"
                      opacity={isDrawn ? 0.65 : 1}
                    />

                    {/* Typography */}
                    <g
                      transform={`translate(${textX}, ${textY}) rotate(${rotationDeg})`}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <text
                        y="-12"
                        fill={textColor}
                        fontSize="15"
                        fontWeight="700"
                        fontFamily="serif"
                        letterSpacing="1"
                      >
                        0{member.number}
                      </text>

                      <text
                        y="6"
                        fill={textColor}
                        fontSize="12"
                        fontWeight="600"
                        letterSpacing="0.2"
                      >
                        {member.name}
                      </text>

                      <text
                        y="20"
                        fill={textColor}
                        fontSize="9"
                        opacity={isDrawn ? 0.4 : 0.65}
                      >
                        {member.koreanName}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Center Spindle Collar */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r="48"
                fill={isPastel ? "#FFFFFF" : "#111116"}
                stroke={isPastel ? "#E4E0D6" : "#2A2A34"}
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Central Trigger Spindle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={spin}
              disabled={isSpinning || isCompleted}
              className={`pointer-events-auto w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-sm border disabled:pointer-events-none disabled:opacity-60 active:scale-95 ${
                isPastel
                  ? "bg-[#252030] text-white border-[#362F44] hover:bg-[#342D44]"
                  : "bg-[#C52233] text-white border-[#D63042] hover:bg-[#D92537]"
              }`}
            >
              {isSpinning ? (
                <span className="text-[11px] font-mono tracking-widest uppercase animate-pulse">
                  Girando
                </span>
              ) : isCompleted ? (
                <span className="text-[11px] font-mono tracking-widest uppercase">
                  Completo
                </span>
              ) : (
                <>
                  <span className="text-xs font-serif italic tracking-wide">
                    Sorteo
                  </span>
                  <span className="text-[9px] font-mono tracking-widest uppercase opacity-75 mt-0.5">
                    Girar
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
