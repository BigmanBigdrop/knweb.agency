"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Eye,
  Globe,
  Smartphone,
  Code,
  Palette,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", name: "Tous les projets", icon: Globe },
    { id: "vitrine", name: "Sites Vitrines", icon: Globe },
    { id: "webapp", name: "Applications Web", icon: Code },
    { id: "mobile", name: "Mobile", icon: Smartphone },
    { id: "design", name: "Design", icon: Palette },
  ];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Moderne",
      category: "webapp",
      description:
        "Plateforme e-commerce complète avec gestion des stocks, paiements en ligne et tableau de bord administrateur.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Next.js", "Supabase", "Stripe", "Tailwind CSS"],
      features: [
        "Paiement sécurisé",
        "Gestion des stocks",
        "Dashboard admin",
        "Mobile responsive",
      ],
      status: "Terminé",
      client: "Boutique Fashion CI",
      year: "2024",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Site Vitrine Restaurant",
      category: "vitrine",
      description:
        "Site vitrine élégant pour un restaurant avec menu interactif, réservations en ligne et galerie photos.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
      features: [
        "Menu interactif",
        "Réservations",
        "Galerie photos",
        "Localisation",
      ],
      status: "Terminé",
      client: "Restaurant Le Palmier",
      year: "2023",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 3,
      title: "Application de Gestion",
      category: "webapp",
      description:
        "Système de gestion interne pour PME avec CRM, facturation et suivi des projets.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "Node.js", "PostgreSQL", "Chart.js"],
      features: ["CRM intégré", "Facturation", "Suivi projets", "Rapports"],
      status: "En cours",
      client: "Entreprise Confidentielle",
      year: "2024",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      title: "Portfolio Créatif",
      category: "vitrine",
      description:
        "Portfolio interactif pour un designer graphique avec animations avancées et galerie dynamique.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Next.js", "Three.js", "GSAP", "Tailwind CSS"],
      features: [
        "Animations 3D",
        "Galerie interactive",
        "Contact form",
        "Blog intégré",
      ],
      status: "Terminé",
      client: "Designer Indépendant",
      year: "2023",
      color: "from-green-500 to-teal-500",
    },
    {
      id: 5,
      title: "App Mobile (Bientôt)",
      category: "mobile",
      description:
        "Application mobile native pour la gestion de commandes et livraisons - En développement.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React Native", "Expo", "Supabase", "Maps API"],
      features: [
        "Géolocalisation",
        "Notifications push",
        "Paiement mobile",
        "Suivi temps réel",
      ],
      status: "Bientôt",
      client: "Startup Logistique",
      year: "2024",
      color: "from-amber-500 to-yellow-500",
    },
    {
      id: 6,
      title: "Refonte UX/UI",
      category: "design",
      description:
        "Refonte complète de l'interface utilisateur d'une application existante pour améliorer l'expérience.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Figma", "Adobe XD", "Principle", "Zeplin"],
      features: ["Audit UX", "Wireframes", "Prototypes", "Design system"],
      status: "Terminé",
      client: "Fintech Locale",
      year: "2023",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

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
              Nos Projets
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Découvrez nos réalisations et les solutions digitales que nous
              avons créées pour nos clients. Chaque projet reflète notre
              engagement envers l'excellence et l'innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/20"
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.name}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid - remplacé par un indicateur visuel */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-center min-h-[300px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="max-w-xl mx-auto text-center bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-10 border-4 border-purple-200 dark:border-purple-800 backdrop-blur-lg"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ rotate: -20 }}
                  animate={{ rotate: 20 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="inline-block"
                >
                  <Sparkles className="w-16 h-16 text-purple-500 drop-shadow-lg" />
                </motion.div>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-amber-500 bg-clip-text text-transparent"
              >
                Nos projets arrivent très bientôt !
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="text-lg text-gray-700 dark:text-gray-300 mb-6"
              >
                Nous mettons la dernière touche à la présentation de tous les
                projets sur lesquels nous avons travaillé.
                <br />
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  Restez connectés : de belles réalisations seront dévoilées
                  dans de très brefs délais !
                </span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.7 }}
                className="flex justify-center"
              >
                {/* Illustration SVG fantaisiste */}
                <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
                  <ellipse
                    cx="60"
                    cy="70"
                    rx="50"
                    ry="10"
                    fill="#A78BFA"
                    opacity="0.2"
                  />
                  <circle
                    cx="60"
                    cy="40"
                    r="30"
                    fill="#6366F1"
                    opacity="0.15"
                  />
                  <path
                    d="M40 40 Q60 10 80 40"
                    stroke="#6366F1"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle cx="60" cy="40" r="8" fill="#F59E42" />
                  <text
                    x="60"
                    y="60"
                    textAnchor="middle"
                    fontSize="14"
                    fill="#6366F1"
                    fontWeight="bold"
                  >
                    Bientôt !
                  </text>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ...le reste de la page reste inchangé... */}
    </div>
  );
}
