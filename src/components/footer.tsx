"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()

  // Extraer el locale de la URL
  const pathParts = pathname?.split("/") || []
  const locales = ["es", "en", "pt"]
  const locale = locales.includes(pathParts[1]) ? pathParts[1] : "es"

  // Textos según el idioma
  const texts = {
    es: {
      about: "Sobre mí",
      projects: "Proyectos",
      blog: "Blog",
      contact: "Contacto",
      rights: "Todos los derechos reservados.",
    },
    en: {
      about: "About",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      rights: "All rights reserved.",
    },
    pt: {
      about: "Sobre",
      projects: "Projetos",
      blog: "Blog",
      contact: "Contato",
      rights: "Todos os direitos reservados.",
    },
  }

  const t = texts[locale as keyof typeof texts] || texts.es

  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href={locale === "es" ? "/" : `/${locale}`} className="font-bold text-xl">
              <span className="text-primary">&lt;</span>
              <span>Federico Degiovanni</span>
              <span className="text-primary">/&gt;</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Federico Degiovanni. {t.rights}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <nav className="flex space-x-6">
              <Link
                href={locale === "es" ? "/about" : `/${locale}/about`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {t.about}
              </Link>
              <Link
                href={locale === "es" ? "/projects" : `/${locale}/projects`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {t.projects}
              </Link>
              <Link
                href={locale === "es" ? "/blog" : `/${locale}/blog`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {t.blog}
              </Link>
              <Link
                href={locale === "es" ? "/contact" : `/${locale}/contact`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {t.contact}
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="https://github.com/fdegiovanni" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://x.com/fdegiovanni1" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://www.linkedin.com/in/fdegiovanni/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://www.instagram.com/fddgvnn/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
