"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Star,
  ArrowRight,
  Clock,
  Users,
  Zap,
  Shield,
  Code,
  Palette,
  Search,
  Smartphone,
  BarChart3,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { FloatingElements } from "@/components/ui/floating-elements";

export default function OffresPage() {
  const [remainingSlots, setRemainingSlots] = useState(7);

  useEffect(() => {
    // Simuler la récupération des places restantes depuis Supabase
    const fetchRemainingSlots = async () => {
      // TODO: Remplacer par un vrai appel Supabase
      setRemainingSlots(Math.floor(Math.random() * 10) + 1);
    };
    fetchRemainingSlots();
  }, []);

  const offers = [
    {
      name: "Starter",
      subtitle: "Parfait pour débuter",
      originalPrice: "90 000",
      currentPrice: "49 000",
      currency: "FCFA",
      description:
        "Site vitrine professionnel avec les fonctionnalités essentielles",
      features: [
        "Site vitrine responsive (3-5 pages)",
        "Design moderne et professionnel",
        "Formulaire de contact",
        "Optimisation SEO de base",
        "Hébergement 1 an inclus",
        "Certificat SSL gratuit",
        "Support technique 3 mois",
      ],
      popular: true,
      limited: true,
      remainingSlots: remainingSlots,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      name: "Pro",
      subtitle: "Pour les entreprises ambitieuses",
      originalPrice: "199 000",
      currentPrice: "100 000",
      currency: "FCFA",
      description: "Application web complète avec fonctionnalités avancées",
      features: [
        "Application web sur mesure",
        "Interface d'administration",
        "Base de données sécurisée",
        "Gestion des utilisateurs",
        "Tableaux de bord analytiques",
        "Intégrations API tierces",
        "Optimisation SEO avancée",
        "Maintenance 3 mois incluse",
        "Formation utilisateur",
      ],
      popular: false,
      limited: false,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      name: "Sur-mesure",
      subtitle: "Solutions personnalisées",
      currentPrice: "Sur devis",
      currency: "",
      description:
        "Solution entièrement personnalisée selon vos besoins spécifiques",
      features: [
        "Analyse approfondie des besoins",
        "Architecture technique sur mesure",
        "Développement personnalisé",
        "Intégrations complexes",
        "Scalabilité enterprise",
        "Support prioritaire",
        "Formation équipe complète",
        "Maintenance évolutive",
        "Accompagnement long terme",
      ],
      popular: false,
      limited: false,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Consultation gratuite",
      description: "Analyse de vos besoins et définition du projet",
      duration: "30-60 min",
      icon: MessageCircle,
    },
    {
      step: 2,
      title: "Conception & Design",
      description: "Création des maquettes et validation du design",
      duration: "2-3 jours",
      icon: Palette,
    },
    {
      step: 3,
      title: "Développement",
      description: "Codage et intégration de toutes les fonctionnalités",
      duration: "3-5 jours",
      icon: Code,
    },
    {
      step: 4,
      title: "Tests & Optimisation",
      description: "Vérification complète et optimisation des performances",
      duration: "1-2 jours",
      icon: Search,
    },
    {
      step: 5,
      title: "Livraison & Formation",
      description: "Mise en ligne et formation à la gestion du site",
      duration: "1 jour",
      icon: Zap,
    },
  ];

  const technologies = [
    {
      name: "Next.js 15",
      description: "Framework React ultra-performant",
      icon: Code,
    },
    {
      name: "TypeScript",
      description: "Développement sécurisé et maintenable",
      icon: Shield,
    },
    {
      name: "Tailwind CSS",
      description: "Design moderne et responsive",
      icon: Palette,
    },
    {
      name: "Supabase",
      description: "Base de données et authentification",
      icon: BarChart3,
    },
    {
      name: "Vercel",
      description: "Hébergement ultra-rapide",
      icon: Zap,
    },
    {
      name: "Framer Motion",
      description: "Animations fluides et modernes",
      icon: Smartphone,
    },
  ];

  const testimonials = [
    {
      name: "Marie Kouassi",
      company: "Boutique Élégance",
      rating: 5,
      text: "KN Web Agency a transformé mon business ! Mon site e-commerce génère maintenant 40% de mes ventes.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Jean-Baptiste Traoré",
      company: "Cabinet Juridique",
      rating: 5,
      text: "Professionnalisme exemplaire. Mon site attire maintenant 3x plus de clients qu'avant.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Fatou Diallo",
      company: "Restaurant Le Baobab",
      rating: 5,
      text: "Système de réservation parfait ! Mes clients adorent la simplicité et l'élégance du site.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30 dark:from-background dark:via-purple-950/20 dark:to-blue-950/20 pt-20">
      <FloatingElements />

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
              Nos Offres
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des solutions adaptées à chaque budget et chaque ambition.
              Choisissez l'offre qui correspond le mieux à vos besoins.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <Tabs defaultValue="pricing" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-12 h-14 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <TabsTrigger value="pricing" className="text-sm font-medium">
            Tarifs
          </TabsTrigger>
          <TabsTrigger value="process" className="text-sm font-medium">
            Processus
          </TabsTrigger>
          <TabsTrigger value="tech" className="text-sm font-medium">
            Technologies
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="text-sm font-medium">
            Témoignages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pricing">
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-3 gap-8">
                {offers.map((offer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <Card
                      className={`h-full hover:shadow-2xl transition-all duration-300 border-2 ${
                        offer.borderColor
                      } glass relative overflow-hidden ${
                        offer.popular ? "scale-105 lg:scale-110" : ""
                      }`}
                    >
                      {offer.popular && (
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-2 font-semibold">
                          <Star className="inline w-4 h-4 mr-1" />
                          Plus populaire
                        </div>
                      )}

                      {offer.limited && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-red-500 text-white">
                            <Clock className="w-3 h-3 mr-1" />
                            Offre limitée
                          </Badge>
                        </div>
                      )}

                      <CardHeader
                        className={`${offer.popular ? "pt-12" : "pt-8"} pb-6`}
                      >
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${offer.color} rounded-2xl mb-4`}
                        >
                          {index === 0 && (
                            <Zap className="w-8 h-8 text-white" />
                          )}
                          {index === 1 && (
                            <Users className="w-8 h-8 text-white" />
                          )}
                          {index === 2 && (
                            <Star className="w-8 h-8 text-white" />
                          )}
                        </div>

                        <CardTitle className="text-2xl font-bold text-gray-800 font-heading">
                          {offer.name}
                        </CardTitle>
                        <p className="text-gray-600 mb-4">{offer.subtitle}</p>

                        <div className="space-y-2">
                          {offer.originalPrice && (
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-lg text-gray-500 line-through">
                                {offer.originalPrice} {offer.currency}
                              </span>
                            </div>
                          )}
                          <div className="flex items-baseline justify-center gap-1">
                            <span
                              className={`text-4xl font-bold bg-gradient-to-r ${offer.color} bg-clip-text text-transparent`}
                            >
                              {offer.currentPrice}
                            </span>
                            {offer.currency && (
                              <span className="text-lg text-gray-600">
                                {offer.currency}
                              </span>
                            )}
                          </div>
                        </div>

                        {offer.limited && (
                          <div className="text-center mt-4">
                            <Badge
                              variant="outline"
                              className="border-red-200 text-red-600"
                            >
                              Plus que {offer.remainingSlots} places disponibles
                            </Badge>
                          </div>
                        )}

                        <p className="text-gray-600 text-center mt-4">
                          {offer.description}
                        </p>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <ul className="space-y-3 mb-8">
                          {offer.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-start space-x-3"
                            >
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          asChild
                          className={`w-full bg-gradient-to-r ${offer.color} hover:shadow-lg transition-all duration-300 text-white py-3 text-lg font-semibold`}
                        >
                          <Link href="/contact">
                            {offer.name === "Sur-mesure"
                              ? "Demander un devis"
                              : "Choisir cette offre"}
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Process Tab */}
        <TabsContent value="process">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                Notre Processus en 5 Étapes
              </h2>
              <p className="text-muted-foreground">
                Une méthode éprouvée pour garantir votre succès
              </p>
            </motion.div>

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <EnhancedCard>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground mb-2">
                            {step.description}
                          </p>
                          <Badge variant="secondary">⏱️ {step.duration}</Badge>
                        </div>
                        <step.icon className="w-8 h-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </EnhancedCard>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Technologies Tab */}
        <TabsContent value="tech">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Technologies Modernes</h2>
              <p className="text-muted-foreground">
                Les outils les plus avancés pour votre succès
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <EnhancedCard>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                          <tech.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{tech.name}</h3>
                          <p className="text-muted-foreground">
                            {tech.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </EnhancedCard>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Témoignages Clients</h2>
              <p className="text-muted-foreground">
                Ce que disent nos clients satisfaits
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <EnhancedCard>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </EnhancedCard>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-gray-800">
              Comparaison des Offres
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tableau détaillé pour vous aider à choisir l'offre qui correspond
              le mieux à vos besoins
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Fonctionnalités
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Starter
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">Pro</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Sur-mesure
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    feature: "Nombre de pages",
                    starter: "3-5",
                    pro: "Illimité",
                    custom: "Illimité",
                  },
                  {
                    feature: "Design responsive",
                    starter: "✓",
                    pro: "✓",
                    custom: "✓",
                  },
                  {
                    feature: "Optimisation SEO",
                    starter: "Base",
                    pro: "Avancée",
                    custom: "Expert",
                  },
                  {
                    feature: "Base de données",
                    starter: "✗",
                    pro: "✓",
                    custom: "✓",
                  },
                  {
                    feature: "Interface admin",
                    starter: "✗",
                    pro: "✓",
                    custom: "✓",
                  },
                  {
                    feature: "Intégrations API",
                    starter: "✗",
                    pro: "✓",
                    custom: "✓",
                  },
                  {
                    feature: "Support technique",
                    starter: "3 mois",
                    pro: "3 mois",
                    custom: "Illimité",
                  },
                  { feature: "Formation", starter: "✗", pro: "✓", custom: "✓" },
                  {
                    feature: "Délai de livraison",
                    starter: "5 jours",
                    pro: "2-3 semaines",
                    custom: "Variable",
                  },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {row.starter}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {row.pro}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {row.custom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-gray-800">
              Questions Fréquentes
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Combien de temps faut-il pour réaliser mon projet ?",
                answer:
                  "Pour l'offre Starter : 5 jours maximum. Pour l'offre Pro : 2-3 semaines. Pour les projets sur-mesure : le délai varie selon la complexité.",
              },
              {
                question: "Que se passe-t-il après la livraison ?",
                answer:
                  "Nous offrons un support technique gratuit pendant 3 mois, incluant les corrections de bugs et les mises à jour de sécurité.",
              },
              {
                question: "Puis-je modifier mon site après la livraison ?",
                answer:
                  "Oui, nous proposons des services de maintenance et d'évolution. Les modifications mineures sont incluses dans le support, les évolutions majeures font l'objet d'un devis.",
              },
              {
                question: "L'hébergement est-il inclus ?",
                answer:
                  "Oui, l'hébergement est inclus pendant 1 an pour toutes nos offres. Nous utilisons des serveurs performants et sécurisés.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Prêt à choisir votre offre ?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Contactez-nous dès maintenant pour discuter de votre projet et
              bénéficier de nos tarifs préférentiels
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold"
              >
                <Link href="/contact">
                  Commencer mon projet <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-xl bg-transparent"
              >
                <a
                  href="https://wa.me/2250585471688"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
