import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/projects"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex gap-2">
          {project.links.github && (
            <Button variant="outline" size="icon" asChild>
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.links.demo && (
            <Button variant="outline" size="icon" asChild>
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" aria-label="Demo">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.links.docs && (
            <Button variant="outline" size="icon" asChild>
              <a href={project.links.docs} target="_blank" rel="noopener noreferrer" aria-label="Documentación">
                <BookOpen className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
        <Button variant="default" asChild>
          <Link href={`/projects/${project.id}`}>Ver detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
