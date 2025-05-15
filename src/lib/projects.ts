export type Project = {
    id: string
    title: string
    year?: number
    description: string
    longDescription?: string[]
    imageUrl?: string
    image?: string
    imageAlt?: string
    tags: string[]
    links: {
      github?: string
      demo?: string
      docs?: string
      course?: string
      post?: string
    }
    featured?: boolean
  }
  
  export const projects: Project[] = [
    {
      id: "landing-personal",
      year: 2025,
      title: "Web Personal",
      description: "Sitio web personal creado con Vibe Coding y V0.",
      longDescription: [
        "Este es mi sitio web personal, donde muestro mis proyectos, habilidades y experiencia. Fue desarrollado utilizando tecnologías modernas como Next.js y Tailwind CSS, con la asistencia de V0 para la implementación.",
        "El sitio incluye una sección de proyectos destacados, un blog y una sección de contacto. La interfaz es responsiva y está optimizada para dispositivos móviles.",
        "El código fuente está disponible en GitHub y el sitio está alojado en Vercel.",
        "El sitio es este mismo que estas navegando.",
        "Puedes encontrar los prompts utilizados para su desarrollo y el proceso de creación en el post que escribí.",
        "El sitio está en constante evolución y se actualiza regularmente con nuevos proyectos y contenido.",
      ],
      tags: ["Next.js", "Tailwind CSS", "React", "V0"],
      links: {
        github: "https://github.com/fdegiovanni/landing",
        post: "https://www.fdegiovanni.com.ar/posts/landing-personal",
      },
      featured: true,
    },
    {
      id: "irresponsible-ninja",
      title: "Tutorial Irresponsible Ninja",
      year: 2023,
      description: "Mini curso de desarrollo de videojuegos presentado en Nerdearla.",
      longDescription: [
        "Un tutorial completo para desarrollar un videojuego utilizando Phaser 3. Este curso fue presentado en el evento Nerdearla y cubre los conceptos básicos de desarrollo de juegos, incluyendo sprites, física, colisiones, animaciones y más.",
        "El curso incluye ejemplos prácticos y ejercicios para ayudar a los estudiantes a comprender los conceptos clave del desarrollo de videojuegos.",
        "El código fuente está disponible en GitHub y el curso completo está alojado en Notion.",
        "El curso está diseñado para principiantes y no se requiere experiencia previa en desarrollo de videojuegos.",
        "Si quieres tener tu primer acercamiento al desarrollo de videojuegos, este es el curso ideal para ti. Para ello debes seguir lo que indica el readme del repositorio de GitHub. Ya que el curso fue creado mediante la funcionalidades de GitHub Education.",
      ],
      tags: ["Phaser 3", "JavaScript", "Game Development"],
      links: {
        github: "https://github.com/fdegiovanni/phaser3-get-started",
        course: "https://fluorescent-success-de2.notion.site/Tutorial-Irresponsible-Ninja-13ccf4f484f347e4abff5a833d25b542?pvs=74",
      },
    },
    {
      id: "python-101",
      title: "Python 101",
      year: 2024,
      description: "Mini curso de Python para principiantes (en construcción).",
      longDescription: [
        "Un curso introductorio de Python diseñado para principiantes que cubre los fundamentos del lenguaje, estructuras de datos, control de flujo, funciones y módulos básicos.",
        "El curso está diseñado para ser accesible y fácil de seguir, con ejemplos prácticos y ejercicios para ayudar a los estudiantes a comprender los conceptos clave de Python.",
        "El curso completo está alojado en Notion.",
        "El curso está en construcción y se actualizará con nuevos contenidos y ejercicios.",
        "Fue desarrollado como modulo de la catedra de Programación de Inteligencia Artificial y Patrones de Comportamiento de la Licenciatura en Producción de Videojuegos y Entretenimiento Digital.",
      ],
      tags: ["Python", "Programación", "Educación"],
      links: {
        course: "https://fluorescent-success-de2.notion.site/Python-101-1db32f0451ae486485f6aab933eff118",
      },
    },
    {
      id: "localization-tool",
      title: "Herramienta de Localización",
      year: 2024,
      description: "Sistema de gestión de traducciones para proyectos con frontend y API.",
      longDescription:[
        "Un sistema completo para la gestión de localizaciones y traducciones. Está compuesto por un frontend que permite administrar claves y traducciones, y una API para descargar traducciones en tiempo real. Diseñado especialmente para los estudiantes de Programación 2 de la Licenciatura en Producción de Videojuegos y Entretenimiento Digital.",
        "El sistema permite a los usuarios agregar, editar y eliminar claves y traducciones, así como descargar las traducciones en diferentes formatos.",
        "El frontend está desarrollado con React y la API está construida con Node.js y Express.",
        "El código fuente está disponible en GitHub y el sistema está alojado en Vercel.",
        "El sistema es fácil de usar y está diseñado para ser escalable y flexible.",
      ],
      tags: ["React", "Node.js", "API", "Localización"],
      links: {},
    },
  ]
  
  export function getAllProjects() {
    return projects
  }
  
  export function getFeaturedProjects() {
    return projects.filter((project) => project.featured)
  }
  
  export function getProjectById(id: string) {
    return projects.find((project) => project.id === id)
  }
  