"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface TimelineItemProps {
  year: string
  title: string
  description: string
  icon?: React.ReactNode
}

interface TimelineProps {
  items: TimelineItemProps[]
  className?: string
}

export function TimelineItem({ year, title, description, icon }: TimelineItemProps) {
  return (
    <div className="timeline-item min-w-[300px] flex-shrink-0 p-4 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        {icon && <div className="h-6 w-6 flex-shrink-0 text-primary">{icon}</div>}
        <span className="text-lg font-bold">{year}</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export function Timeline({ items, className }: TimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // -10 for a small buffer
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.addEventListener("scroll", checkScroll)
      // Check initial scroll state
      checkScroll()
      return () => el.removeEventListener("scroll", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return

    const scrollAmount = 300
    const newScrollLeft =
      direction === "left" ? scrollRef.current.scrollLeft - scrollAmount : scrollRef.current.scrollLeft + scrollAmount

    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    })
  }

  return (
    <div className={cn("relative", className)}>
      <div className="absolute top-1/2 left-1 z-10 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full bg-background/80 backdrop-blur-sm",
            !canScrollLeft && "opacity-0 pointer-events-none",
          )}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>
      </div>

      <div
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        ref={scrollRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="pl-8" /> {/* Spacer */}
        {items.map((item, index) => (
          <div key={index} className="snap-start">
            <TimelineItem {...item} />
          </div>
        ))}
        <div className="pr-8" /> {/* Spacer */}
      </div>

      <div className="absolute top-1/2 right-1 z-10 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full bg-background/80 backdrop-blur-sm",
            !canScrollRight && "opacity-0 pointer-events-none",
          )}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>
    </div>
  )
}
