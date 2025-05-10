"use client";

import type React from "react";

import { useRef, useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  BookOpen,
  Coffee,
  Code,
  Telescope,
  LibraryIcon as Museum,
  Baby,
  School,
  GraduationCap,
  Lightbulb,
  Book,
  Youtube,
  Calendar,
} from "lucide-react";

interface TimelineItemProps {
  id: string;
  year: string;
  title: string;
  description: string;
  icon?: keyof typeof iconMap;
}

interface EnhancedTimelineProps {
  items: TimelineItemProps[];
  className?: string;
  iconMap?: Record<string, React.ReactNode>;
}

const iconMap = {
  Baby: <Baby />,
  School: <School />,
  GraduationCap: <GraduationCap />,
  Lightbulb: <Lightbulb />,
  Book: <Book />,
  Youtube: <Youtube />,
  Calendar: <Calendar />,
};

export function TimelineItem({
  id,
  year,
  title,
  description,
  icon,
}: TimelineItemProps) {
  return (
    <div
      id={id}
      className="timeline-item min-w-[300px] w-[300px] flex-shrink-0 p-4 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col transition-all duration-500"
      data-active="false"
    >
      <div className="flex items-center gap-2 mb-2">
        {icon && (
          <div className="h-6 w-6 flex-shrink-0 text-primary">
            {iconMap[icon as keyof typeof iconMap]}
          </div>
        )}
        <span className="text-lg font-bold">{year}</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function EnhancedTimeline({ items, className }: EnhancedTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeStage, setActiveStage] = useState<string | null>(items[0]?.id || null)

  // Define highlight positions based on container width
  const getHighlightPosition = (stage: string) => {
    // These positions will be calculated dynamically based on container width
    const positions: Record<string, number> = {
      baby: 0.05, // 5% from left
      child: 0.2, // 20% from left
      teen: 0.35, // 35% from left
      graduate: 0.65, // 65% from left
      adult: 0.85, // 85% from left
    }

    return positions[stage] || 0.5
  }

  // Function to scroll to a specific item
  const scrollToItem = (index: number) => {
    if (!scrollRef.current) return

    // Ensure index is within bounds
    const boundedIndex = Math.max(0, Math.min(index, items.length - 1))
    setActiveIndex(boundedIndex)

    const item = scrollRef.current.children[boundedIndex] as HTMLElement
    if (!item) return

    // Calculate the scroll position to center the item
    const containerWidth = scrollRef.current.clientWidth
    const itemWidth = item.offsetWidth
    const itemLeft = item.offsetLeft
    const scrollLeft = itemLeft - containerWidth / 2 + itemWidth / 2

    // Smooth scroll to the position
    scrollRef.current.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    })

    // Update active stage for image highlighting
    setActiveStage(items[boundedIndex].id)

    // Update data-active attribute for styling
    Array.from(scrollRef.current.children).forEach((child, idx) => {
      child.setAttribute("data-active", idx === boundedIndex ? "true" : "false")
    })
  }

  // Navigate to previous item
  const goToPrevious = () => {
    scrollToItem(activeIndex - 1)
  }

  // Navigate to next item
  const goToNext = () => {
    scrollToItem(activeIndex + 1)
  }

  // Initialize and handle keyboard navigation
  useEffect(() => {
    // Initial scroll to first item
    scrollToItem(0)

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])


  return (
    <div className={cn("relative", className)}>
      <div className="relative w-full mb-8 rounded-lg overflow-hidden">
        <div className="relative w-full h-[300px] md:h-[350px] lg:h-[400px] mx-auto max-w-3xl" ref={imageContainerRef}>
          <Image src="/assets/images/life-journey.png" alt="Journey through life" fill className="object-cover" priority />

          {["baby", "child", "teen", "graduate", "adult"].map((stage) => (
            <div
              key={stage}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                activeStage === stage ? "opacity-100" : "opacity-0",
              )}
              style={{
                background:
                  activeStage === stage
                    ? `radial-gradient(circle at ${getHighlightPosition(stage) * 100}% 50%, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 50%)`
                    : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 mt-[150px]">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full bg-background/80 backdrop-blur-sm",
            activeIndex === 0 && "opacity-50 cursor-not-allowed",
          )}
          onClick={goToPrevious}
          disabled={activeIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Anterior</span>
        </Button>
      </div>

      {/* Timeline items container */}
      <div className="relative overflow-hidden mx-auto max-w-3xl">
        <div
          className="flex gap-4 overflow-x-hidden scrollbar-hide transition-all duration-500 py-4"
          ref={scrollRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "flex-shrink-0 transition-all duration-500",
                index === activeIndex ? "scale-105 opacity-100" : "scale-95 opacity-60",
              )}
              onClick={() => scrollToItem(index)}
            >
              <TimelineItem {...item} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 mt-[150px]">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full bg-background/80 backdrop-blur-sm",
            activeIndex === items.length - 1 && "opacity-50 cursor-not-allowed",
          )}
          onClick={goToNext}
          disabled={activeIndex === items.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Siguiente</span>
        </Button>
      </div>

      {/* Pagination indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === activeIndex ? "bg-primary w-4" : "bg-muted hover:bg-primary/50",
            )}
            onClick={() => scrollToItem(index)}
            aria-label={`Ir a la etapa ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
