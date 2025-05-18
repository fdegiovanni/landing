"use server"

import { z } from "zod"
import { createClient } from "@supabase/supabase-js"

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
})

type ContactFormData = z.infer<typeof contactSchema>

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate form data
    const validatedData = contactSchema.parse(formData)

    // Store message in Supabase
    const { error } = await supabase.from("contact_messages").insert([
      {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        status: "new",
      },
    ])

    if (error) {
      console.error("Error storing message:", error)
      throw error
    }

    return {
      success: true,
      message: "Tu mensaje ha sido recibido correctamente. Nos pondremos en contacto contigo pronto.",
    }
  } catch (error) {
    console.error("Error processing contact form:", error)
    return {
      success: false,
      message: "Ha ocurrido un error al procesar el formulario. Por favor, inténtelo de nuevo.",
    }
  }
}
