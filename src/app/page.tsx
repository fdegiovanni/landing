import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import TerminalPreview from "@/components/terminal-preview"
import { AIAdventuresCarousel } from "@/components/ai-adventures-carousel"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <About />
      <AIAdventuresCarousel />
      <Projects projects={[]}/>
      <TerminalPreview />
      <Contact />
    </div>
  )
}
