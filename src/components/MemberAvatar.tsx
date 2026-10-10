"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BTSMember } from "@/data/btsMembers";
import { useTheme } from "@/context/ThemeContext";

interface MemberAvatarProps {
  member: BTSMember;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function MemberAvatar({ member, size = "md", className = "" }: MemberAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const { theme } = useTheme();
  const isPastel = theme === "pastel";

  const sizeClasses = {
    sm: "w-12 h-12 text-sm",
    md: "w-20 h-20 text-xl",
    lg: "w-32 h-32 text-3xl",
    xl: "w-44 h-44 text-5xl",
  }[size];

  const currentPalette = isPastel ? member.palette.pastel : member.palette.arirang;

  if (!imageError) {
    return (
      <div
        className={`relative rounded-2xl overflow-hidden border-2 shadow-md flex items-center justify-center transition-transform duration-300 hover:scale-105 ${sizeClasses} ${className}`}
        style={{
          borderColor: currentPalette.primary,
          backgroundColor: isPastel ? currentPalette.secondary : "#18181B",
        }}
      >
        <Image
          src={member.imagePath}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 150px, 200px"
          className="object-cover object-top"
          onError={() => setImageError(true)}
          priority
        />
      </div>
    );
  }

  // Illustrated Avatar Fallback
  return (
    <div
      className={`relative rounded-2xl border-2 shadow-md flex flex-col items-center justify-center font-black transition-transform duration-300 hover:scale-105 ${sizeClasses} ${className}`}
      style={{
        borderColor: currentPalette.primary,
        backgroundColor: isPastel ? currentPalette.secondary : "#18181B",
        color: currentPalette.primary,
      }}
    >
      <span className="leading-none">{member.name.charAt(0)}</span>
      <span className="text-[10px] tracking-widest font-normal opacity-80 mt-1">
        {member.koreanName}
      </span>
      <div className="absolute top-1 right-1 text-[9px] px-1 py-0.2 rounded-full font-bold bg-white/70 text-zinc-800">
        #{member.number}
      </div>
    </div>
  );
}
