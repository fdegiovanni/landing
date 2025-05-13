import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ProjectNotFound() {
  return (
    <div className="container mx-auto px-4 max-w-6xl container flex flex-col items-center justify-center py-24  text-center">
      <h1 className="text-4xl font-bold mb-4">Proyecto no encontrado</h1>
      <Image
        src="/assets/images/not-found.png"
        alt="Proyecto no encontrado"
        width={300}
        height={300}
        className="mb-4"
      />
      <p className="text-muted-foreground mb-8">
        Lo siento, el proyecto que estás buscando no existe o ha sido movido.
      </p>
      <Button asChild>
        <Link href="/projects">Ver todos los proyectos</Link>
      </Button>
    </div>
  )
}
