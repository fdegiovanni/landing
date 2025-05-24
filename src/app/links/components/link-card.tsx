"use client"

import { useState } from "react"
import Link from "next/link"
import * as Icons from "lucide-react"

interface LinkCardProps {
  title: string
  description: string
  icon: keyof typeof Icons
  href: string
  color?: string
  external?: boolean
  comingSoon?: boolean
}

export default function LinkCard({
  title,
  description,
  icon,
  href,
  color = "from-sky-600 to-blue-800",
  external = false,
  comingSoon = false,
}: LinkCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const Icon = Icons[icon as keyof typeof Icons]

  return (
    <Link
      href={comingSoon ? "#" : href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`flex items-center p-4 bg-gradient-to-r ${color} rounded-xl transition-all border border-white/10 group relative overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={comingSoon ? (e) => e.preventDefault() : undefined}
    >
      {/* Efecto de brillo al hover */}
      <div
        className={`absolute inset-0 bg-white/20 blur-xl rounded-full scale-0 transition-transform duration-700 ${isHovered ? "scale-150" : ""}`}
        style={{
          left: "50%",
          top: "50%",
          transform: isHovered ? "translate(-50%, -50%) scale(1.5)" : "translate(-50%, -50%) scale(0)",
        }}
      />

      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg mr-4 z-10">
        <Icon className="w-6 h-6" />
      </div>

      <div className="flex-1 z-10">
        <div className="flex items-center">
          <h3 className="font-medium font-[var(--font-montserrat)]">{title}</h3>
          {comingSoon && <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">Próximamente</span>}
          {external && <Icons.ExternalLink className="ml-2 w-3 h-3 opacity-70" />}
        </div>
        <p className="text-sm opacity-80 font-light">{description}</p>
      </div>
    </Link>
  )
}
