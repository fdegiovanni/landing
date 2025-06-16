"use client"

import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BlogPostCard } from "./blog-post-card"
import { BlogSkeleton } from "./blog-skeleton"
import { fetchHashnodePosts } from "@/lib/hashnode-api"
import type { HashnodePost, BlogSectionProps } from "@/types/blog"
import { Badge } from "@/components/ui/badge"

export function BlogSection({ publicationHost, maxPosts = 6, showPagination = true }: BlogSectionProps) {
  const [posts, setPosts] = useState<HashnodePost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<HashnodePost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [endCursor, setEndCursor] = useState("")

  const predefinedTags = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "VibeCoding", "V0", "ChatGPT", "AI", "Web Development", "Frontend", "Backend", "Fullstack", "Windsurf"]

  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const postsPerPage = 6

  useEffect(() => {
    loadPosts()
  }, [publicationHost])

  useEffect(() => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.brief.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by selected tags (flexible matching)
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.some((selectedTag) =>
          post.tags.some((postTag) => {
            const selectedLower = selectedTag.toLowerCase()
            const postTagLower = postTag.name.toLowerCase()

            return (
              postTagLower === selectedLower ||
              postTagLower.includes(selectedLower) ||
              selectedLower.includes(postTagLower) ||
              (selectedLower === "javascript" && (postTagLower === "js" || postTagLower.includes("javascript"))) ||
              (selectedLower === "typescript" && (postTagLower === "ts" || postTagLower.includes("typescript"))) ||
              (selectedLower === "next.js" && (postTagLower.includes("next") || postTagLower.includes("nextjs"))) ||
              (selectedLower === "node.js" && (postTagLower.includes("node") || postTagLower.includes("nodejs"))) ||
              (selectedLower === "react" && (postTagLower.includes("react") || postTagLower.includes("reactjs"))) ||
              (selectedLower === "html" && postTagLower.includes("html")) ||
              (selectedLower === "css" && (postTagLower.includes("css") || postTagLower.includes("scss") || postTagLower.includes("sass"))) ||
              (selectedLower === "vibecoding" && (postTagLower.includes("vibe") || postTagLower.includes("vibecoding") || postTagLower.includes("vibe coding") || postTagLower.includes("vibe-coding")))
            )
          }),
        ),
      )
    }

    setFilteredPosts(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedTags, posts])

  const loadPosts = async (cursor?: string) => {
    try {
      setLoading(true)
      const {
        posts: newPosts,
        hasNextPage: hasNext,
        endCursor: newCursor,
      } = await fetchHashnodePosts(publicationHost, maxPosts, cursor)

      if (cursor) {
        setPosts((prev) => [...prev, ...newPosts])
      } else {
        setPosts(newPosts)
      }

      setHasNextPage(hasNext)
      setEndCursor(newCursor)
      setError(null)
    } catch (err) {
      setError("Error al cargar los artículos")
      console.error("Error loading posts:", err)
    } finally {
      setLoading(false)
    }
  }

  const loadMorePosts = () => {
    if (hasNextPage && endCursor) {
      loadPosts(endCursor)
    }
  }

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearAllFilters = () => {
    setSelectedTags([])
    setSearchTerm("")
  }

  if (error) {
    return (
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Blog</h2>
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Blog</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Artículos sobre desarrollo frontend y buenas prácticas
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-800 text-white placeholder-gray-400 focus:border-blue-500"
            />
          </div>

          {/* Tag Filter Section */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {predefinedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Active Filters Display */}
            {(selectedTags.length > 0 || searchTerm) && (
              <div className="flex flex-wrap items-center gap-2 justify-center">
                <span className="text-gray-400 text-sm">Filtros activos:</span>
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-blue-500/20 text-blue-300 border-blue-500/30 flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="ml-1 hover:bg-blue-500/30 rounded-full p-0.5"
                      aria-label={`Remover filtro ${tag}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {searchTerm && (
                  <Badge
                    variant="secondary"
                    className="bg-green-500/20 text-green-300 border-green-500/30 flex items-center gap-1"
                  >
                    "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-1 hover:bg-green-500/30 rounded-full p-0.5"
                      aria-label="Limpiar búsqueda"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-gray-400 hover:text-white text-xs"
                >
                  Limpiar todo
                </Button>
              </div>
            )}
          </div>
        </div>

        {loading && posts.length === 0 ? (
          <BlogSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>

            {filteredPosts.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">
                  {selectedTags.length > 0 || searchTerm
                    ? "No se encontraron artículos con los filtros seleccionados"
                    : "No se encontraron artículos"}
                </p>
                {(selectedTags.length > 0 || searchTerm) && (
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800"
                  >
                    Limpiar filtros
                  </Button>
                )}
              </div>
            )}

            {showPagination && totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Anterior
                </Button>

                <span className="text-gray-400 text-sm">
                  Página {currentPage} de {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}

            {hasNextPage && !searchTerm && (
              <div className="text-center mt-8">
                <Button onClick={loadMorePosts} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {loading ? "Cargando..." : "Cargar más artículos"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
