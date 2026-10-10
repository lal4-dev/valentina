export interface BTSMember {
  id: number;
  name: string;
  stageName: string;
  realName: string;
  koreanName: string;
  number: number;
  role: string;
  quote: string;
  birthdayWish: string;
  giftHint: string;
  imagePath: string;
  palette: {
    pastel: {
      primary: string;
      secondary: string;
      accent: string;
      text: string;
      badge: string;
    };
    arirang: {
      primary: string;
      secondary: string;
      accent: string;
      text: string;
      badge: string;
    };
  };
}

export const BTS_MEMBERS: BTSMember[] = [
  {
    id: 1,
    number: 1,
    name: "Yoongi",
    stageName: "SUGA / Agust D",
    realName: "Min Yoongi",
    koreanName: "민윤기",
    role: "Rapero, Productor y Genio Musical",
    quote: "Que tus creaciones sean audaces y que tu final esté lleno de paz.",
    birthdayWish: "¡Feliz cumple, Valen! Que en este nuevo año encuentres la calma en medio de la tormenta y la fuerza para perseguir cada una de tus pasiones con el corazón.",
    giftHint: "Un detalle pensado con dedicación para acompañar tus momentos especiales.",
    imagePath: "/members/yoongi.png",
    palette: {
      pastel: {
        primary: "#C4B5FD", // Lila suave
        secondary: "#EDE9FE",
        accent: "#7C3AED",
        text: "#4C1D95",
        badge: "bg-purple-100 text-purple-700 border-purple-200",
      },
      arirang: {
        primary: "#DC2626", // Rojo fuego
        secondary: "#18181B",
        accent: "#EF4444",
        text: "#FFFFFF",
        badge: "bg-red-950/80 text-red-300 border-red-700/50",
      },
    },
  },
  {
    id: 2,
    number: 2,
    name: "Taehyung",
    stageName: "V",
    realName: "Kim Taehyung",
    koreanName: "김태형",
    role: "Vocalista, Visual y Alma Artística",
    quote: "Borahae (I Purple You): confiaré en ti y te amaré por mucho tiempo.",
    birthdayWish: "Que la vida te sorprenda con tanta belleza, ternura y momentos mágicos como los que vos le regalás a quienes te rodean. ¡Te amo y te celebro!",
    giftHint: "Un regalo lleno de estilo, calidez y cariño para sonreír cada día.",
    imagePath: "/members/tae.png",
    palette: {
      pastel: {
        primary: "#FBCFE8", // Rosa rubor
        secondary: "#FDF2F8",
        accent: "#DB2777",
        text: "#831843",
        badge: "bg-pink-100 text-pink-700 border-pink-200",
      },
      arirang: {
        primary: "#B91C1C",
        secondary: "#18181B",
        accent: "#F87171",
        text: "#FFFFFF",
        badge: "bg-red-900/60 text-red-200 border-red-600/40",
      },
    },
  },
  {
    id: 3,
    number: 3,
    name: "Jimin",
    stageName: "Jimin",
    realName: "Park Jimin",
    koreanName: "박지민",
    role: "Vocalista Principal y Bailarín Ángel",
    quote: "Recuerda que nunca estás sola: prometé que siempre serás tu mayor luz.",
    birthdayWish: "Sos luz, dulzura y alegría inmensa. Que este día esté lleno de abrazos, sonrisas y el amor que tanto te merecés.",
    giftHint: "Una sorpresa delicada para cuidarte y mimarte como una reina.",
    imagePath: "/members/jimin.png",
    palette: {
      pastel: {
        primary: "#FEF08A", // Amarillo pastel cálido
        secondary: "#FEFCE8",
        accent: "#CA8A04",
        text: "#713F12",
        badge: "bg-amber-100 text-amber-800 border-amber-200",
      },
      arirang: {
        primary: "#E11D48",
        secondary: "#18181B",
        accent: "#FB7185",
        text: "#FFFFFF",
        badge: "bg-rose-950/80 text-rose-300 border-rose-700/50",
      },
    },
  },
  {
    id: 4,
    number: 4,
    name: "Namjoon",
    stageName: "RM",
    realName: "Kim Namjoon",
    koreanName: "김남준",
    role: "Líder, Filósofo y Letrista",
    quote: "Si pudimos ayudarte a aliviar tu dolor o hacerte sonreír un poco, ya valió la pena.",
    birthdayWish: "Admiro tu fuerza, tu inteligencia y tu sensibilidad única. Que este nuevo año te traiga paz, proyectos cumplidos y momentos inolvidables.",
    giftHint: "Un detalle con significado especial para atesorar siempre.",
    imagePath: "/members/namjoon.png",
    palette: {
      pastel: {
        primary: "#BAE6FD", // Celeste cielo
        secondary: "#F0F9FF",
        accent: "#0284C7",
        text: "#075985",
        badge: "bg-sky-100 text-sky-700 border-sky-200",
      },
      arirang: {
        primary: "#991B1B",
        secondary: "#18181B",
        accent: "#EF4444",
        text: "#FFFFFF",
        badge: "bg-red-950 text-red-400 border-red-800",
      },
    },
  },
  {
    id: 5,
    number: 5,
    name: "Jin",
    stageName: "Jin",
    realName: "Kim Seokjin",
    koreanName: "김석진",
    role: "Vocalista, Worldwide Handsome y Alegría",
    quote: "Tu sola presencia puede hacer feliz a los demás. Nunca lo olvides.",
    birthdayWish: "¡Felicidades a la más hermosa del mundo! Que nunca te falte la risa contagiosa, la comida rica y motivos para celebrar la vida.",
    giftHint: "Un regalo divertido y brillante para hacerte brillar aún más.",
    imagePath: "/members/jin.png",
    palette: {
      pastel: {
        primary: "#FDE68A", // Melocotón / dorado suave
        secondary: "#FFFBEB",
        accent: "#D97706",
        text: "#92400E",
        badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      arirang: {
        primary: "#DC2626",
        secondary: "#18181B",
        accent: "#FCA5A5",
        text: "#FFFFFF",
        badge: "bg-red-900/70 text-red-200 border-red-700",
      },
    },
  },
  {
    id: 6,
    number: 6,
    name: "Hobi",
    stageName: "j-hope",
    realName: "Jung Hoseok",
    koreanName: "정호석",
    role: "Bailarín Principal, Rapero y Esperanza",
    quote: "I'm your hope, you're my hope, I'm J-Hope!",
    birthdayWish: "Que la energía brillante y radiante de Hobi te acompañe todos los días. Sos una persona llena de luz y esperanza para todos los que te queremos.",
    giftHint: "Una sorpresa vibrante para contagiar buena onda y diversión.",
    imagePath: "/members/hobi.png",
    palette: {
      pastel: {
        primary: "#BBF7D0", // Menta pastel
        secondary: "#F0FDF4",
        accent: "#16A34A",
        text: "#14532D",
        badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
      },
      arirang: {
        primary: "#EF4444",
        secondary: "#18181B",
        accent: "#F87171",
        text: "#FFFFFF",
        badge: "bg-red-950/90 text-red-300 border-red-700/60",
      },
    },
  },
  {
    id: 7,
    number: 7,
    name: "Jungkook",
    stageName: "Jung Kook",
    realName: "Jeon Jungkook",
    koreanName: "전정국",
    role: "Vocalista Principal, Golden Maknae y Pasión",
    quote: "Viví con pasión y nunca te rindas. Lo mejor de la historia recién comienza.",
    birthdayWish: "El broche de oro para el regalo número 7: ¡sos increíble, talentosa y capaz de todo lo que te propongas! Que este año sea inolvidable.",
    giftHint: "El regalo final de la colección, elegido con el mayor de los cariños.",
    imagePath: "/members/jungkook.png",
    palette: {
      pastel: {
        primary: "#DDD6FE", // Lavanda Borahae
        secondary: "#F5F3FF",
        accent: "#8B5CF6",
        text: "#5B21B6",
        badge: "bg-violet-100 text-violet-700 border-violet-200",
      },
      arirang: {
        primary: "#B91C1C",
        secondary: "#09090B",
        accent: "#EF4444",
        text: "#FFFFFF",
        badge: "bg-neutral-900 text-red-400 border-red-800",
      },
    },
  },
];
