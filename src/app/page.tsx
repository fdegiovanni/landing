import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import TerminalPreview from "@/components/terminal-preview"
import BlogPreview from "@/components/blog-preview"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <About />
      <Projects projects={[]}/>
      <BlogPreview posts={[]} />
      <TerminalPreview />
      <Contact />
    </div>
  )
}
