// ============================================================================
// ARCHIVO: src/data/configuracionAutenticacion.ts
// DESCRIPCIÓN: Perfiles de usuario (Valentina y Administrador), credenciales
//              y fecha objetivo del cumpleaños (14/10/2026 00:00 hs Argentina).
// ============================================================================

// ============================================================================
// SECCIÓN 1: TIPOS E INTERFACES
// Estructura de perfiles de usuario y roles de acceso.
// ============================================================================

export type IdentificadorUsuario = "valentina" | "admin";

/**
 * Representa el perfil de usuario para Valentina o el Administrador.
 */
export interface PerfilUsuario {
  id: IdentificadorUsuario;
  nombre: string;
  tituloRol: string;
  iconoAvatar: string;
  pistaClavePorDefecto: string;
  // Campos en inglés para compatibilidad
  name?: string;
  roleTitle?: string;
  avatarIcon?: string;
  defaultPasswordHint?: string;
}

// ============================================================================
// SECCIÓN 2: PERFILES DE USUARIO DEFINIDOS
// Valentina (cumpleañera) y Administrador (panel de control y pruebas).
// ============================================================================

export const PERFILES_USUARIO: PerfilUsuario[] = [
  {
    id: "valentina",
    nombre: "Valentina",
    tituloRol: "La cumpleañera estrella ✨",
    iconoAvatar: "🎂",
    pistaClavePorDefecto: "Solo números sin espacios (ej: DDMMAAAA)",
    name: "Valentina",
    roleTitle: "La cumpleañera estrella ✨",
    avatarIcon: "🎂",
    defaultPasswordHint: "Solo números sin espacios (ej: DDMMAAAA)",
  },
  {
    id: "admin",
    nombre: "Administrador",
    tituloRol: "Control & Gestión de regalos 🎁",
    iconoAvatar: "🛠️",
    pistaClavePorDefecto: "Clave maestra de administrador",
    name: "Administrador",
    roleTitle: "Control & Gestión de regalos 🎁",
    avatarIcon: "🛠️",
    defaultPasswordHint: "Clave maestra de administrador",
  },
];

// ============================================================================
// SECCIÓN 3: CREDENCIALES DE ACCESO
// Contraseñas requeridas para el inicio de sesión.
// ============================================================================

export const CREDENCIALES_ACCESO = {
  valentina: {
    clave: "14102026",
    password: "14102026",
    rolesPermitidos: ["valentina"],
    allowedRoles: ["valentina"],
  },
  admin: {
    clave: "admin290344",
    password: "admin290344",
    rolesPermitidos: ["admin"],
    allowedRoles: ["admin"],
  },
};

// ============================================================================
// SECCIÓN 4: FECHA Y HORA OBJETIVO DEL CUMPLEAÑOS
// Fecha y hora exacta de cumpleaños en Argentina (UTC-3):
// 14 de Octubre de 2026 a las 00:00:00 hs.
// ============================================================================

export const FECHA_OBJETIVO_CUMPLEANIOS_ISO = "2026-10-14T00:00:00-03:00";
export const TIMESTAMP_CUMPLEANIOS_VALENTINA = 1791946800000; // new Date("2026-10-14T00:00:00-03:00").getTime()

// ============================================================================
// SECCIÓN 5: EXPORTACIONES DE COMPATIBILIDAD
// Exportaciones con nombres anteriores en inglés para compatibilidad.
// ============================================================================
export type UserProfile = PerfilUsuario;
export const USER_PROFILES = PERFILES_USUARIO;
export const AUTH_CREDENTIALS = CREDENCIALES_ACCESO;
export const VALENTINA_BIRTHDAY_TARGET_ISO = FECHA_OBJETIVO_CUMPLEANIOS_ISO;
export const VALENTINA_BIRTHDAY_TIMESTAMP = TIMESTAMP_CUMPLEANIOS_VALENTINA;
