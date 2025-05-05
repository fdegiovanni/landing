import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Git",
    "PHP",
    "Responsive Design",
    "Accesibilidad",
    "Performance",
    "Testing",
  ]

  return (
    <section id="about" className="py-16">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Sobre mí</h2>
          <p className="text-muted-foreground">Un vistazo a mi experiencia y habilidades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Mi historia</h3>
              <p>
                Soy un Sr Software Engineer y docente apasionado por la tecnología. Actualmente estoy enfocado en
                obtener mi título en Ingeniería en Sistemas en la Universidad Tecnológica Nacional.
              </p>
              <p>
                Comencé mi carrera como desarrollador full stack, trabajando en backend, APIs, frontend web y
                aplicaciones móviles. Incluso me aventuré en el mundo de la realidad aumentada.
              </p>
              <p>
                Actualmente me especializo en desarrollo frontend con React y JavaScript. También enseño en la carrera
                de Licenciatura en Producción de Videojuegos, donde junto a mis estudiantes creamos prototipos de juegos
                2D en HTML5.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
