"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { submitContactForm } from "@/lib/actions/contact-actions"

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  subject: z.string().min(5, { message: "El asunto debe tener al menos 5 caracteres" }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [statusMessage, setStatusMessage] = useState("")
  const [honeypot, setHoneypot] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check honeypot (anti-spam)
    if (honeypot) {
      // Silently reject if honeypot is filled (likely a bot)
      setSubmitStatus("success")
      setStatusMessage("Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Validate form data
      const result = contactSchema.safeParse(formData)

      if (!result.success) {
        const formattedErrors: Partial<Record<keyof ContactFormData, string>> = {}
        result.error.issues.forEach((issue) => {
          formattedErrors[issue.path[0] as keyof ContactFormData] = issue.message
        })
        setErrors(formattedErrors)
        setIsSubmitting(false)
        return
      }

      // Submit form data
      const response = await submitContactForm(formData)

      if (response.success) {
        setSubmitStatus("success")
        setStatusMessage(response.message)
        // Reset form on success
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
        setStatusMessage(response.message)
      }
    } catch (error) {
      setSubmitStatus("error")
      setStatusMessage("Ha ocurrido un error al enviar el formulario. Por favor, inténtelo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full border-0 shadow-none">
      <CardContent className="p-6">
        {submitStatus && (
          <Alert
            className={`mb-6 ${submitStatus === "success" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}
          >
            <div className="flex items-center gap-2">
              {submitStatus === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{submitStatus === "success" ? "Mensaje enviado" : "Error"}</AlertTitle>
            </div>
            <AlertDescription>{statusMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field - invisible to users, but bots will fill it out */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: "none" }}
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
          />

          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              className={errors.name ? "border-red-300 focus:border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className={errors.email ? "border-red-300 focus:border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Asunto</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Asunto del mensaje"
              className={errors.subject ? "border-red-300 focus:border-red-500" : ""}
            />
            {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
              className={errors.message ? "border-red-300 focus:border-red-500" : ""}
            />
            {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
          </div>
        </form>
      </CardContent>
      <CardFooter className="px-0 pt-4">
        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar mensaje"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
