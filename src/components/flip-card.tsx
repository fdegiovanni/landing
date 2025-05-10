"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { RotateCw } from "lucide-react"

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
}

export function FlipCard({ front, back, className }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      className={cn(
        "relative w-full perspective-1000 cursor-pointer transition-all duration-500",
        isFlipped ? "min-h-[300px] max-h-[400px]" : "min-h-[200px] max-h-[300px]",
        className,
      )}
      onClick={toggleFlip}
    >
      <div
        className={cn(
          "absolute w-full h-full backface-hidden transition-transform duration-500",
          isFlipped ? "rotate-y-180" : "",
        )}
      >
        <div className="relative w-full h-full rounded-lg bg-background shadow-sm border border-muted">
          {front}
          <div className="absolute bottom-2 right-2 text-muted-foreground flex items-center gap-1 text-sm">
            <RotateCw className="h-3 w-3" />
            <span>Click para más detalles</span>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "absolute w-full h-full backface-hidden transition-transform duration-500 rotate-y-180",
          isFlipped ? "rotate-y-0" : "",
        )}
      >
        <div className="relative w-full h-full rounded-lg bg-background border-2 border-green-500 shadow-sm">
          <div className="absolute inset-0 p-6 overflow-auto pb-24">{back}</div>
          <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border py-2 px-4 flex justify-end items-center">
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <RotateCw className="h-3 w-3" />
              <span>Click para volver</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}