"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()


  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="font-bold text-xl">
              <span className="text-primary">&lt;</span>
              <span>Federico Degiovanni</span>
              <span className="text-primary">/&gt;</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} fdegiovanni
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <nav className="flex space-x-6">
              <Link
                href= "/about"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Sobre mí
              </Link>
              <Link
                href="/projects"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Proyectos
              </Link>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Contacto
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
