import Link from "next/link"
import { Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function TerminalPreview() {
  return (
    <section id="terminal" className="py-16">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Terminal</h2>
          <p className="text-muted-foreground">Explora mi sitio en modo CLI</p>
        </div>

        <Card className="overflow-hidden border-2 border-primary/20">
          <div className="bg-black text-green-500 font-mono p-1 flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs">terminal</div>
          </div>
          <CardContent className="p-0">
            <div className="bg-black text-green-500 font-mono p-4 h-64 overflow-hidden">
              <div className="animate-pulse">_</div>
              <p className="mt-2">$ help</p>
              <p className="mt-1">Comandos disponibles:</p>
              <p className="mt-1">- about: Información sobre mí</p>
              <p>- projects: Ver mis proyectos</p>
              <p>- blog: Leer mis artículos</p>
              <p>- contact: Información de contacto</p>
              <p>- clear: Limpiar la terminal</p>
              <p className="mt-2">$ about</p>
              <p className="mt-1">Cargando información personal...</p>
              <p className="mt-2">Soy un desarrollador frontend apasionado por crear experiencias web excepcionales.</p>
              <p className="mt-2">$ _</p>
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-muted">
            <Button asChild className="w-full">
              <Link href="/terminal">
                <Terminal className="mr-2 h-4 w-4" />
                Abrir Terminal
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
