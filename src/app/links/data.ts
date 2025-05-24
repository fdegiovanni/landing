import { profile } from "../../data/profile"

export const personalData = {
  username: profile.username,
  name: profile.fullName,
  fullName: profile.fullName,
  title: profile.title,
  avatars: profile.avatars,
  history: profile.history,
  bio: profile.history[0],
  social: {
    github: profile.social.github,
    linkedin: profile.social.linkedin,
    twitter: profile.social.twitter,
    email: profile.social.email,
    cafecito: profile.social.cafecito,
    web: profile.social.web,
  },
  skills: profile.skills,
  interests: profile.interests,
  hobbies: profile.hobbies,
}

export const links = [
  {
    title: "Mi Portafolio",
    description: "Explora mis proyectos y trabajos en desarrollo web",
    icon: "Code",
    href: "/projects",
    color: "from-cyan-600 to-blue-800",
    className: "codeEffect",
  },
  {
    title: "Blog (Próximamente)",
    description: "Artículos sobre desarrollo, tecnología y experiencias",
    icon: "FileText",
    href: "#",
    color: "from-blue-700 to-indigo-900",
    comingSoon: true,
    className: "docEffect",
  },
  {
    title: "Sobre mí",
    description: "Mi trayectoria y algunos datos interesantes",
    icon: "Briefcase",
    href: "/about#experience",
    color: "from-indigo-600 to-purple-800",
    className: "expEffect",
  },
  {
    title: "Contáctame",
    description: "¡Hablemos!",
    icon: "Mail",
    href: "/contact",
    color: "from-purple-600 to-pink-800",
    className: "contactEffect",
  },
  {
    title: "Invítame un Cafecito",
    description: "Apoya mi trabajo y contenido. Acepto cerveza también!",
    icon: "Beer",
    href: profile.social.cafecito,
    color: "from-amber-600 to-orange-800",
    external: true,
    className: "beerEffect",
  },
]
