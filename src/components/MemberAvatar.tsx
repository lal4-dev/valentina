"use client";

import React, { useState } from "react";
import { BTSMember } from "@/data/btsMembers";
import { useTheme } from "@/context/ThemeContext";

interface MemberAvatarProps {
  member: BTSMember;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function MemberAvatar({ member, size = "md", className = "" }: MemberAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const { theme } = useTheme();
  const isPastel = theme === "pastel";

  const sizeClasses = {
    sm: "w-12 h-12 text-xs",
    md: "w-20 h-20 text-sm",
    lg: "w-32 h-32 text-base",
    xl: "w-40 h-40 text-lg",
  }[size];

  if (!hasError) {
    return (
      <div
        className={`relative rounded-2xl overflow-hidden border-2 flex items-center justify-center transition-all shadow-sm ${sizeClasses} ${className} ${
          isPastel
            ? "border-purple-200 bg-purple-50"
            : "border-zinc-700 bg-zinc-900"
        }`}
      >
        {/* Standard img to prevent Next.js image server 404 noise while user prepares pngs */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.imagePath}
          alt={member.name}
          className="w-full h-full object-cover object-top"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Celebratory Birthday Photocard Seal
  return (
    <div
      className={`relative rounded-2xl border-2 flex flex-col items-center justify-center text-center p-2 transition-all shadow-sm ${sizeClasses} ${className} ${
        isPastel
          ? "border-purple-300 bg-linear-to-br from-purple-100 via-pink-100 to-amber-100 text-purple-950"
          : "border-red-600 bg-linear-to-br from-zinc-900 via-zinc-950 to-red-950 text-white"
      }`}
    >
      <span className="font-extrabold tracking-tight leading-tight">
        {member.stageName}
      </span>
      <span
        className={`text-[10px] font-bold mt-0.5 ${
          isPastel ? "text-purple-700" : "text-red-400"
        }`}
      >
        {member.koreanName}
      </span>
      <span
        className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full mt-1 ${
          isPastel ? "bg-white/80 text-purple-900" : "bg-red-600/80 text-white"
        }`}
      >
        #{member.number}
      </span>
    </div>
  );
}
