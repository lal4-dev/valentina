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
    quote: "In the end, we will always win. Que la música siempre acompañe tus días de paz.",
    birthdayWish: "Mi amor hermosa, sé cuánto disfrutás de tus momentos y de lo que te gusta hacer. Quiero verte siempre tranquila, feliz y disfrutando cada cosa que armamos juntos.",
    giftHint: "para que no pelies mas con lio y puedas disfruta tu regalo del año pasado",
    imagePath: "/members/yoongi.png",
    palette: {
      pastel: {
        primary: "#C4B5FD",
        secondary: "#EDE9FE",
        accent: "#7C3AED",
        text: "#4C1D95",
        badge: "bg-purple-100 text-purple-700 border-purple-200",
      },
      arirang: {
        primary: "#DC2626",
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
    quote: "Borahae: confiaré en ti y te amaré por siempre.",
    birthdayWish: "Valen de mi vida, sin importar dónde estemos o la distancia, siempre estamos cerquita del corazón. Te amo con locura y quiero que siempre sientas mi compañía estés donde estés.",
    giftHint: "para que siempre este conectada lejos",
    imagePath: "/members/tae.png",
    palette: {
      pastel: {
        primary: "#FBCFE8",
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
    quote: "Prometeme que siempre vas a recordar lo valiosa que sos y lo mucho que iluminás todo.",
    birthdayWish: "Sos lo más tierno y lindo que me pasó, mi cielo. No quiero verte triste nunca más; quiero que cada lágrima se transforme en una sonrisa y en un abrazo nuestro que te guarde siempre.",
    giftHint: "para que no llores mas cuando lo recuerdes",
    imagePath: "/members/jimin.png",
    palette: {
      pastel: {
        primary: "#FEF08A",
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
    quote: "El amor verdadero no se trata solo de palabras, sino de elegirnos todos los días con el corazón.",
    birthdayWish: "Mi compañera hermosa, este es el inicio de todo lo que preparé para vos. Cada palabra, cada detalle y cada regalo nacieron de lo más profundo de mi corazón para decirte lo importante que sos para mí.",
    giftHint: "un poco de texto que salio de mi corazon para vos",
    imagePath: "/members/namjoon.png",
    palette: {
      pastel: {
        primary: "#BAE6FD",
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
    quote: "La vida es más linda cuando nos reímos juntos y no nos tomamos todo tan en serio.",
    birthdayWish: "¡Mi reina hermosa! Te amo cuando te reís a carcajadas. Quiero que te diviertas, que nos riamos un montón y que dejes de renegar tanto porque te merecés pura alegría.",
    giftHint: "para que juegues mas y no renegues tatno",
    imagePath: "/members/jin.png",
    palette: {
      pastel: {
        primary: "#FDE68A",
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
    quote: "Tu luz y tu energía hacen que cualquier día valga la pena.",
    birthdayWish: "Mi solcito, quiero que nuestro amor y todo lo que construimos nos dure toda la vida. Me encanta ver cómo cuidás cada una de tus cosas y tus recuerdos, y acá llega algo especial para sumarse a la familia.",
    giftHint: "para que te duren toda nuestra vida y le haga compañia al resto ya estan muy solitas",
    imagePath: "/members/hobi.png",
    palette: {
      pastel: {
        primary: "#BBF7D0",
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
    quote: "Disfrutá la vida al máximo y brindemos por todo lo lindo que se viene.",
    birthdayWish: "¡El regalo 7 para mi persona favorita en el universo entero! Para disfrutar juntos, celebrar tu vida y brindar por este cumple y por todos los que nos quedan por delante. ¡Te amo muchísimo!",
    giftHint: "algo que te gusta mucho y para que tomes jijii",
    imagePath: "/members/jungkook.png",
    palette: {
      pastel: {
        primary: "#DDD6FE",
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
