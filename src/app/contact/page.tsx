import Contact from "@/components/contact"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto | Mi Sitio Web",
  description: "Ponte en contacto conmigo a través de este formulario o redes sociales",
}

export default function ContactPage() {
  return <Contact />
}
