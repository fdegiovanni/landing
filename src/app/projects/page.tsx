import { getAllProjects } from "@/lib/projects"
import { ProjectCard } from "@/components/project-card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Proyectos | Federico Degiovanni",
  description: "Explora mis proyectos de desarrollo web, cursos y herramientas educativas.",
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="container mx-auto px-4 py-12 max-w-8xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Mis Proyectos</h1>
      <p className="text-xl text-muted-foreground mb-12 text-center">
        Una colección de mis proyectos, cursos y herramientas educativas.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
