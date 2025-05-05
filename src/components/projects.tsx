import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Projects() {
  const projects = [
    {
      title: "E-commerce Dashboard",
      description: "Panel de administración para tiendas online con análisis de datos y gestión de inventario.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Next.js", "Tailwind CSS", "Supabase"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Blog Platform",
      description: "Plataforma de blog con soporte para Markdown, categorías y sistema de comentarios.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["TypeScript", "Next.js", "MDX", "Prisma"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Weather App",
      description: "Aplicación del clima con pronóstico de 7 días, geolocalización y modo oscuro.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "API REST", "CSS Modules", "Vite"],
      demoUrl: "#",
      repoUrl: "#",
    },
  ]

  return (
    <section id="projects" className="py-16">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Proyectos</h2>
          <p className="text-muted-foreground">Una selección de mis trabajos recientes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-48 w-full">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
              <CardContent className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between">
                <Button asChild variant="outline" size="sm">
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Código
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/projects">Ver todos los proyectos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
