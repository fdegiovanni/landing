"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Twitter, Instagram } from "lucide-react"

export default function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="block">Hola, soy</span>
            <span className="block text-primary">Federico Degiovanni</span>
          </h1>
          <p className="text-xl text-muted-foreground">Sr Software Engineer apasionado por crear experiencias web excepcionales con React, Next.js y las últimas tecnologías frontend.</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/projects">
                Ver proyectos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/terminal">Explorar Terminal</Link>
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
              src="/assets/images/fede-working.png"
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
