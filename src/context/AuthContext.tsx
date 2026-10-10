"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import { UserProfile, USER_PROFILES, AUTH_CREDENTIALS } from "@/data/authConfig";

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  login: (profileId: "valentina" | "admin", passwordInput: string) => { success: boolean; error?: string };
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_AUTH = "bts_valentina_auth_user";

function subscribeAuth(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getAuthSnapshot(): string {
  return localStorage.getItem(STORAGE_KEY_AUTH) || "";
}

function getAuthServerSnapshot(): string {
  return "";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authUserKey = useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    getAuthServerSnapshot
  );

  const currentUser = USER_PROFILES.find((p) => p.id === authUserKey) || null;
  const isAuthenticated = Boolean(currentUser);

  const login = (profileId: "valentina" | "admin", passwordInput: string) => {
    const cleanPassword = passwordInput.trim();
    const creds = AUTH_CREDENTIALS[profileId];

    if (!creds) {
      return { success: false, error: "Perfil no encontrado." };
    }

    if (cleanPassword === creds.password) {
      localStorage.setItem(STORAGE_KEY_AUTH, profileId);
      window.dispatchEvent(new Event("storage"));
      return { success: true };
    } else {
      return {
        success: false,
        error:
          profileId === "valentina"
            ? "Contraseña incorrecta. Pista: ingresá tu fecha de cumpleaños sin espacios (ej: DDMMAAAA)."
            : "Clave de administrador incorrecta.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY_AUTH);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
        isAdmin: currentUser?.id === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
