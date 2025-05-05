import { getRequestConfig } from "next-intl/server"

// Define los idiomas soportados
export const locales = ["es", "en", "pt"]
export const defaultLocale = "es"

export default getRequestConfig(async ({ locale }) => {
   console.log('FEDE',  `./messages/${locale}.json`)
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
