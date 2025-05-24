import type React from "react"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

type Props = {
  children: React.ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// generar metadata
export function generateMetadata() {
  return {
    title: 'fdegiovanni',
    description: 'Bienvenido a mi sitio web',
  };
}

// Importamos el nuevo componente cliente
import ClientLayoutContent from "@/components/ClientLayoutContent"

export default function RootLayout({
  children,
}: Props) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ClientLayoutContent>{children}</ClientLayoutContent>
      </body>
    </html>
  );
}