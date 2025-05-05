"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // En un caso real, aquí obtendrías el contenido del post desde un CMS o archivos MDX
  const post = {
    title: "Entendiendo los Hooks de React",
    date: "10 Abril, 2023",
    author: "Frontend Developer",
    category: "React",
    content: `
      <p>Los Hooks son una característica introducida en React 16.8 que permite usar estado y otras características de React sin escribir una clase. Vamos a explorar los hooks más comunes y cómo utilizarlos.</p>
      
      <h2>useState</h2>
      <p>El Hook useState te permite añadir estado a tus componentes funcionales:</p>
      <pre><code>
      import React, { useState } from 'react';
      
      function Counter() {
        const [count, setCount] = useState(0);
        
        return (
          <div>
            <p>Has hecho clic {count} veces</p>
            <button onClick={() => setCount(count + 1)}>
              Haz clic
            </button>
          </div>
        );
      }
      </code></pre>
      
      <h2>useEffect</h2>
      <p>El Hook useEffect te permite realizar efectos secundarios en componentes funcionales:</p>
      <pre><code>
      import React, { useState, useEffect } from 'react';
      
      function Example() {
        const [count, setCount] = useState(0);
        
        useEffect(() => {
          document.title = \`Has hecho clic \${count} veces\`;
        });
        
        return (
          <div>
            <p>Has hecho clic {count} veces</p>
            <button onClick={() => setCount(count + 1)}>
              Haz clic
            </button>
          </div>
        );
      }
      </code></pre>
      
      <h2>useContext</h2>
      <p>El Hook useContext te permite suscribirte al contexto de React sin introducir anidamiento:</p>
      <pre><code>
      import React, { useContext } from 'react';
      
      const ThemeContext = React.createContext('light');
      
      function ThemedButton() {
        const theme = useContext(ThemeContext);
        return <button theme={theme}>Botón con tema</button>;
      }
      </code></pre>
      
      <h2>Reglas de los Hooks</h2>
      <ul>
        <li>Solo llama a los Hooks en el nivel superior. No llames a Hooks dentro de bucles, condiciones o funciones anidadas.</li>
        <li>Solo llama a los Hooks desde componentes de función de React. No llames a Hooks desde funciones JavaScript regulares.</li>
      </ul>
      
      <p>Los Hooks son una poderosa adición a React que simplifican el código y hacen más fácil reutilizar la lógica de estado entre componentes.</p>
    `,
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/blog" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al blog
          </Link>
        </Button>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-muted-foreground mb-8">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {post.date}
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </div>
  )
}
