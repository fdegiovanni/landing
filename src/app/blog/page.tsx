import { BlogSection } from "@/components/blog-section"
import { profile } from "@/data/profile"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <BlogSection
        publicationHost={profile.social.hashnode}
        maxPosts={12}
        showPagination={true}
      />
    </main>
  )
}
