"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { useTranslations, useLocale } from "next-intl"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {useRouter} from '@/i18n/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations("nav")

 /*  const locales = [
    {
      code: "en",
      name: "english",
      flag: "🇬🇧",
    },
    {
      code: "es",
      name: "spanish",
      flag: "🇪🇸",
    },
    {
      code: "pt",
      name: "portuguese",
      flag: "🇧🇷",
    }
  ] */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname || "/", { locale: newLocale })
  }

  const getLanguageName = (locale: { code: string; name: string; flag: string }) => {
    let translatedName = t(locale.name);
    
    return `${locale.flag} ${translatedName}`;
  }

  // Definir enlaces del navegador usando las traducciones
  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/projects", label: t("projects") },
    { href: "/blog", label: t("blog") },
    { href: "/terminal", label: t("terminal") },
    { href: "/contact", label: t("contact") },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            <span className="text-primary">&lt;</span>
            <span>FD</span>
            <span className="text-primary">/&gt;</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Change language">
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                {/* <DropdownMenuContent align="end">
                  {locales.map((l) => (
                    <DropdownMenuItem
                      key={l.code}
                      onClick={() => handleLocaleChange(l.code)}
                      className={l.code === locale ? "bg-muted" : ""}
                    >
                      {getLanguageName(l)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent> */}
              </DropdownMenu>
              <ModeToggle />
            </div>
          </nav>

          <div className="flex md:hidden items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Change language">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
{/*               <DropdownMenuContent align="end">
                {locales?.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => handleLocaleChange(l.code)}
                    className={l.code === locale ? "bg-muted" : ""}
                  >
                    {getLanguageName(l)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent> */}
            </DropdownMenu>
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="font-bold text-xl">
                <span className="text-primary">&lt;</span>
                <span>FD</span>
                <span className="text-primary">/&gt;</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="flex flex-col space-y-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
