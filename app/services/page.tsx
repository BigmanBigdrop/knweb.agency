"use client"

import { motion } from "framer-motion"
import { Globe, Zap, Smartphone, Palette, Database, Shield, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Globe,
      title: "Sites Vitrines",
      description: "Sites web élégants et performants pour présenter votre entreprise avec style",
      features: [
        "Design responsive et moderne",
        "Optimisation SEO incluse",
        "Formulaires de contact",
        "Intégration réseaux sociaux",
        "Hébergement et maintenance",
      ],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Zap,
      title: "Applications Web",
      description: "Solutions web sur mesure pour optimiser vos processus métier et augmenter votre productivité",
      features: [
        "Interface utilisateur intuitive",
        "Base de données sécurisée",
        "Gestion des utilisateurs",
        "Tableaux de bord analytiques",
        "API et intégrations tierces",
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Smartphone,
      title: "Développement Mobile",
      description: "Applications mobiles natives pour iOS et Android - Disponible très bientôt !",
      features: [
        "Applications natives iOS/Android",
        "Interface utilisateur fluide",
        "Notifications push",
        "Synchronisation cloud",
        "Publication sur les stores",
      ],
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      comingSoon: true,
    },
    {
      icon: Palette,
      title: "Refonte UX/UI",
      description: "Modernisation de votre identité digitale pour une expérience utilisateur optimale",
      features: [
        "Audit UX complet",
        "Maquettes interactives",
        "Tests utilisateurs",
        "Design system cohérent",
        "Migration de données",
      ],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Database,
      title: "Intégration APIs",
      description: "Connexion de vos systèmes avec des services tiers pour automatiser vos processus",
      features: [
        "APIs REST et GraphQL",
        "Intégrations paiement",
        "Synchronisation données",
        "Webhooks et automatisation",
        "Documentation technique",
      ],
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      icon: Shield,
      title: "Maintenance & Support",
      description: "Accompagnement continu pour garantir la performance et la sécurité de vos solutions",
      features: [
        "Mises à jour sécurisées",
        "Monitoring 24/7",
        "Sauvegardes automatiques",
        "Support technique réactif",
        "Optimisations performance",
      ],
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30 dark:from-background dark:via-purple-950/20 dark:to-blue-950/20 pt-20">
      {/* Hero Section */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Nos Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des solutions digitales complètes et sur mesure pour propulser votre entreprise vers le succès. Nous
              maîtrisons les technologies modernes pour créer des expériences exceptionnelles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card
                  className={`h-full hover:shadow-2xl transition-all duration-300 border-0 glass relative overflow-hidden`}
                >
                  {service.comingSoon && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                      Bientôt disponible
                    </div>
                  )}

                  <CardHeader className="pb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl mb-4`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800 font-heading">{service.title}</CardTitle>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300 text-white`}
                      disabled={service.comingSoon}
                    >
                      {service.comingSoon ? (
                        <span className="cursor-not-allowed opacity-70">Bientôt disponible</span>
                      ) : (
                        <Link href="/contact">
                          Demander un devis <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-gray-800">Technologies Utilisées</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous utilisons les dernières technologies pour garantir performance, sécurité et évolutivité
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Next.js", color: "bg-black text-white" },
              { name: "React", color: "bg-blue-500 text-white" },
              { name: "Supabase", color: "bg-green-500 text-white" },
              { name: "TypeScript", color: "bg-blue-600 text-white" },
              { name: "Tailwind", color: "bg-cyan-500 text-white" },
              { name: "IA (V2)", color: "bg-purple-500 text-white" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${tech.color} rounded-2xl p-4 text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-gray-800">Notre Processus</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une méthodologie éprouvée pour garantir le succès de votre projet
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Analyse",
                description: "Étude approfondie de vos besoins et objectifs",
              },
              {
                step: "02",
                title: "Conception",
                description: "Création des maquettes et architecture technique",
              },
              {
                step: "03",
                title: "Développement",
                description: "Codage et intégration avec tests continus",
              },
              {
                step: "04",
                title: "Livraison",
                description: "Déploiement et formation pour une prise en main optimale",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-bold text-xl mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 font-heading">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold font-heading">Prêt à démarrer votre projet ?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé gratuit
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold"
              >
                <Link href="/contact">
                  Demander un devis <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-xl bg-transparent"
              >
                <Link href="/offres">Voir nos offres</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
