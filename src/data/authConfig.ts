export interface UserProfile {
  id: "valentina" | "admin";
  name: string;
  roleTitle: string;
  avatarIcon: string;
  defaultPasswordHint: string;
}

export const USER_PROFILES: UserProfile[] = [
  {
    id: "valentina",
    name: "Valentina",
    roleTitle: "La cumpleañera estrella ✨",
    avatarIcon: "🎂",
    defaultPasswordHint: "Solo números sin espacios (ej: DDMMAAAA)",
  },
  {
    id: "admin",
    name: "Administrador",
    roleTitle: "Control & Gestión de regalos 🎁",
    avatarIcon: "🛠️",
    defaultPasswordHint: "Clave maestra de administrador",
  },
];

export const AUTH_CREDENTIALS = {
  valentina: {
    password: "14102026",
    allowedRoles: ["valentina"],
  },
  admin: {
    password: "admin",
    allowedRoles: ["admin"],
  },
};
