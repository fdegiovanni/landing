"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TerminalIcon, User, Briefcase, BookOpen, Mail, HelpCircle, X } from "lucide-react"

type CommandType = {
  command: string
  output: string | JSX.Element
}

export default function TerminalPage() {
  const [input, setInput] = useState<string>("")
  const [history, setHistory] = useState<CommandType[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-2">
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
            <p>Soy un desarrollador frontend apasionado por crear experiencias web excepcionales.</p>
            <p>Me especializo en React, Next.js, TypeScript y diseño de interfaces.</p>
            <p>
              Cuando no estoy programando, disfruto compartiendo conocimientos en mi blog y contribuyendo a proyectos
              open source.
            </p>
          </div>
        )
        break
      case "projects":
        output = (
          <div className="space-y-2">
            <p className="font-bold">Mis proyectos</p>
            <ul className="space-y-1">
              <li>
                📊 <span className="text-primary">E-commerce Dashboard</span> - Panel de administración para tiendas
                online
              </li>
              <li>
                📝 <span className="text-primary">Blog Platform</span> - Plataforma de blog con soporte para Markdown
              </li>
              <li>
                🌤️ <span className="text-primary">Weather App</span> - Aplicación del clima con pronóstico de 7 días
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
            <ul className="space-y-1">
              <li>
                ⚛️ <span className="text-primary">Entendiendo los Hooks de React</span> - 10 Abril, 2023
              </li>
              <li>
                🎨 <span className="text-primary">CSS Grid vs Flexbox</span> - 25 Marzo, 2023
              </li>
              <li>
                ⚡ <span className="text-primary">Optimización de rendimiento en Next.js</span> - 15 Febrero, 2023
              </li>
            </ul>
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
            <p>📧 Email: hello@example.com</p>
            <p>📱 Teléfono: +34 123 456 789</p>
            <p>📍 Ubicación: Madrid, España</p>
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
