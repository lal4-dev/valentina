"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, USER_PROFILES, AUTH_CREDENTIALS } from "@/data/authConfig";

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  login: (profileId: "valentina" | "admin", passwordInput: string) => { success: boolean; error?: string };
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    setIsHydrated(true);
    const savedUser = localStorage.getItem("bts_valentina_auth_user");
    if (savedUser) {
      const profile = USER_PROFILES.find((p) => p.id === savedUser);
      if (profile) {
        setCurrentUser(profile);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = (profileId: "valentina" | "admin", passwordInput: string) => {
    const cleanPassword = passwordInput.trim();
    const creds = AUTH_CREDENTIALS[profileId];

    if (!creds) {
      return { success: false, error: "Perfil no encontrado." };
    }

    if (cleanPassword === creds.password) {
      const profile = USER_PROFILES.find((p) => p.id === profileId) || null;
      setCurrentUser(profile);
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("bts_valentina_auth_user", profileId);
      }
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
    setCurrentUser(null);
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("bts_valentina_auth_user");
    }
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
      {isHydrated ? children : null}
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
