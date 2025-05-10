"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const images = [
  {
    src: "/assets/ai-adventures/parque-glaciares.png",
    alt: "Avatar en estilo Star Wars visitando el Glaciar Perito Moreno",
    location: "Glaciar Perito Moreno",
  },
  {
    src: "/assets/ai-adventures/parque-estero-ibera.png",
    alt: "Avatar en estilo Star Wars visitando los Esteros del Iberá",
    location: "Esteros del Iberá",
  },
  {
    src: "/assets/ai-adventures/parque-banado-la-estrella.png",
    alt: "Avatar en estilo Star Wars visitando el Bañado La Estrella",
    location: "Bañado La Estrella",
  },
  {
    src: "/assets/ai-adventures/parque-iguazu.png",
    alt: "Avatar en estilo Star Wars visitando las Cataratas del Iguazú",
    location: "Cataratas del Iguazú",
  },
  {
    src: "/assets/ai-adventures/parque-patagonia.png",
    alt: "Avatar en estilo Star Wars visitando la Patagonia",
    location: "Patagonia",
  },
]

export function AIAdventuresCarousel() {
  interface CarouselApi {
    selectedScrollSnap: () => number;
    on: (event: string, callback: () => void) => void;
    off: (event: string, callback: () => void) => void;
  }

  const [api, setApi] = useState<CarouselApi | undefined>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", handleSelect)

    return () => {
      api.off("select", handleSelect)
    }
  }, [api])

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Mis Aventuras por Argentina</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Imágenes creadas con IA donde me convierto en un personaje de Star Wars, recorriendo en mi speeder (inspirado
          en mi bici) distintos accidentes geográficos de Argentina como las Cataratas del Iguazú, Bañado La Estrella,
          Esteros del Iberá, Glaciar Perito Moreno y la Patagonia... ¡Próximamente del mundo!
        </p>
      </div>

      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="border-0 shadow-none">
                <CardContent className="p-0 relative">
                  <div className="relative aspect-square sm:aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      priority={index === 0}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white font-medium text-lg">{image.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center mt-4 gap-2">
          <CarouselPrevious variant="outline" size="icon" className="static transform-none" />
          <div className="flex gap-1">
            {images.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className={`w-2 h-2 rounded-full p-0 ${current === index ? "bg-primary" : "bg-muted"}`}
                onClick={() => api?.scrollTo(index)}
              >
                <span className="sr-only">Ir a imagen {index + 1}</span>
              </Button>
            ))}
          </div>
          <CarouselNext variant="outline" size="icon" className="static transform-none" />
        </div>
      </Carousel>
    </div>
  )
}
