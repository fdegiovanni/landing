import Link from "next/link"
import { ArrowRight, Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BlogPage() {
  const categories = ["Todos", "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js"]

  const posts = [
    {
      title: "Entendiendo los Hooks de React",
      excerpt: "Una guía completa sobre cómo funcionan los hooks y cómo utilizarlos efectivamente en tus proyectos.",
      date: "10 Abril, 2023",
      category: "React",
      slug: "/blog/entendiendo-hooks-react",
    },
    {
      title: "CSS Grid vs Flexbox",
      excerpt: "Comparación detallada entre CSS Grid y Flexbox, cuándo usar cada uno y ejemplos prácticos.",
      date: "25 Marzo, 2023",
      category: "CSS",
      slug: "/blog/css-grid-vs-flexbox",
    },
    {
      title: "Optimización de rendimiento en Next.js",
      excerpt: "Técnicas avanzadas para mejorar el rendimiento de tus aplicaciones Next.js.",
      date: "15 Febrero, 2023",
      category: "Next.js",
      slug: "/blog/optimizacion-rendimiento-nextjs",
    },
    {
      title: "Introducción a TypeScript para desarrolladores JavaScript",
      excerpt: "Aprende los conceptos básicos de TypeScript y cómo puede mejorar tu flujo de trabajo en JavaScript.",
      date: "5 Febrero, 2023",
      category: "TypeScript",
      slug: "/blog/introduccion-typescript",
    },
    {
      title: "Accesibilidad web: mejores prácticas",
      excerpt: "Guía completa sobre cómo hacer tus sitios web más accesibles para todos los usuarios.",
      date: "20 Enero, 2023",
      category: "HTML",
      slug: "/blog/accesibilidad-web",
    },
    {
      title: "Introducción a las API de JavaScript moderno",
      excerpt: "Explora las API más útiles del navegador para crear aplicaciones web modernas.",
      date: "10 Enero, 2023",
      category: "JavaScript",
      slug: "/blog/apis-javascript-moderno",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="text-xl text-muted-foreground">Artículos sobre desarrollo frontend y buenas prácticas</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar artículos..." className="pl-10" />
          </div>
          <Select defaultValue="Todos">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardContent className="p-6 flex-grow">
                <Badge className="mb-3">{post.category}</Badge>
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={post.slug} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {post.date}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="ghost" className="p-0 h-auto">
                  <Link href={post.slug} className="flex items-center text-primary">
                    Leer artículo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
