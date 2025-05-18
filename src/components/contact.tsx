import {
  Mail,
  MapPin,
  Globe,
  Linkedin,
  Instagram,
  Twitter,
  Beer,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/contact-form";
import { profile } from "@/data/profile";

export default function Contact() {
  const {
    social: { linkedin, email, instagram, twitter, github, cafecito },
  } = profile;
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Información de contacto y redes sociales */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">Conectemos</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Estoy disponible para proyectos, colaboraciones o simplemente para
              charlar sobre tecnología.
            </p>
          </div>

          {/* Información de contacto */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <span>De Argentina para el mundo</span>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="space-y-4 pt-8">
            <h3 className="text-xl font-semibold">Sígueme en redes sociales</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" asChild>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden pt-8">
            <h3 className="text-xl font-semibold mb-4">
              ¿Te gusta mi trabajo?
            </h3>
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
              <div className="shrink-0">
              <a
                  href={cafecito}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <img
                  src="/assets/images/little-beer.png"
                  alt="Cerveza"
                  className="w-24 h-24 object-contain"
                />
                </a>
              </div>
              <p className="text-lg text-muted-foreground">
                Si te gusta lo que hago y quieres apoyarme, considera{" "}
                <a
                  href={cafecito}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  invitarme un cafecito o mejor una cervecita
                </a>
                . Tu apoyo significa mucho para mí y me ayuda a seguir creando
                contenido de calidad.
              </p>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Envíame un mensaje</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
