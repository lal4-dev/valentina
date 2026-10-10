import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { LotteryProvider } from "@/context/LotteryContext";
import { ThemeToggleFAB } from "@/components/ThemeToggleFAB";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
