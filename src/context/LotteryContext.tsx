"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { BTSMember, BTS_MEMBERS } from "@/data/btsMembers";

interface LotteryContextType {
  remainingNumbers: number[];
  drawnNumbers: number[];
  revealedMembers: BTSMember[];
  activeMember: BTSMember | null;
  isSpinning: boolean;
  rotation: number;
  isCompleted: boolean;
  spin: () => void;
  resetLottery: () => void;
  openMemberModal: (member: BTSMember) => void;
  closeMemberModal: () => void;
  lastDrawnNumber: number | null;
}

const LotteryContext = createContext<LotteryContextType | undefined>(undefined);

const INITIAL_NUMBERS = [1, 2, 3, 4, 5, 6, 7];
const STORAGE_KEY_DRAWN = "bts_valentina_drawn_numbers";

export function LotteryProvider({ children }: { children: React.ReactNode }) {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [activeMember, setActiveMember] = useState<BTSMember | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [lastDrawnNumber, setLastDrawnNumber] = useState<number | null>(null);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Restore state from localStorage
  useEffect(() => {
    setIsHydrated(true);
    const saved = localStorage.getItem(STORAGE_KEY_DRAWN);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // ensure valid numbers 1-7
          const valid = parsed.filter((n) => typeof n === "number" && n >= 1 && n <= 7);
          setDrawnNumbers(valid);
        }
      } catch (err) {
        console.error("Error loading drawn numbers from storage", err);
      }
    }
  }, []);

  const remainingNumbers = INITIAL_NUMBERS.filter((n) => !drawnNumbers.includes(n));
  const isCompleted = remainingNumbers.length === 0;

  const revealedMembers = drawnNumbers
    .map((num) => BTS_MEMBERS.find((m) => m.number === num))
    .filter((m): m is BTSMember => !!m);

  const spin = useCallback(() => {
    if (isSpinning || remainingNumbers.length === 0) return;

    setIsSpinning(true);

    // Pick random number among REMAINING ones
    const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
    const chosenNumber = remainingNumbers[randomIndex];
    setLastDrawnNumber(chosenNumber);

    // 7 sectors in a wheel -> 360 / 7 = ~51.42857 degrees per sector
    // Sector indices: 1 corresponds to sector index 0, etc.
    const segmentAngle = 360 / 7;
    // Pointer is typically at top (90 deg or 270 deg / 0 deg).
    // Let's assume sector i is at: [i * segmentAngle, (i + 1) * segmentAngle].
    // Center of sector (chosenNumber - 1):
    const sectorCenter = (chosenNumber - 1) * segmentAngle + segmentAngle / 2;

    // To align sectorCenter with pointer at top (270 deg / -90 deg):
    // pointer is at 270 deg.
    // Target wheel rotation R such that: (R + sectorCenter) % 360 === 270
    // => R = 270 - sectorCenter + 360 * extraSpins
    const extraSpins = 5; // 5 full revolutions
    const currentWheelAngle = rotation % 360;
    const targetOffset = ((270 - sectorCenter - currentWheelAngle) % 360 + 360) % 360;
    const newRotation = rotation + 360 * extraSpins + targetOffset;

    setRotation(newRotation);

    // After spin animation finishes (3.5 seconds)
    setTimeout(() => {
      setIsSpinning(false);
      const newDrawn = [...drawnNumbers, chosenNumber];
      setDrawnNumbers(newDrawn);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY_DRAWN, JSON.stringify(newDrawn));
      }

      // Open reveal modal for the chosen member
      const member = BTS_MEMBERS.find((m) => m.number === chosenNumber);
      if (member) {
        setActiveMember(member);
      }
    }, 3600);
  }, [isSpinning, remainingNumbers, drawnNumbers, rotation]);

  const resetLottery = useCallback(() => {
    if (isSpinning) return;
    setDrawnNumbers([]);
    setActiveMember(null);
    setLastDrawnNumber(null);
    setRotation(0);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_DRAWN);
    }
  }, [isSpinning]);

  const openMemberModal = useCallback((member: BTSMember) => {
    setActiveMember(member);
  }, []);

  const closeMemberModal = useCallback(() => {
    setActiveMember(null);
  }, []);

  return (
    <LotteryContext.Provider
      value={{
        remainingNumbers,
        drawnNumbers,
        revealedMembers,
        activeMember,
        isSpinning,
        rotation,
        isCompleted,
        spin,
        resetLottery,
        openMemberModal,
        closeMemberModal,
        lastDrawnNumber,
      }}
    >
      {isHydrated ? children : null}
    </LotteryContext.Provider>
  );
}

export function useLottery() {
  const context = useContext(LotteryContext);
  if (!context) {
    throw new Error("useLottery must be used within a LotteryProvider");
  }
  return context;
}
