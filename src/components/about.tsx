import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { profile } from "@/data/profile"

export default function About() {

  return (
    <section id="about" className="py-16">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Sobre mí</h2>
          <p className="text-muted-foreground">Un vistazo a mi experiencia y habilidades</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Mi historia</h3>
              {profile.history.map((item, index) => (
                <p key={index}>
                  {item}
                </p>
              ))}
              
              <div className="pt-4 flex justify-end">
                <Button asChild>
                  <Link href="/about">
                    Ver más sobre mí
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}