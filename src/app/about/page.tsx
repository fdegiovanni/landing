"use client"

import "./about.css"
import Image from "next/image"
import Link from "next/link"
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
    Trophy,
  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FlipCard } from "@/components/flip-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedTimeline } from "@/components/enhanced-timeline"
import { profile } from "@/data/profile"

export default function AboutPage() {
    const { skills, softSkills, education, experiences, hobbies } = profile

  return (
    <div className="container mx-auto px-4 py-12 max-w-8xl">
      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="sticky top-24">
            <Image
              src={profile.avatars.fromGithub}
              alt={profile.avatars.alt}
              width={400}
              height={400}
              className="rounded-xl mb-4 object-cover"
            />
            <div className="flex gap-2 mb-6">
              <Link href={profile.social.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <Link href={`mailto:${profile.social.email}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Intereses</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    <span>Programación</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coffee className="h-4 w-4" />
                    <span>Mate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Lectura</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Telescope className="h-4 w-4" />
                    <span>Astronomía</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Museum className="h-4 w-4" />
                    <span>Museos</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Actualmente Aprendiendo</h3>
                <p>Patrones avanzados de React, Rust e integración de IA en aplicaciones web</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-6">Hola, soy {profile.fullName} 🖖</h1>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <p className="text-xl mb-12">
                Soy estudiante de Ingeniería en Sistemas de Información con más de siete años de experiencia en el desarrollo de software y docencia universitaria. Mi trayectoria profesional ha estado marcada por la constante búsqueda de la excelencia y la innovación en proyectos tecnológicos, tanto en el ámbito académico como en el empresarial. Actualmente, me desempeño como Senior Software Engineer en Mercado Libre, donde trabajo con equipos multidisciplinarios y contribuyo al desarrollo de soluciones tecnológicas avanzadas.
            </p>
            <p className="mb-12">
                Mi formación académica formal universitaria y la realización de capacitaciones informales han fortalecido mis competencias técnicas y de liderazgo. Además, como docente auxiliar en la Universidad Nacional de Rafaela, he tenido la oportunidad de compartir mi conocimiento y experiencia con futuras generaciones de profesionales, lo que me ha permitido desarrollar habilidades de comunicación efectiva y pedagogía.
            </p>
            <p className="mb-12">
                Soy un profesional proactivo, orientado a resultados y con una fuerte capacidad para trabajar en equipo. Mi enfoque está en la creación de soluciones tecnológicas que no solo sean eficientes y escalables, sino también sostenibles y responsables con el entorno. Busco constantemente nuevos desafíos que me permitan crecer profesionalmente y aportar de manera significativa a los proyectos en los que participo.
            </p>
            <p className="mb-12">
                Mi objetivo es continuar desarrollándome en el campo de la ingeniería de software, con una visión global y un compromiso local, contribuyendo a proyectos innovadores que impulsen el desarrollo tecnológico y social.
            </p>
          </div>
          <Tabs defaultValue="experience" className="mb-12">
            <TabsList className="mb-4">
              <TabsTrigger id="experience" value="experience">Experiencia</TabsTrigger>
              <TabsTrigger value="skills">Habilidades</TabsTrigger>
              <TabsTrigger value="education">Educación</TabsTrigger>
              <TabsTrigger value="hobbies">Curiosidades</TabsTrigger>
            </TabsList>

            <TabsContent value="experience" className="space-y-6">
              
            <div className="grid grid-cols-1 gap-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="transition-all duration-500">
                    <FlipCard
                      front={
                        <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                          <CardContent className="pt-6 h-full flex flex-col">
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="text-xl font-semibold">{exp.role}</h3>
                              <Badge>{exp.period}</Badge>
                            </div>
                            <h4 className="text-lg text-muted-foreground mb-4">{exp.company}</h4>
                            <p className="mb-4 flex-grow">{exp.description}</p>
                          </CardContent>
                        </Card>
                      }
                      back={
                        <Card className="h-full border-0 shadow-md no-color">
                          <CardContent className="p-0">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">Responsabilidades</h3>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                {exp.responsibilities.map((resp, idx) => (
                                  <li key={idx}>{resp}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-4">
                              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-500" />
                                Logros
                              </h3>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                {exp.achievements.map((ach, idx) => (
                                  <li key={idx}>{ach}</li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      }
                    />
                  </div>
                ))}
              </div>

            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Habilidades Técnicas</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {skills.map((skill) => (
                    <Link href={`/blog?skill=${skill.slug}`} key={skill.slug}>
                      <Badge className="cursor-pointer hover:bg-primary/90">{skill.name}</Badge>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Habilidades Blandas</h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill) => (
                    <Link href={`/blog?skill=${skill.slug}`} key={skill.slug}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-secondary/20">
                        {skill.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
             
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-4">Mi Línea del Tiempo Educativa</h3>
                <p className="text-muted-foreground mb-4">
                  Desplázate para ver mi evolución académica desde el inicio hasta hoy
                </p>
              </div>
              <EnhancedTimeline
                items={education.map((item) => ({
                  ...item,
                  icon: item.icon as "Baby" | "School" | "GraduationCap" | "Lightbulb" | "Calendar" | "Youtube" | "Book",
                }))}
                className="mb-6"
              />

            </TabsContent>
            <TabsContent value="hobbies" className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Datos curiosos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hobbies.map((hobby, index) => (
                    <Card key={index}>
                        <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-2">{hobby.title}</h3>
                        <p className="text-muted-foreground">
                            {hobby.description}
                        </p>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
