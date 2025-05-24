import type { Metadata } from "next"
import Image from "next/image";

import { usesData, UseItem, UseSection, lastUpdated } from "@/data/uses";


export const metadata: Metadata = {
  title: "Uses | Algunas de las cosas que uso",
  description: "Aquí hay una lista de todas las herramientas, gadgets y software que uso a diario para el trabajo y proyectos personales.",
}

function UseItemRenderer({ item }: { item: UseItem }) {
    switch (item.type) {
      case 'text':
        return <li>{item.content}</li>;

      case 'bulleted':
        return (
          <li>
            <p className="font-medium">{item.title}</p>
            {item.body && <p className="text-sm text-muted-foreground">{item.body}</p>}
            <ul className="list-disc pl-6">
              {item.bullets.map((bullet, index) => (
                <li key={index} className="text-sm text-muted-foreground">{bullet}</li>
              ))}
            </ul>
          </li>
        );
        
      case 'link':
        return (
          <li>
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline hover:text-primary/80 flex items-center"
            >
              {item.content} 
              <span className="text-xs ml-2 text-muted-foreground">(ver en web)</span>
            </a>
          </li>
        );
        
      case 'image':
        return (
          <li className="flex justify-between items-center">
            <span>{item.content}</span>
            {item.url && (
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs ml-2 text-muted-foreground hover:underline hover:text-primary/80"
              >
                Ver imagen
              </a>
            )}
            <div className="h-12 w-12 relative">
              <Image 
                src={item.imageUrl} 
                alt={item.imageAlt || item.content} 
                className="rounded-md object-cover" 
                fill
                sizes="48px"
              />
            </div>
          </li>
        );
        
      case 'structured':
        return (
          <li className="py-2">
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.body}</p>
            {item.additionalInfo && (
              <p className="text-xs italic mt-1 text-muted-foreground">{item.additionalInfo}</p>
            )}
            {item.url && (
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs ml-2 text-muted-foreground hover:underline hover:text-primary/80"
              >
                Ver más
              </a>
            )}
          </li>
        );
      default:
        return <li className="text-red-500">Error: Unsupported item type "{item.type}"</li>;
    }
  }

export default function UsesPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Uses</h1>

      <p className="text-lg mb-8">
        Aquí hay una lista de todas las herramientas, dispositivos y software que uso diariamente para trabajo y proyectos personales.
        Puedes ver muchas de estas configuraciones en {" "}
        <a
          href="https://uses.tech"
          className="text-primary underline hover:text-primary/80"
          target="_blank"
          rel="noopener noreferrer"
        >
          uses.tech
        </a>
        .
      </p>

    {usesData.map((section: UseSection) => (
      <section key={section.title} className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">{section.title}</h2>
        <ul className="space-y-3 list-disc pl-6">
        {section.items.map((item) => (
              <UseItemRenderer key={item.title} item={item} />
            ))}
        </ul>
      </section>
    ))}

      <footer className="text-sm text-gray-500 mt-16">
        <p>Última actualización: {lastUpdated}</p>
      </footer>
    </div>
  )
}