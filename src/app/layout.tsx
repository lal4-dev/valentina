import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { LotteryProvider } from "@/context/LotteryContext";
import { ThemeToggleFAB } from "@/components/ThemeToggleFAB";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "¡Feliz Cumpleaños Valentina! 💜 BTS Gifts",
  description: "7 regalos especiales inspirados en los 7 integrantes de BTS para Valentina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <AuthProvider>
            <LotteryProvider>
              <ThemeToggleFAB />
              {children}
            </LotteryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
