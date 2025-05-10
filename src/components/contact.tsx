import { Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Contacto</h2>
          <p className="text-muted-foreground">¿Tienes un proyecto en mente? ¡Hablemos!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">federicodegiovanni@gmail.com</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Ubicación</h3>
                  <p className="text-muted-foreground">Rafaela, Argentina</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nombre
                </label>
                <Input id="name" placeholder="Tu nombre" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Asunto
              </label>
              <Input id="subject" placeholder="Asunto del mensaje" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Mensaje
              </label>
              <Textarea id="message" placeholder="Tu mensaje" rows={5} />
            </div>
            <Button type="submit" className="w-full">
              Enviar mensaje
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
