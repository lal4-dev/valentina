// ============================================================================
// ARCHIVO: src/app/layout.tsx
// DESCRIPCIÓN: Diseño raíz (RootLayout) de la aplicación.
//              Configura fuentes Google (Outfit y Plus Jakarta Sans), metadatos,
//              y los proveedores de contexto globales (Tema, Autenticación y Ruleta).
// ============================================================================

// ============================================================================
// SECCIÓN 1: IMPORTACIONES Y DEPENDENCIAS
// Tipos de Next.js, fuentes tipográficas, estilos globales y proveedores.
// ============================================================================

import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ProveedorTema } from "@/context/ContextoTema";
import { ProveedorAutenticacion } from "@/context/ContextoAutenticacion";
import { ProveedorRuleta } from "@/context/ContextoRuleta";

// ============================================================================
// SECCIÓN 2: CONFIGURACIÓN DE TIPOGRAFÍAS
// Outfit para títulos y números; Plus Jakarta Sans para textos de lectura.
// ============================================================================

const fuenteOutfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const fuentePlusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// ============================================================================
// SECCIÓN 3: METADATOS DE LA APLICACIÓN
// Título de la pestaña, descripción para SEO e ícono conmemorativo.
// ============================================================================

export const metadata: Metadata = {
  title: "¡Feliz Cumpleaños BB!",
  description: "Un regalito especial hecho con mucho amor para vos.",
  icons: {
    icon: "/icon.svg",
  },
};

// ============================================================================
// SECCIÓN 4: COMPONENTE ROOT LAYOUT
// Envuelve la aplicación con la estructura HTML5 y los 3 proveedores esenciales.
// ============================================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fuenteOutfit.variable} ${fuentePlusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Proveedor de tema: maneja modo Pastel o Arirang */}
        <ProveedorTema>
          {/* Proveedor de autenticación: sesión de Valentina o Admin */}
          <ProveedorAutenticacion>
            {/* Proveedor de ruleta: estado de los 7 regalos sorteados */}
            <ProveedorRuleta>
              {children}
            </ProveedorRuleta>
          </ProveedorAutenticacion>
        </ProveedorTema>
      </body>
    </html>
  );
}
