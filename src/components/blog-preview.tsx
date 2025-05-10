import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Post {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
}

export default function BlogPreview({ posts }: { posts: Post[] }) {
  /* const posts = [
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
  ] */

  if (!posts || posts.length === 0) {
    return (null)
  }

  return (
    <section id="blog" className="py-16">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Blog</h2>
          <p className="text-muted-foreground">Artículos sobre desarrollo frontend y buenas prácticas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardContent className="p-6 flex-grow">
                <Badge className="mb-3">{post.category}</Badge>
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={post.slug} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
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

        <div className="flex justify-center">
          <Button asChild>
            <Link href="/blog">Ver todos los artículos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
