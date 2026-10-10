// ============================================================================
// ARCHIVO: src/data/miembrosBts.ts
// DESCRIPCIÓN: Datos completos de los 7 miembros de BTS, sus frases, regalos y
//              paletas de colores dinámicas para los modos Pastel y Arirang.
// ============================================================================

// ============================================================================
// SECCIÓN 1: TIPOS E INTERFACES
// Estructuras para paletas de color y características de cada miembro de BTS.
// ============================================================================

/**
 * Estructura de estilos de color para las tarjetas e interfaces de cada miembro.
 */
export interface PaletaColorTema {
  primario: string;
  secundario: string;
  acento: string;
  texto: string;
  etiqueta: string;
}

/**
 * Representa a un integrante de BTS con su información festiva de cumpleaños.
 */
export interface MiembroBTS {
  id: number;
  numero: number;
  nombre: string;
  nombreArtistico: string;
  nombreReal: string;
  nombreCoreano: string;
  rol: string;
  frase: string;
  deseoCumpleanios: string;
  pistaRegalo: string;
  rutaImagen: string;
  variantesImagen: {
    pastel: string;
    arirang: string;
  };
  paleta: {
    pastel: PaletaColorTema;
    arirang: PaletaColorTema;
  };
}

// ============================================================================
// SECCIÓN 2: LISTADO DE MIEMBROS DE BTS (7 INTEGRANTES)
// Datos ordenados del 1 al 7 con pistas y mensajes personalizados para Valentina.
// ============================================================================

