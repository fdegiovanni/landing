"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Twitter, Linkedin, Github, Mail, Globe, FileText, Briefcase, Coffee, Beer } from "lucide-react"
import styles from "./styles.module.css"
import { personalData, links } from "./data"

interface Skill {
  name: string;
}

interface Hobby {
  emoji?: string;
  title: string;
  description: string;
}

function getShuffleArray<T>(array: T[], count: number): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray.slice(0, count || 3);
}

export default function LinksPage() {
  const [randomSkills, setRandomSkills] = useState<Skill[]>([]);
  const [randomHobbies, setRandomHobbies] = useState<Hobby[]>([]);
  const [iaText, setIaText] = useState("IA (Insomnio y Ansiedad)");

  const iaOptions = [
    "IA (Insomnio y Ansiedad)",
    "IA (Inspiración y Aprendizaje)",
    "IA (Intuición y Astucia)",
    "IA (Inventiva y Adaptación)",
    "V0"
  ];


  useEffect(() => {
    let iaIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const updateIaText = () => {
      iaIndex = (iaIndex + 1) % iaOptions.length;
      setIaText(iaOptions[iaIndex]);
      const delay = iaIndex === 4 ? 5000 : 3000;
      timeoutId = setTimeout(updateIaText, delay);
    };

    updateIaText();

    return () => clearTimeout(timeoutId);
  }, []);
  
  useEffect(() => {
    setRandomSkills(getShuffleArray(personalData.skills, 8));
    setRandomHobbies(getShuffleArray(personalData.hobbies, 4));
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-8 px-4 ${styles.gradientBackground} text-white font-sans`}
    >
      <div className="flex flex-col items-center mb-8">
        <div className={`relative w-28 h-28 rounded-full overflow-hidden mb-5 ${styles.personalDataImage}`}>
          <Image
            src={personalData.avatars.fromGithub || "/placeholder.svg"}
            alt={personalData.avatars.alt}
            fill
            className="object-cover"
          />
        </div>
        <h1 className={`text-3xl font-bold font-montserrat ${styles.glowText}`}>{personalData.fullName}</h1>
        <p className="text-lg text-sky-300 mb-2">{personalData.title}</p>
        <p className="text-sm opacity-90 text-center mt-1 max-w-xs">{personalData.history[0]}</p>
      </div>

      {/* Iconos de redes sociales */}
      <div className="flex gap-5 mb-10">
        {personalData.social.github && (
          <Link href={personalData.social.github} className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            <Github className="w-6 h-6" />
            <span className="sr-only">GitHub</span>
          </Link>
        )}
        {personalData.social.linkedin && (
          <Link href={personalData.social.linkedin} className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-6 h-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        )}
        {personalData.social.twitter && (
          <Link href={personalData.social.twitter} className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            <Twitter className="w-6 h-6" />
            <span className="sr-only">Twitter</span>
          </Link>
        )}
        {personalData.social.web && (
          <Link href={personalData.social.web} className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            <Globe className="w-6 h-6" />
            <span className="sr-only">Web</span>
          </Link>
        )}
      </div>

      {/* Habilidades destacadas */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {randomSkills.map((skill, index) => (
          <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-xs backdrop-blur-sm">
            {skill.name}
          </span>
        ))}
      </div>

      {/* Enlaces con efecto holográfico */}
      <div className="w-full max-w-md space-y-4 mb-8">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`flex items-center p-4 rounded-xl bg-gradient-to-r ${link.color} ${styles.holographicCard} ${link.comingSoon ? "opacity-50" : ""}`}
            target={link.external ? "_blank" : "_self"}
            rel={link.external ? "noopener noreferrer" : undefined}
            onClick={link.comingSoon ? (e) => e.preventDefault() : undefined}
          >
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg mr-4">
              {link.icon === "Code" && <Globe className={`w-5 h-5 ${styles.holographicIcon}`} />}
              {link.icon === "FileText" && <FileText className={`w-5 h-5 ${styles.holographicIcon}`} />}
              {link.icon === "Briefcase" && <Briefcase className={`w-5 h-5 ${styles.holographicIcon}`} />}
              {link.icon === "Mail" && <Mail className={`w-5 h-5 ${styles.holographicIcon}`} />}
              {link.icon === "Coffee" && <Coffee className={`w-5 h-5 ${styles.holographicIcon}`} />}
              {link.icon === "Beer" && <Beer className={`w-5 h-5 ${styles.holographicIcon}`} />}
            </div>
            <div className={`flex-1 ${styles[link.className]}`}>
              <h3 className={`font-medium font-montserrat ${styles.holographicTitle}`}>{link.title}</h3>
              <p className="text-sm opacity-80 font-light">{link.description}</p>
            </div>
          </Link>
        ))}

      </div>

      {/* Hobbies */}
      <div className="w-full max-w-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Hobbies & Intereses</h2>
        <div className="grid grid-cols-2 gap-3">
          {randomHobbies.map((hobby, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
              <div className="flex items-center mb-2">
                {hobby.emoji && <span className="text-xl mr-2">{hobby.emoji}</span>}
                <h3 className="text-sm font-medium">{hobby.title}</h3>
              </div>
              <p className="text-xs opacity-80">{hobby.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-xs opacity-70 text-center">
        <p>
          © {new Date().getFullYear()} {personalData.username}
        </p>
        <p className="mt-1">
          Desarrollado con{" "}
          <span className="transition-all duration-500">{iaText}</span>
        </p>
      </div>
    </div>
  )
}
