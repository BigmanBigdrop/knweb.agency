"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  Tag,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { CTAButton } from "@/components/cta-button";
import { FloatingElements } from "@/components/ui/floating-elements";
import Link from "next/link";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "Tous les articles", count: 12 },
    { id: "web-dev", name: "Développement Web", count: 5 },
    { id: "design", name: "Design & UX", count: 3 },
    { id: "business", name: "Business Digital", count: 2 },
    { id: "tutorials", name: "Tutoriels", count: 2 },
  ];

  const featuredPost = {
    id: 1,
    title: "L'avenir du développement web en Afrique : Tendances 2025",
    excerpt:
      "Découvrez les technologies émergentes qui transforment le paysage digital africain et comment les entreprises peuvent en tirer parti.",
    content:
      "Le développement web en Afrique connaît une croissance exceptionnelle...",
    author: "KN Web Agency",
    date: "2025-07-14",
    readTime: "8 min",
    category: "web-dev",
    image: "/placeholder.svg?height=400&width=800",
    tags: ["Next.js", "Afrique", "Innovation", "2025"],
    featured: true,
  };

  const blogPosts = [
    {
      id: 2,
      title: "Comment optimiser le SEO de votre site web en 2024",
      excerpt:
        "Guide complet pour améliorer votre référencement naturel et attirer plus de clients.",
      author: "KN Web Agency",
      date: "2024-01-10",
      readTime: "6 min",
      category: "web-dev",
      image: "/placeholder.svg?height=250&width=400",
      tags: ["SEO", "Marketing", "Google"],
    },
    {
      id: 3,
      title: "Les principes du design UX pour les PME africaines",
      excerpt:
        "Créer des interfaces utilisateur adaptées au contexte local et aux besoins spécifiques.",
      author: "KN Web Agency",
      date: "2024-01-05",
      readTime: "5 min",
      category: "design",
      image: "/placeholder.svg?height=250&width=400",
      tags: ["UX", "Design", "PME"],
    },
    {
      id: 4,
      title: "Pourquoi votre entreprise a besoin d'une présence digitale",
      excerpt:
        "L'importance de la transformation digitale pour les entreprises ivoiriennes.",
      author: "KN Web Agency",
      date: "2023-12-28",
      readTime: "4 min",
      category: "business",
      image: "/placeholder.svg?height=250&width=400",
      tags: ["Digital", "Business", "Transformation"],
    },
    {
      id: 5,
      title: "Tutoriel : Créer son premier site avec Next.js",
      excerpt:
        "Guide pas à pas pour développeurs débutants souhaitant maîtriser Next.js.",
      author: "KN Web Agency",
      date: "2023-12-20",
      readTime: "12 min",
      category: "tutorials",
      image: "/placeholder.svg?height=250&width=400",
      tags: ["Next.js", "React", "Tutoriel"],
    },
    {
      id: 6,
      title: "Les erreurs à éviter lors de la création de votre site web",
      excerpt:
        "Conseils pratiques pour éviter les pièges courants du développement web.",
      author: "KN Web Agency",
      date: "2023-12-15",
      readTime: "7 min",
      category: "web-dev",
      image: "/placeholder.svg?height=250&width=400",
      tags: ["Conseils", "Erreurs", "Développement"],
    },
    {
      id: 7,
      title: "L'importance de la vitesse de chargement pour votre business",
      excerpt:
        "Impact de la performance web sur les conversions et le référencement.",
      author: "KN Web Agency",
      date: "2023-12-10",
      readTime: "5 min",
      category: "business",
      image: "/placeholder.svg?height=250&width=400",
      tags: ["Performance", "Business", "Conversion"],
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30 dark:from-background dark:via-purple-950/20 dark:to-blue-950/20 pt-20 relative overflow-hidden">
      <FloatingElements />

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Blog & Ressources
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Découvrez nos articles, tutoriels et conseils pour réussir votre
              transformation digitale. Restez informé des dernières tendances du
              web et du digital en Afrique.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl bg-white/80 backdrop-blur-sm"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  variant={
                    activeCategory === category.id ? "default" : "outline"
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/20"
                  }`}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-purple-600 animate-bounce" />
              <h2 className="text-2xl font-bold font-heading text-foreground">
                Article à la Une
              </h2>
            </div>
            <Card className="overflow-hidden glass border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover min-h-[300px] hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      Article vedette
                    </Badge>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString("fr-FR")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-foreground font-heading leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CTAButton
                    ctaName="featured-article-read"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-300 w-fit"
                  >
                    Lire l'article complet
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </CTAButton>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Bloc de révision créatif à la place des articles */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl flex items-center justify-center min-h-[350px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="max-w-xl mx-auto text-center bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-10 border-4 border-blue-200 dark:border-blue-800 backdrop-blur-lg"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 10 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                <TrendingUp className="w-16 h-16 text-blue-500 drop-shadow-lg animate-pulse" />
              </motion.div>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent"
            >
              La section "Derniers articles" est en cours de révision !
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-lg text-gray-700 dark:text-gray-300 mb-6"
            >
              Nous travaillons à vous proposer des contenus encore plus
              pertinents, inspirants et utiles pour votre réussite digitale.
              <br />
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Restez connectés, la nouvelle version arrive très bientôt avec
                les meilleures infos pour nos clients !
              </span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="flex justify-center"
            >
              {/* Illustration SVG créative */}
              <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
                <ellipse
                  cx="60"
                  cy="70"
                  rx="50"
                  ry="10"
                  fill="#60A5FA"
                  opacity="0.2"
                />
                <circle cx="60" cy="40" r="30" fill="#6366F1" opacity="0.15" />
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
                  fill="#2563EB"
                  fontWeight="bold"
                >
                  Bientôt !
                </text>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-muted/30 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4 font-heading text-foreground">
                  Restez informé des dernières tendances
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Recevez nos meilleurs articles, conseils et ressources
                  directement dans votre boîte mail. Pas de spam, que du contenu
                  de qualité.
                </p>
                <NewsletterSignup source="blog" className="max-w-md mx-auto" />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Besoin d'aide pour votre projet ?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Nos articles vous inspirent ? Passons à l'action ! Contactez-nous
              pour transformer vos idées en réalité digitale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton
                ctaName="blog-cta-start-project"
                asChild
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold"
              >
                <Link href="/contact">
                  Démarrer un projet <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </CTAButton>
              <CTAButton
                ctaName="blog-cta-discover-services"
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-xl bg-transparent"
              >
                <Link href="/services">Découvrir nos services</Link>
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
