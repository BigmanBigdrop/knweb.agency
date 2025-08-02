"use client";

import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function OffresContent() {
  const offres = [
    {
      title: "Site Vitrine",
      price: "250.000 FCFA",
      description: "Site web professionnel pour présenter votre entreprise",
      features: [
        "Design moderne et responsive",
        "Optimisation SEO incluse",
        "Formulaire de contact",
        "Hébergement 1 an inclus",
        "SSL Certificate",
        "Formation incluse",
      ],
      popular: false,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "E-commerce",
      price: "500.000 FCFA",
      description: "Boutique en ligne complète avec paiements",
      features: [
        "Catalogue produits illimité",
        "Panier et commandes",
        "Paiements Mobile Money",
        "Gestion des stocks",
        "Interface d'administration",
        "Analytics inclus",
      ],
      popular: true,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Application Web",
      price: "Sur devis",
      description: "Solution sur mesure pour vos besoins spécifiques",
      features: [
        "Développement sur mesure",
        "Base de données sécurisée",
        "API intégrations",
        "Interface utilisateur avancée",
        "Tableaux de bord",
        "Support technique",
      ],
      popular: false,
      color: "from-purple-500 to-pink-500",
    },
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
              Tarifs &
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {" "}
                Offres
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des prix transparents pour des solutions web de qualité en Côte
              d'Ivoire. Choisissez l'offre qui correspond à vos besoins.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {offres.map((offre, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {offre.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Le plus populaire
                    </div>
                  </div>
                )}

                <Card
                  className={`h-full bg-card/50 backdrop-blur-sm border-border/50 ${
                    offre.popular ? "border-primary/50 scale-105" : ""
                  } hover:border-primary/20 transition-all duration-300`}
                >
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold text-foreground mb-2">
                      {offre.title}
                    </CardTitle>
                    <div
                      className={`text-4xl font-bold bg-gradient-to-r ${offre.color} bg-clip-text text-transparent mb-4`}
                    >
                      {offre.price}
                    </div>
                    <p className="text-muted-foreground">{offre.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {offre.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      asChild
                      className={`w-full bg-gradient-to-r ${offre.color} hover:opacity-90`}
                      size="lg"
                    >
                      <Link href="/contact">
                        Choisir cette offre{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
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
              Besoin d'un Devis Personnalisé ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Chaque projet est unique. Contactez-nous pour une solution sur
              mesure !
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
            >
              <Link href="/contact">
                Demander un Devis Gratuit{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
