import { BlogSection } from "@/components/blog-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <BlogSection
        publicationHost="fdegiovanni.hashnode.dev"
        maxPosts={12}
        showPagination={true}
      />
    </main>
  )
}
