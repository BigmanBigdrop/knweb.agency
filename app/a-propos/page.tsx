"use client"

import { motion } from "framer-motion"
import { Target, Lightbulb, Heart, Globe, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Proximité Humaine",
      description: "Nous privilégions les relations authentiques et l'accompagnement personnalisé de chaque client.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Lightbulb,
      title: "Innovation Continue",
      description: "Nous restons à la pointe des technologies pour offrir des solutions modernes et performantes.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Target,
      title: "Excellence Technique",
      description: "Chaque projet est réalisé avec le plus haut niveau de qualité et d'attention aux détails.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "Impact Local",
      description: "Nous contribuons au développement digital des entreprises ivoiriennes et africaines.",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const team = [
    {
      name: "Ange Magloire Kouame",
      role: "Développeur Fullstack/ Businessman",
      description: "Passionné par les technologies web modernes et l'entrepreneuriat digital en Afrique.",
      portfolio: "kamm-dev.vercel.app",
      skills: ["Next.js", "React", "Node.js", "Supabase", "TypeScript"],
    },
  ]

  const milestones = [
    {
      year: "Juin 2023",
      title: "Création de l'agence",
      description: "Lancement de KN Web Agency avec une vision claire : démocratiser le digital en Côte d'Ivoire.",
    },
    {
      year: "Jan 2024",
      title: "Premiers succès",
      description: "Réalisation de nos premiers projets pour des PME locales avec des résultats exceptionnels.",
    },
    {
      year: "Juin 2024",
      title: "Expansion des services",
      description: "Élargissement de notre offre avec les applications web avancées et l'optimisation SEO.",
    },
    {
      year: "2025",
      title: "Innovation IA",
      description: "Intégration prochaine de solutions d'intelligence artificielle dans nos services.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30 dark:from-background dark:via-purple-950/20 dark:to-blue-950/20 pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              À Propos de Nous
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              KN Web Agency est née d'une passion : transformer les idées des entrepreneurs ivoiriens en solutions
              digitales innovantes et accessibles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">Notre Mission</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Chez KN Web Agency, nous croyons fermement que chaque entreprise, quelle que soit sa taille, mérite
                  d'avoir une présence digitale professionnelle et performante.
                </p>
                <p>
                  Notre mission est de démocratiser l'accès aux technologies web modernes pour les PME d'Abidjan et de
                  toute la Côte d'Ivoire, en proposant des solutions sur mesure à des tarifs accessibles.
                </p>
                <p>
                  Nous nous engageons à accompagner nos clients dans leur transformation digitale avec proximité,
                  expertise technique et innovation continue.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
                    <div className="text-sm text-muted-foreground">Clients satisfaits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">40+</div>
                    <div className="text-sm text-muted-foreground">Projets réalisés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction client</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-amber-600 mb-2">3</div>
                    <div className="text-sm text-muted-foreground">Années d'expérience</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">Nos Valeurs</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Les principes qui guident notre travail et nos relations avec nos clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 glass">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl mb-6`}
                    >
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-foreground font-heading">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">Notre Parcours</h2>
            <p className="text-xl text-muted-foreground">Les étapes clés de notre évolution depuis notre création</p>
          </motion.div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 flex-shrink bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl font-heading">
                    {milestone.year}
                  </div>
                </div>
                <Card className="flex-1 glass border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-foreground font-heading">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">Notre Équipe</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Une équipe passionnée et experte au service de votre réussite digitale
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="glass border-0 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl font-heading mx-auto mb-6">
                      KAMM
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground font-heading">{member.name}</h3>
                    <p className="text-purple-600 font-semibold mb-4">{member.role}</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">{member.description}</p>

                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/20 bg-transparent"
                    >
                      <a href={`https://${member.portfolio}`} target="_blank" rel="noopener noreferrer">
                        Voir le portfolio <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">
              Notre Stack Technologique
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nous maîtrisons les technologies les plus modernes pour créer des solutions performantes et évolutives
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Next.js", color: "bg-black dark:bg-white dark:text-black text-white", icon: "⚡" },
              { name: "React", color: "bg-blue-500 text-white", icon: "⚛️" },
              { name: "Supabase", color: "bg-green-500 text-white", icon: "🗄️" },
              { name: "TypeScript", color: "bg-blue-600 text-white", icon: "📘" },
              { name: "Tailwind", color: "bg-cyan-500 text-white", icon: "🎨" },
              { name: "IA (V2)", color: "bg-purple-500 text-white", icon: "🤖" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${tech.color} rounded-2xl p-6 text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-float`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-2xl mb-2">{tech.icon}</div>
                <div className="text-sm">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading">Rejoignez l'Aventure Digitale</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Faites confiance à notre expertise pour transformer votre vision en réalité digitale. Ensemble,
              construisons l'avenir de votre entreprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold"
              >
                <Link href="/contact">
                  Démarrer un projet <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-xl bg-transparent"
              >
                <Link href="/projets">Voir nos réalisations</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