export const MIEMBROS_BTS: MiembroBTS[] = [
  {
    id: 1,
    numero: 1,
    nombre: "Yoongi",
    nombreArtistico: "SUGA / Agust D",
    nombreReal: "Min Yoongi",
    nombreCoreano: "민윤기",
    rol: "Rapero, Productor y Genio Musical",
    frase: "In the end, we will always win. Que la música siempre acompañe tus días de paz.",
    deseoCumpleanios: "Mi amor hermosa, sé cuánto disfrutás de tus momentos y de lo que te gusta hacer. Quiero verte siempre tranquila, feliz y disfrutando cada cosa que logremos juntos.",
    pistaRegalo: "Para declarar formalmente la paz mundial dentro de la casa y que nadie tenga que pelear por la señal",
    rutaImagen: "/img/pastel/1.png",
    variantesImagen: {
      pastel: "/img/pastel/1.png",
      arirang: "/img/arirang/1.png",
    },
    paleta: {
      pastel: {
        primario: "#C4B5FD",
        secundario: "#EDE9FE",
        acento: "#7C3AED",
        texto: "#4C1D95",
        etiqueta: "bg-purple-100 text-purple-700 border-purple-200",
      },
      arirang: {
        primario: "#DC2626",
        secundario: "#18181B",
        acento: "#EF4444",
        texto: "#FFFFFF",
        etiqueta: "bg-red-950/80 text-red-300 border-red-700/50",
      },
    },
  },
  {
    id: 2,
    numero: 2,
    nombre: "Taehyung",
    nombreArtistico: "V",
    nombreReal: "Kim Taehyung",
    nombreCoreano: "김태형",
    rol: "Vocalista, Visual y Alma Artística",
    frase: "Borahae: confiaré en ti y te amaré por siempre.",
    deseoCumpleanios: "Valen amor de mi vida, sin importar dónde estemos o la distancia, siempre estamos cerquita del corazón. Te amo con locura y quiero que siempre sientas mi compañía estés donde estés.",
    pistaRegalo: "Para que nunca te apagues, incluso bajo el sol esperando el momento más esperado de tu vida.",
    rutaImagen: "/img/pastel/2.png",
    variantesImagen: {
      pastel: "/img/pastel/2.png",
      arirang: "/img/arirang/2.png",
    },
    paleta: {
      pastel: {
        primario: "#FBCFE8",
        secundario: "#FDF2F8",
        acento: "#DB2777",
        texto: "#831843",
        etiqueta: "bg-pink-100 text-pink-700 border-pink-200",
      },
      arirang: {
        primario: "#B91C1C",
        secundario: "#18181B",
        acento: "#F87171",
        texto: "#FFFFFF",
        etiqueta: "bg-red-900/60 text-red-200 border-red-600/40",
      },
    },
  },
  {
    id: 3,
    numero: 3,
    nombre: "Jimin",
    nombreArtistico: "Jimin",
    nombreReal: "Park Jimin",
    nombreCoreano: "박지민",
    rol: "Vocalista Principal y Bailarín Ángel",
    frase: "Prometeme que siempre vas a recordar lo valiosa que sos y lo mucho que iluminás todo.",
    deseoCumpleanios: "Sos lo más tierno y lindo que me pasó, mi mundo. No quiero verte triste nunca más; quiero que cada lágrima se transforme en una sonrisa y en un abrazo nuestro que te guarde siempre.",
    pistaRegalo: "Secate las lágrimas… la música nunca se fue, solo estaba esperando volver a tus oídos.",
    rutaImagen: "/img/pastel/3.png",
    variantesImagen: {
      pastel: "/img/pastel/3.png",
      arirang: "/img/arirang/3.png",
    },
    paleta: {
      pastel: {
        primario: "#FEF08A",
        secundario: "#FEFCE8",
        acento: "#CA8A04",
        texto: "#713F12",
        etiqueta: "bg-amber-100 text-amber-800 border-amber-200",
      },
      arirang: {
        primario: "#E11D48",
        secundario: "#18181B",
        acento: "#FB7185",
        texto: "#FFFFFF",
        etiqueta: "bg-rose-950/80 text-rose-300 border-rose-700/50",
      },
    },
  },
  {
    id: 4,
    numero: 4,
    nombre: "Namjoon",
    nombreArtistico: "RM",
    nombreReal: "Kim Namjoon",
    nombreCoreano: "김남준",
    rol: "Líder, Filósofo y Letrista",
    frase: "El amor verdadero no se trata solo de palabras, sino de elegirnos todos los días con el corazón.",
    deseoCumpleanios: "Mi compañera hermosa, este es el inicio de todo lo que preparé para vos. Cada palabra, cada detalle y cada regalo nacieron de lo más profundo de mi corazón para decirte lo importante que sos para mí espero entiendas un poco de lo mucho que te amo.",
    pistaRegalo: "No tiene cables ni batería, pero guarda las palabras más sinceras que vas a leer hoy.",
    rutaImagen: "/img/pastel/4.png",
    variantesImagen: {
      pastel: "/img/pastel/4.png",
      arirang: "/img/arirang/4.png",
    },
    paleta: {
      pastel: {
        primario: "#BAE6FD",
        secundario: "#F0F9FF",
        acento: "#0284C7",
        texto: "#075985",
        etiqueta: "bg-sky-100 text-sky-700 border-sky-200",
      },
      arirang: {
        primario: "#991B1B",
        secundario: "#18181B",
        acento: "#EF4444",
        texto: "#FFFFFF",
        etiqueta: "bg-red-950 text-red-400 border-red-800",
      },
    },
  },
  {
    id: 5,
    numero: 5,
    nombre: "Jin",
    nombreArtistico: "Jin",
    nombreReal: "Kim Seokjin",
    nombreCoreano: "김석진",
    rol: "Vocalista, Worldwide Handsome y Alegría",
    frase: "La vida es más linda cuando nos reímos juntos y no nos tomamos todo tan en serio.",
    deseoCumpleanios: "¡Mi reina hermosa! Te amo cuando te reís a carcajadas. Quiero que te diviertas, que nos riamos un montón y que dejes de renegar tanto porque te merecés pura alegría.",
    pistaRegalo: "Tu escritorio pedía a gritos un upgrade de comodidad y espacio suave.",
    rutaImagen: "/img/pastel/5.png",
    variantesImagen: {
      pastel: "/img/pastel/5.png",
      arirang: "/img/arirang/5.png",
    },
    paleta: {
      pastel: {
        primario: "#FDE68A",
        secundario: "#FFFBEB",
        acento: "#D97706",
        texto: "#92400E",
        etiqueta: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      arirang: {
        primario: "#DC2626",
        secundario: "#18181B",
        acento: "#FCA5A5",
        texto: "#FFFFFF",
        etiqueta: "bg-red-900/70 text-red-200 border-red-700",
      },
    },
  },
  {
    id: 6,
    numero: 6,
    nombre: "Hobi",
    nombreArtistico: "j-hope",
    nombreReal: "Jung Hoseok",
    nombreCoreano: "정호석",
    rol: "Bailarín Principal, Rapero y Esperanza",
    frase: "Tu luz y tu energía hacen que cualquier día valga la pena.",
    deseoCumpleanios: "Mi solcito, quiero que nuestro amor y todo lo que construimos nos dure toda la vida. Me encanta ver cómo cuidás cada una de tus cosas y tus recuerdos, y acá llega algo especial para sumarse a la familia.",
    pistaRegalo: "Flores que nunca se marchitan, tan duraderas como lo que siento por vos.",
    rutaImagen: "/img/pastel/6.png",
    variantesImagen: {
      pastel: "/img/pastel/6.png",
      arirang: "/img/arirang/6.png",
    },
    paleta: {
      pastel: {
        primario: "#BBF7D0",
        secundario: "#F0FDF4",
        acento: "#16A34A",
        texto: "#14532D",
        etiqueta: "bg-emerald-100 text-emerald-700 border-emerald-200",
      },
      arirang: {
        primario: "#EF4444",
        secundario: "#18181B",
        acento: "#F87171",
        texto: "#FFFFFF",
        etiqueta: "bg-red-950/90 text-red-300 border-red-700/60",
      },
    },
  },
  {
    id: 7,
    numero: 7,
    nombre: "Jungkook",
    nombreArtistico: "Jung Kook",
    nombreReal: "Jeon Jungkook",
    nombreCoreano: "전정국",
    rol: "Vocalista Principal, Golden Maknae y Pasión",
    frase: "Disfrutá la vida al máximo y brindemos por todo lo lindo que se viene.",
    deseoCumpleanios: "¡El regalo 7 para mi persona favorita en el universo entero! Para disfrutar juntos, celebrar tu vida y brindar por este cumple y por todos los que nos quedan por delante. ¡Te amo muchísimo!",
    pistaRegalo: "El toque final para brindar y celebrar la vida como se debe.",
    rutaImagen: "/img/pastel/7.png",
    variantesImagen: {
      pastel: "/img/pastel/7.png",
      arirang: "/img/arirang/7.png",
    },
    paleta: {
      pastel: {
        primario: "#DDD6FE",
        secundario: "#F5F3FF",
        acento: "#8B5CF6",
        texto: "#5B21B6",
        etiqueta: "bg-violet-100 text-violet-700 border-violet-200",
      },
      arirang: {
        primario: "#B91C1C",
        secundario: "#09090B",
        acento: "#EF4444",
        texto: "#FFFFFF",
        etiqueta: "bg-neutral-900 text-red-400 border-red-800",
      },
    },
  },
];

// ============================================================================
// SECCIÓN 3: EXPORTACIONES DE COMPATIBILIDAD
// Facilita la transición gradual sin romper referencias existentes.
// ============================================================================
export type BTSMember = MiembroBTS;
export const BTS_MEMBERS = MIEMBROS_BTS;
