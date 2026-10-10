"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from "react";
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

function subscribeLottery(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getLotterySnapshot(): string {
  return localStorage.getItem(STORAGE_KEY_DRAWN) || "[]";
}

function getLotteryServerSnapshot(): string {
  return "[]";
}

export function LotteryProvider({ children }: { children: React.ReactNode }) {
  const drawnNumbersRaw = useSyncExternalStore(
    subscribeLottery,
    getLotterySnapshot,
    getLotteryServerSnapshot
  );

  let drawnNumbers: number[] = [];
  try {
    const parsed = JSON.parse(drawnNumbersRaw);
    if (Array.isArray(parsed)) {
      drawnNumbers = parsed.filter((n) => typeof n === "number" && n >= 1 && n <= 7);
    }
  } catch {
    drawnNumbers = [];
  }

  const [activeMember, setActiveMember] = useState<BTSMember | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [lastDrawnNumber, setLastDrawnNumber] = useState<number | null>(null);

  const remainingNumbers = INITIAL_NUMBERS.filter((n) => !drawnNumbers.includes(n));
  const isCompleted = remainingNumbers.length === 0;

  const revealedMembers = drawnNumbers
    .map((num) => BTS_MEMBERS.find((m) => m.number === num))
    .filter((m): m is BTSMember => !!m);

  const spin = () => {
    if (isSpinning || remainingNumbers.length === 0) return;

    setIsSpinning(true);

    // FIRST DRAW MUST ALWAYS BE NUMBER 4 (Namjoon: Dedicatoria del corazón)
    let chosenNumber: number;
    if (drawnNumbers.length === 0 && remainingNumbers.includes(4)) {
      chosenNumber = 4;
    } else {
      const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
      chosenNumber = remainingNumbers[randomIndex];
    }

    setLastDrawnNumber(chosenNumber);

    const segmentAngle = 360 / 7;
    const sectorCenter = (chosenNumber - 1) * segmentAngle + segmentAngle / 2;

    const extraSpins = 5;
    const currentWheelAngle = rotation % 360;
    const targetOffset = ((270 - sectorCenter - currentWheelAngle) % 360 + 360) % 360;
    const newRotation = rotation + 360 * extraSpins + targetOffset;

    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const newDrawn = [...drawnNumbers, chosenNumber];
      localStorage.setItem(STORAGE_KEY_DRAWN, JSON.stringify(newDrawn));
      window.dispatchEvent(new Event("storage"));

      const member = BTS_MEMBERS.find((m) => m.number === chosenNumber);
      if (member) {
        setActiveMember(member);
      }
    }, 3600);
  };

  const resetLottery = () => {
    if (isSpinning) return;
    localStorage.removeItem(STORAGE_KEY_DRAWN);
    window.dispatchEvent(new Event("storage"));
    setActiveMember(null);
    setLastDrawnNumber(null);
    setRotation(0);
  };

  const openMemberModal = (member: BTSMember) => {
    setActiveMember(member);
  };

  const closeMemberModal = () => {
    setActiveMember(null);
  };

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
      {children}
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
