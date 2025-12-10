"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Users,
  Code,
  Database,
  Zap,
  ArrowRight,
  Calendar,
  Target,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FloatingElements } from "@/components/ui/floating-elements";
import Image from "next/image";

export default function PortfolioPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({
    0: 0,
    1: 0,
    2: 0,
  });
  const projects = [
    {
      name: "Toreb - Digitalisation de Restaurants",
      description: "Logiciel de gestion et digitalisation de restaurants avec tableaux de bord analytiques, gestion multi-utilisateurs et rapports en temps réel",
      longDescription: "Solution tout-en-un pour les restaurants permettant de digitaliser leurs opérations quotidiennes, gérer les commandes, suivre les performances et prendre des décisions basées sur des données concrètes.",
      link: "https://toreb.vercel.app",
      technologies: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS"],
      images: ["/projects/toreb-1.png", "/projects/toreb-2.png"],
      features: [
        "Tableaux de bord analytiques en temps réel",
        "Gestion multi-utilisateurs avec permissions",
        "Rapports automatisés personnalisables",
        "Interface responsive et moderne",
        "Synchronisation en temps réel",
      ],
      category: "Restaurant Tech",
      year: "2024",
      status: "En production",
      image: "/projects/toreb.jpg",
      impact: {
        users: "Utilisé par plusieurs restaurants",
        performance: "Temps de chargement < 1s",
        availability: "99.9% uptime",
      },
    },
    {
      name: "Plateforme RH Sur-Mesure",
      description: "Système de gestion des ressources humaines développé pour automatiser le recrutement, l'onboarding et la gestion des employés",
      longDescription: "Plateforme complète permettant aux PME de digitaliser entièrement leur processus RH, du recrutement à la gestion des performances.",
      technologies: ["Next.js", "PostgreSQL", "React", "TypeScript", "Node.js"],
      images: ["/projects/rh-1.png", "/projects/rh-2.png"],
      features: [
        "Module de recrutement et suivi des candidatures",
        "Système d'onboarding automatisé",
        "Gestion des congés et absences",
        "Évaluation de performance",
        "Base de données employés sécurisée",
      ],
      category: "Application Web",
      year: "2024",
      status: "En production",
      image: "/projects/rh-platform.jpg",
      impact: {
        users: "Gestion de 100+ employés",
        time: "Réduction de 70% du temps administratif",
        automation: "80% des processus automatisés",
      },
    },
    {
      name: "Site Vitrine Premium",
      description: "Site web professionnel pour auteurs et conférenciers avec système de réservation intégré et gestion de contenu",
      longDescription: "Solution élégante permettant aux professionnels de présenter leur travail, gérer leurs événements et recevoir des réservations directement en ligne.",
      technologies: ["Next.js", "React", "Tailwind CSS", "Supabase", "Stripe"],
      features: [
        "Design moderne et responsive",
        "Système de réservation en ligne",
        "Gestion de contenu dynamique",
        "Intégration paiement Stripe",
        "SEO optimisé pour Google",
      ],
      category: "Site Vitrine",
      year: "2024",
      status: "En production",
      image: "/projects/author-site.jpg",
      impact: {
        seo: "Position #1 sur mots-clés ciblés",
        conversion: "Taux de conversion de 12%",
        performance: "Score Performance 95/100",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30 dark:from-background dark:via-purple-950/20 dark:to-blue-950/20 relative overflow-hidden">
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
              Nos Réalisations
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Portfolio de Projets
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Découvrez nos solutions déployées et fonctionnelles. Chaque projet reflète notre expertise en développement web moderne et notre engagement envers l'excellence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
                <Code className="w-5 h-5 text-purple-600" />
                <span className="font-semibold">Code 100% personnalisé</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Technologies modernes</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-semibold">En production</span>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className={`grid ${index % 2 === 0 ? "lg:grid-cols-2" : "lg:grid-cols-2"} gap-8`}>
                    {/* Content */}
                    <div className={`p-8 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <Badge className="mb-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                              {project.category}
                            </Badge>
                            <CardTitle className="text-3xl font-bold font-heading mb-2">
                              {project.name}
                            </CardTitle>
                            <CardDescription className="text-lg">
                              {project.description}
                            </CardDescription>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="bg-white dark:bg-gray-800"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {project.longDescription}
                        </p>
                      </CardHeader>

                      <CardContent className="p-0">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5 text-purple-600" />
                          Fonctionnalités clés
                        </h3>
                        <ul className="space-y-2 mb-6">
                          {project.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-4 rounded-lg mb-6">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            Impact & Résultats
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {Object.entries(project.impact).map(([key, value], impactIndex) => (
                              <div key={impactIndex} className="text-sm">
                                <div className="font-medium text-foreground">{value}</div>
                                <div className="text-xs text-muted-foreground capitalize">
                                  {key.replace("_", " ")}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {project.year}
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {project.status}
                          </Badge>
                        </div>

                        {project.link && (
                          <div className="mt-6">
                            <Button
                              asChild
                              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white group"
                            >
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                Voir le projet en ligne
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </div>

                    {/* Image Carousel */}
                    <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 flex items-center justify-center p-4 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      {project.images ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
                            <Image
                              src={project.images[currentImageIndex[index] || 0]}
                              alt={`${project.name} - Capture ${(currentImageIndex[index] || 0) + 1}`}
                              fill
                              className="object-cover"
                              priority={index === 0}
                            />
                          </div>

                          {/* Navigation Arrows */}
                          {project.images.length > 1 && (
                            <>
                              <button
                                onClick={() => {
                                  const newIndex = {...currentImageIndex};
                                  newIndex[index] = (currentImageIndex[index] || 0) > 0
                                    ? (currentImageIndex[index] || 0) - 1
                                    : project.images!.length - 1;
                                  setCurrentImageIndex(newIndex);
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors z-10"
                                aria-label="Image précédente"
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  const newIndex = {...currentImageIndex};
                                  newIndex[index] = (currentImageIndex[index] || 0) < project.images!.length - 1
                                    ? (currentImageIndex[index] || 0) + 1
                                    : 0;
                                  setCurrentImageIndex(newIndex);
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors z-10"
                                aria-label="Image suivante"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>

                              {/* Dots Indicator */}
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {project.images.map((_, imgIndex) => (
                                  <button
                                    key={imgIndex}
                                    onClick={() => {
                                      const newIndex = {...currentImageIndex};
                                      newIndex[index] = imgIndex;
                                      setCurrentImageIndex(newIndex);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                      (currentImageIndex[index] || 0) === imgIndex
                                        ? "bg-white w-8"
                                        : "bg-white/50 hover:bg-white/75"
                                    }`}
                                    aria-label={`Aller à l'image ${imgIndex + 1}`}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                            {project.category === "SaaS" && <Database className="w-16 h-16 text-white" />}
                            {project.category === "Application Web" && <Users className="w-16 h-16 text-white" />}
                            {project.category === "Site Vitrine" && <Code className="w-16 h-16 text-white" />}
                          </div>
                          <p className="text-lg font-semibold text-muted-foreground">
                            {project.category}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Solution en production
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
                  Prêt à lancer votre projet ?
                </h2>
                <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                  Rejoignez nos clients satisfaits et transformez votre vision en une solution digitale performante et évolutive.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 group"
                  >
                    <Link href="/contact">
                      Démarrer mon projet
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10"
                  >
                    <Link href="/offres">Découvrir nos offres</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}