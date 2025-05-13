import { getProjectById, getAllProjects } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, BookOpen, ArrowLeft, GraduationCap, Rss } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
    const { id } = await params
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
      description: "El proyecto que estás buscando no existe.",
    };
  }

  return {
    title: `${project.title} | Federico Degiovanni`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();

  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Link
        href="/projects"
        className="inline-flex items-center text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a proyectos
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">{project.title}</h1>
        <span className="text-muted-foreground text-lg">
          Creado en <b>{project?.year || "algún día del pasado"}</b>
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      {project.imageUrl && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <img
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.imageAlt}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {project.image && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.imageAlt}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none mb-8 dark:prose-invert">
        {project.longDescription?.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
        {(project.longDescription?.length ?? 0) === 0 && (
          <p className="mb-4">{project.description}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        {project.links.github && (
          <Button asChild>
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              Ver en GitHub
            </a>
          </Button>
        )}

        {project.links.demo && (
          <Button variant="outline" asChild>
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver Demo
            </a>
          </Button>
        )}

        {project.links.docs && (
          <Button variant="outline" asChild>
            <a
              href={project.links.docs}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Ver Documentación
            </a>
          </Button>
        )}

        {project.links.course && (
          <Button variant="outline" asChild>
            <a
              href={project.links.course}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              Ver Curso
            </a>
          </Button>
        )}

        {project.links.post && (
          <Button variant="outline" asChild>
            <a
              href={project.links.post}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Rss className="mr-2 h-4 w-4" />
              Ver Post
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
