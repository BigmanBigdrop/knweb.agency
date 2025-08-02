"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Zap,
  Smartphone,
  Palette,
  Database,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ServicesContent() {
  const services = [
    {
      icon: Globe,
      title: "Site Vitrine Professionnel",
      description:
        "Site web moderne et responsive pour présenter votre entreprise",
      features: [
        "Design personnalisé et moderne",
        "Responsive (mobile, tablette, desktop)",
        "Optimisation SEO incluse",
        "Formulaire de contact intégré",
        "Hébergement sécurisé inclus",
        "Maintenance et mises à jour",
      ],
      price: "À partir de 250.000 FCFA",
      duration: "2-3 semaines",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Site E-commerce",
      description: "Boutique en ligne complète avec système de paiement",
      features: [
        "Catalogue produits illimité",
        "Panier et commandes en ligne",
        "Paiements sécurisés (Mobile Money, Cartes)",
        "Gestion des stocks automatique",
        "Interface d'administration",
        "Analytics et rapports de ventes",
      ],
      price: "À partir de 500.000 FCFA",
      duration: "4-6 semaines",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Smartphone,
      title: "Application Web",
      description: "Application web sur mesure pour vos besoins spécifiques",
      features: [
        "Développement sur mesure",
        "Interface utilisateur intuitive",
        "Base de données sécurisée",
        "API et intégrations tierces",
        "Tableaux de bord analytiques",
        "Évolutivité garantie",
      ],
      price: "Sur devis personnalisé",
      duration: "6-12 semaines",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Palette,
      title: "Refonte & Modernisation",
      description: "Donnez une nouvelle vie à votre site web existant",
      features: [
        "Audit complet de l'existant",
        "Nouveau design moderne",
        "Amélioration des performances",
        "Migration sécurisée des données",
        "Optimisation SEO avancée",
        "Formation à la nouvelle interface",
      ],
      price: "À partir de 200.000 FCFA",
      duration: "3-4 semaines",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Database,
      title: "Optimisation SEO",
      description: "Améliorez votre visibilité sur Google et autres moteurs",
      features: [
        "Audit SEO complet",
        "Optimisation technique",
        "Recherche de mots-clés stratégiques",
        "Création de contenu optimisé",
        "Link building local",
        "Rapports mensuels détaillés",
      ],
      price: "À partir de 150.000 FCFA/mois",
      duration: "Service mensuel",
      color: "from-teal-500 to-blue-500",
    },
    {
      icon: Shield,
      title: "Maintenance & Support",
      description: "Support technique et maintenance continue de votre site",
      features: [
        "Mises à jour de sécurité",
        "Sauvegarde automatique quotidienne",
        "Monitoring 24/7",
        "Support technique prioritaire",
        "Corrections de bugs incluses",
        "Hébergement haute performance",
      ],
      price: "À partir de 25.000 FCFA/mois",
      duration: "Service mensuel",
      color: "from-gray-500 to-slate-500",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consultation Gratuite",
      description: "Échange pour comprendre vos besoins et objectifs",
      duration: "30-60 min",
    },
    {
      step: "02",
      title: "Devis Personnalisé",
      description: "Proposition détaillée avec timeline et tarification",
      duration: "24-48h",
    },
    {
      step: "03",
      title: "Conception & Design",
      description: "Création des maquettes et validation du design",
      duration: "3-5 jours",
    },
    {
      step: "04",
      title: "Développement",
      description: "Codage et intégration de toutes les fonctionnalités",
      duration: "1-8 semaines",
    },
    {
      step: "05",
      title: "Tests & Optimisation",
      description: "Tests complets et optimisation des performances",
      duration: "2-3 jours",
    },
    {
      step: "06",
      title: "Mise en Ligne",
      description: "Déploiement et formation à la gestion",
      duration: "1 jour",
    },
  ];

  const technologies = [
    { name: "Next.js", description: "Framework React performant", icon: "⚡" },
    {
      name: "TypeScript",
      description: "Code sécurisé et maintenable",
      icon: "🔒",
    },
    {
      name: "Tailwind CSS",
      description: "Design moderne et responsive",
      icon: "🎨",
    },
    { name: "Supabase", description: "Base de données moderne", icon: "🗄️" },
    { name: "Vercel", description: "Hébergement ultra-rapide", icon: "🚀" },
    { name: "Framer Motion", description: "Animations fluides", icon: "✨" },
  ];

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading text-foreground">
              Nos Services Web
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {" "}
                Premium
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Solutions digitales complètes pour propulser votre business en
              Côte d'Ivoire. De la création de sites web aux applications sur
              mesure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                <Link href="/contact">
                  Devis Gratuit <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/projets">Voir nos Réalisations</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">
              Nos Expertises
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Chaque projet est unique. Nous adaptons nos services à vos besoins
              spécifiques pour garantir votre succès digital.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 group">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground font-heading">
                      {service.title}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">
                          Prix:
                        </span>
                        <span className="text-lg font-bold text-primary">
                          {service.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">
                          Délai:
                        </span>
                        <span className="text-sm text-foreground">
                          {service.duration}
                        </span>
                      </div>
                    </div>

                    <Button asChild className="w-full mt-6" variant="outline">
                      <Link href="/contact">Demander un Devis</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-purple-600/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">
              Notre Processus de Travail
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Méthodologie éprouvée pour garantir la réussite de votre projet
              web
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-primary to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground font-heading">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-2">{step.description}</p>
                <span className="text-sm text-primary font-medium">
                  {step.duration}
                </span>
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
              Technologies Modernes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nous utilisons les dernières technologies pour créer des sites web
              rapides, sécurisés et évolutifs
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
              Prêt à Transformer Votre Business ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Démarrons ensemble votre projet digital. Consultation gratuite et
              devis sous 24h !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
              >
                <Link href="/contact">
                  Consultation Gratuite <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href="/offres">Voir nos Tarifs</Link>
              </Button>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm opacity-80">
                📞 Réponse garantie sous 2h • 🚀 Projet lancé en moins d'une
                semaine • ✅ Satisfaction client 100%
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
