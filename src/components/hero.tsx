"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Hero() {
  const pathname = usePathname()

  // Extraer el locale de la URL
  const pathParts = pathname?.split("/") || []
  const locales = ["es", "en", "pt"]
  const locale = locales.includes(pathParts[1]) ? pathParts[1] : "es"

  // Textos según el idioma
  const texts = {
    es: {
      greeting: "Hola, soy",
      description:
        "Sr Software Engineer y docente, apasionado por crear experiencias web excepcionales con React, Next.js y las últimas tecnologías frontend.",
      buttonProjects: "Ver proyectos",
      buttonTerminal: "Explorar Terminal",
    },
    en: {
      greeting: "Hi, I'm",
      description:
        "Sr Software Engineer and teacher, passionate about creating exceptional web experiences with React, Next.js and the latest frontend technologies.",
      buttonProjects: "View projects",
      buttonTerminal: "Explore Terminal",
    },
    pt: {
      greeting: "Olá, eu sou",
      description:
        "Sr Software Engineer e professor, apaixonado por criar experiências web excepcionais com React, Next.js e as mais recentes tecnologias frontend.",
      buttonProjects: "Ver projetos",
      buttonTerminal: "Explorar Terminal",
    },
  }

  const t = texts[locale as keyof typeof texts] || texts.es

  return (
    <section className="py-20 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="block">{t.greeting}</span>
            <span className="block text-primary">Federico Degiovanni</span>
          </h1>
          <p className="text-xl text-muted-foreground">{t.description}</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href={locale === "es" ? "/projects" : `/${locale}/projects`}>
                {t.buttonProjects} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={locale === "es" ? "/terminal" : `/${locale}/terminal`}>{t.buttonTerminal}</Link>
            </Button>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <Link href="https://github.com/fdegiovanni" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://x.com/fdegiovanni1" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/fdegiovanni/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="https://www.instagram.com/fddgvnn/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src="https://sjc.microlink.io/q97S5NNd3SaxJePmXSv0SmwvOT6NpgZ0zCbmxZKUrwiFwGfwTnTmK6OU8naYyqlzpjUqBtznXCTfjDX958Sw9g.jpeg"
              alt="Federico Degiovanni"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
