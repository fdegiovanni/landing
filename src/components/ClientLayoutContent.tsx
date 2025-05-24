"use client"

import React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { usePathname } from 'next/navigation'
import Header from "@/components/header"
import Footer from "@/components/footer"

type Props = {
  children: React.ReactNode;
};

export default function ClientLayoutContent({ children }: Props) {
  const pathname = usePathname();
  const isLinksPage = pathname.startsWith('/links');

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen flex-col">
        {!isLinksPage && <Header />}
        <main className="flex-1">{children}</main>
        {!isLinksPage && <Footer />}
      </div>
    </ThemeProvider>
  );
}