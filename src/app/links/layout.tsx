import type React from "react"
import { Poppins, Montserrat } from "next/font/google"

type Props = {
  children: React.ReactNode
}

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

const montserrat = Montserrat({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export function generateMetadata() {
  return {
    title: "Federico Degiovanni | Links",
    description: "Todos mis enlaces en un solo lugar",
  }
}

export default function LinksLayout({ children }: Props) {
  return (
    <div className={`${poppins.variable} ${montserrat.variable} min-h-screen`}>
      {children}
    </div>
  )
}