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
  const [hasError, setHasError] = useState(false);
  const { theme } = useTheme();
  const isPastel = theme === "pastel";

  const sizeClasses = {
    sm: "w-12 h-12 text-xs",
    md: "w-20 h-20 text-sm",
    lg: "w-32 h-32 text-xl",
    xl: "w-40 h-40 text-2xl",
  }[size];

  if (!hasError) {
    return (
      <div
        className={`relative rounded-2xl overflow-hidden border flex items-center justify-center transition-all ${sizeClasses} ${className} ${
          isPastel ? "border-[#DDD7CD] bg-[#F4F1EA]" : "border-[#262630] bg-[#141418]"
        }`}
      >
        <Image
          src={member.imagePath}
          alt={member.name}
          fill
          unoptimized
          sizes="(max-width: 768px) 160px, 200px"
          className="object-cover object-top"
          onError={() => setHasError(true)}
          priority
        />
      </div>
    );
  }

  // Refined Minimalist Monogram / Photocard Seal
  return (
    <div
      className={`relative rounded-2xl border flex flex-col items-center justify-center font-serif text-center transition-all ${sizeClasses} ${className} ${
        isPastel
          ? "border-[#DCD6CA] bg-[#F7F5EF] text-[#2C2738]"
          : "border-[#2A2A36] bg-[#14141A] text-[#E4E4E8]"
      }`}
    >
      <span className="font-serif italic font-normal">{member.name}</span>
      <span className="text-[10px] font-sans opacity-60 tracking-widest mt-0.5">
        {member.koreanName}
      </span>
      <span className="text-[9px] font-mono opacity-50 mt-1">
        0{member.number}
      </span>
    </div>
  );
}
