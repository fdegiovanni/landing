"use client"

import type React from "react"

import { useState, useEffect, useRef, JSX } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TerminalIcon, User, Briefcase, BookOpen, Mail, HelpCircle, X } from "lucide-react"
import { useAsciiText, starWars } from 'react-ascii-text';
import { profile } from "@/data/profile"
import { fetchHashnodePosts } from "@/lib/hashnode-api"
import type { HashnodePost } from "@/types/blog"

type CommandType = {
  command: string
  output: string | JSX.Element
}


export default function TerminalPage() {
  const [posts, setPosts] = useState<HashnodePost[]>([])

  function LogoCLI() {
    const asciiTextRef = useAsciiText({
      font: starWars,
      text: "fdegiovanni",
    });
  
    return <pre className="text-xs" ref={asciiTextRef as React.RefObject<HTMLPreElement>}></pre>;
  }

  const getPosts = async () => {
    try {
      const {posts: newPosts} = await fetchHashnodePosts(profile.social.hashnode, 3, "");
      console.log("Hashnode posts fetched:", newPosts);
      setPosts(newPosts);
    } catch (error) {
      console.error("Error fetching Hashnode posts:", error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  const postCLI = () => {
    if (posts.length === 0) {
      return "No hay artículos recientes.";
    }

    return (
      <div className="space-y-2">
        <ul className="space-y-1">
          {posts.map((post) => (
            <li key={post._id}>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {post.title}
              </a> - {new Date(post.publishedAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  
  const [input, setInput] = useState<string>("")
  const [history, setHistory] = useState<CommandType[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-2">
          <LogoCLI />
          <p>¡Bienvenido a mi terminal interactiva!</p>
          <p>
            Escribe <span className="text-primary font-bold">help</span> para ver los comandos disponibles.
          </p>
        </div>
      ),
    },
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)

  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()

    // Add to command history
    if (command) {
      setCommandHistory((prev) => [...prev, command])
      setHistoryIndex(-1)
    }

    let output: string | JSX.Element = 'Comando no reconocido. Escribe "help" para ver los comandos disponibles.'

    switch (command) {
      case "logo":
        output = (
          <div className="space-y-2">
            <LogoCLI />
          </div>
        )
        break

      case "help":
        output = (
          <div className="space-y-2">
            <p>Comandos disponibles:</p>
            <ul className="space-y-1">
              <li>
                <span className="text-primary font-bold">about</span> - Información sobre mí
              </li>
              <li>
                <span className="text-primary font-bold">projects</span> - Ver mis proyectos
              </li>
              <li>
                <span className="text-primary font-bold">blog</span> - Leer mis artículos
              </li>
              <li>
                <span className="text-primary font-bold">contact</span> - Información de contacto
              </li>
             {/*  <li>
                <span className="text-primary font-bold">ascci art:[text]</span> - Crea arte ASCII con el texto ingresado ej: ascci art:fdegiovanni
              </li> */}
              <li>
                <span className="text-primary font-bold">clear</span> - Limpiar la terminal
              </li>
              <li>
                <span className="text-primary font-bold">exit</span> - Volver a la página principal
              </li>
            </ul>
          </div>
        )
        break
      case "about":
        output = (
          <div className="space-y-2">
            <p className="font-bold">Sobre mí</p>
            {profile.history.map((item, index) => (
              <p key={index} className="text-muted-foreground">
                {item}
              </p>
            ))}
            <p className="mt-2">
              Escribe <span className="text-primary font-bold">more info</span> para ver más detalles.
            </p>
          </div>
        )
        break
      case "more info":
        output = (
          <div className="space-y-2">
            <p className="font-bold">Más información</p>

            <p className="text-muted-foreground">
                Soy estudiante de Ingeniería en Sistemas de Información con más de siete años de experiencia en el desarrollo de software y docencia universitaria. Mi trayectoria profesional ha estado marcada por la constante búsqueda de la excelencia y la innovación en proyectos tecnológicos, tanto en el ámbito académico como en el empresarial. Actualmente, me desempeño como Senior Software Engineer en Mercado Libre, donde trabajo con equipos multidisciplinarios y contribuyo al desarrollo de soluciones tecnológicas avanzadas.
            </p>
            <p className="text-muted-foreground">
                Mi formación académica formal universitaria y la realización de capacitaciones informales han fortalecido mis competencias técnicas y de liderazgo. Además, como docente auxiliar en la Universidad Nacional de Rafaela, he tenido la oportunidad de compartir mi conocimiento y experiencia con futuras generaciones de profesionales, lo que me ha permitido desarrollar habilidades de comunicación efectiva y pedagogía.
            </p>
            <p className="text-muted-foreground">
                Soy un profesional proactivo, orientado a resultados y con una fuerte capacidad para trabajar en equipo. Mi enfoque está en la creación de soluciones tecnológicas que no solo sean eficientes y escalables, sino también sostenibles y responsables con el entorno. Busco constantemente nuevos desafíos que me permitan crecer profesionalmente y aportar de manera significativa a los proyectos en los que participo.
            </p>
            <p className="text-muted-foreground">
                Mi objetivo es continuar desarrollándome en el campo de la ingeniería de software, con una visión global y un compromiso local, contribuyendo a proyectos innovadores que impulsen el desarrollo tecnológico y social.
            </p>
            <p className="mt-2">
              Escribe <span className="text-primary font-bold">hobbies</span> para ver más detalles.
            </p>
            <p className="mt-2">
              Escribe <span className="text-primary font-bold">interests</span> para ver más detalles.
            </p>
            <p className="mt-2">
              Escribe <span className="text-primary font-bold">education</span> para ver más detalles.
            </p>
            <p className="mt-2">
              Escribe <span className="text-primary font-bold">jobs</span> para ver más detalles.
            </p>
          </div>
        )
        break
      case "hobbies":
        output = (
          <div className="space-y-2">
            <p className="font-bold">Mis hobbies</p>
            <ul className="space-y-1">
              {profile.hobbies.map((hobby, index) => (
                <li key={index}>
                  {hobby.emoji} <span className="text-primary">{hobby.title}</span> - {hobby.description}
                </li>
              ))}
            </ul>
            </div>
        )
        break
      case "interests":
        output = (
          <div className="space-y-2">
            <p className="font-bold">Mis intereses</p>
            <ul className="space-y-1">
              {profile.interests.map((interest, index) => (
                <li key={index}>
                  {interest.name}
                </li>
              ))}
            </ul>
            </div>
        )
        break
      case "education":
        output = (
          <div className="space-y-2">
            <p className="font-bold">Mi educación</p>
            <ul className="space-y-1">
              {profile.education.map((edu, index) => (
                <li key={index} className="pb-2">
                  {edu.emoji} - <span className="text-muted-foreground">{edu.year}</span> <br />
                  <span className="text-primary">{edu.title}</span> <br />
                  <span className="text-muted-foreground">{edu.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )
        break
      case "jobs":
        output = (
          <div className="space-y-2">
            <p className="font-bold">Mi experiencia laboral</p>
            <ul className="space-y-1">
              {profile.experiences.map((job, index) => (
                <li key={index} className="pb-2">
                  <hr className="border-t border-gray-700" />
                  <p className="text-primary">
                    🧗‍♂️ - <span className="text-muted-foreground">{job.period}</span> <br />
                   <span className="text-primary">{job.role}</span> en  <span className="font-bold">{job.company}</span><br />
                   <span>{job.description}</span>
                  </p>
                  <br />
                  <p >
                    Responsabilidades:
                  </p>
                  <ul className="list-disc list-inside">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="text-muted-foreground">
                        {resp}
                        </li>
                    ))}
                  </ul>
                  <br />
                  <p>
                    Principales logros:
                  </p>
                  <ul className="list-disc list-inside">
                    {job.achievements.map((ach, index) => (
                      <li key={index} className="text-muted-foreground">
                        {ach}
                        </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )
        break
      case "projects":
        output = (
          <div className="space-y-2">
            <p className="font-bold">Mis proyectos</p>
            <ul className="space-y-1">
              <li>
                📊 <span className="text-primary">Ejemplo</span> - Ejemplo
              </li>
            </ul>
            <p className="mt-2">
              Escribe <span className="text-primary font-bold">open projects</span> para ver más detalles.
            </p>
          </div>
        )
        break
      case "open projects":
        output = "Redirigiendo a la página de proyectos..."
        setTimeout(() => {
          window.location.href = "/projects"
        }, 1000)
        break
      case "blog":
        output = (
          <div className="space-y-2">
            <p className="font-bold">Artículos recientes</p>
            {postCLI()}
            <p className="mt-2">
              Escribe <span className="text-primary font-bold">open blog</span> para ver todos los artículos.
            </p>
          </div>
        )
        break
      case "open blog":
        output = "Redirigiendo al blog..."
        setTimeout(() => {
          window.location.href = "/blog"
        }, 1000)
        break
      case "contact":
        output = (
          <div className="space-y-2">
            <p className="font-bold">Información de contacto</p>
            <p>📧 Email: {profile.social.email}</p>
            <p>📱 Teléfono: {profile.social.mobile}</p>
            <p>📍 Ubicación: {profile.location}</p>
            <p className="mt-2">
              Escribe <span className="text-primary font-bold">open contact</span> para ir al formulario de contacto.
            </p>
          </div>
        )
        break
      case "open contact":
        output = "Redirigiendo a la página de contacto..."
        setTimeout(() => {
          window.location.href = "/contact"
        }, 1000)
        break
      case "clear":
        setHistory([])
        return
      case "exit":
        output = "Volviendo a la página principal..."
        setTimeout(() => {
          window.location.href = "/"
        }, 1000)
        break
      case "":
        return
      default:
        if (command.startsWith("open ")) {
          const page = command.replace("open ", "")
          if (["about", "projects", "blog", "contact"].includes(page)) {
            output = `Redirigiendo a ${page}...`
            setTimeout(() => {
              window.location.href = `/${page}`
            }, 1000)
          }
        }
    }

    setHistory((prev) => [...prev, { command, output }])
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden border-2 border-primary/20 max-w-4xl mx-auto">
        <div className="bg-black text-green-500 font-mono p-1 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs">terminal</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-green-500 hover:text-green-400 hover:bg-transparent"
            onClick={() => (window.location.href = "/")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </div>
        <div ref={terminalRef} className="bg-black text-green-500 font-mono p-4 h-[70vh] overflow-y-auto">
          {history.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center">
                <span className="text-primary mr-2">$</span>
                <span>{item.command}</span>
              </div>
              <div className="mt-1 ml-4">{item.output}</div>
            </div>
          ))}
          <div className="flex items-center">
            <span className="text-primary mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none"
              aria-label="Terminal input"
            />
            <span className="animate-pulse">_</span>
          </div>
        </div>
        <div className="bg-gray-900 p-3 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent text-green-500 border-green-500 hover:bg-green-500/10"
            onClick={() => handleCommand("help")}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            help
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent text-green-500 border-green-500 hover:bg-green-500/10"
            onClick={() => handleCommand("about")}
          >
            <User className="mr-2 h-4 w-4" />
            about
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent text-green-500 border-green-500 hover:bg-green-500/10"
            onClick={() => handleCommand("projects")}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            projects
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent text-green-500 border-green-500 hover:bg-green-500/10"
            onClick={() => handleCommand("blog")}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            blog
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent text-green-500 border-green-500 hover:bg-green-500/10"
            onClick={() => handleCommand("contact")}
          >
            <Mail className="mr-2 h-4 w-4" />
            contact
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent text-green-500 border-green-500 hover:bg-green-500/10"
            onClick={() => handleCommand("clear")}
          >
            <TerminalIcon className="mr-2 h-4 w-4" />
            clear
          </Button>
        </div>
      </Card>
    </div>
  )
}
