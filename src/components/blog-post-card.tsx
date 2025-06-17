import Link from "next/link"
import { Calendar, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { HashnodePost } from "@/types/blog"

interface BlogPostCardProps {
  post: HashnodePost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="group h-full bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge
              key={tag.slug}
              variant="secondary"
              className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs"
            >
              {tag.name}
            </Badge>
          ))}
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-400 mb-4 flex-grow line-clamp-3 text-sm leading-relaxed">{post.brief}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTimeInMinutes} min</span>
            </div>
          </div>
        </div>

        <Link
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium group/link"
          aria-label={`Leer artículo: ${post.title}`}
        >
          Leer artículo
          <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </CardContent>
    </Card>
  )
}
