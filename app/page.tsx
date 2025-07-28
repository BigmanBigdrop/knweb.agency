"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Smartphone,
  Zap,
  Users,
  Award,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { EnhancedCard } from "@/components/ui/enhanced-card";
import { FloatingElements } from "@/components/ui/floating-elements";
import { CTAButton } from "@/components/cta-button";
import Link from "next/link";
import AnimatedCounter from "@/components/animated-counter";
import SVGAnimation from "@/components/svg-animation";
import { supabase } from "@/lib/supabase";
import { useCTATracking } from "@/components/analytics-tracker";

export default function HomePage() {
  const [remainingSlots, setRemainingSlots] = useState();
  const { trackCTAClick } = useCTATracking();

  useEffect(() => {
    const fetchRemainingSlots = async () => {
      try {
        const { data, error } = await supabase
          .from("starter_offer_slots")
          .select("remaining_slots")
          .single();

        if (data && !error) {
          setRemainingSlots(data.remaining_slots);
        }
      } catch (error) {
        console.error("Error fetching remaining slots:", error);
      }
    };

    fetchRemainingSlots();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30 dark:from-background dark:via-purple-950/20 dark:to-blue-950/20 relative overflow-hidden">
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 l -60 0 l 0 -60 z' fill='none' stroke='%23000000' strokeWidth='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`,
              }}
            />
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 opacity-10">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-purple-500"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="5,5"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 50 50;360 50 50"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          <div className="absolute top-40 right-20 w-16 h-16 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 50 50;-360 50 50"
                  dur="15s"
                  repeatCount="indefinite"
                />
              </polygon>
            </svg>
          </div>

          <div className="absolute bottom-40 left-20 w-12 h-12 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full text-green-500">
              <rect
                x="20"
                y="20"
                width="60"
                height="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 50 50;360 50 50"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>
          </div>
        </div>

        <div className="container -mt-20 mx-auto max-w-7xl px-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Contenu Principal - Centré sur mobile */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Badge Web 2.0 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-end gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse items-center" />
                <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">
                  Le digital nouveau
                </span>
              </motion.div>

              {/* Titre Principal */}
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                >
                  <span className="-ml-2 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                    Think IT,
                  </span>
                  <br />
                  <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-slate-800 dark:text-slate-200">
                    we'll digitalize IT
                  </span>
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-2xl md:text-2xl lg:text-3xl font-medium text-amber-600 dark:text-amber-400"
                >
                  De vos idées à la réalité digitale
                </motion.h2>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Nous accompagnons les PME d'Abidjan dans leur transformation
                digitale avec des solutions sur mesure, performantes et
                accessibles.
              </motion.p>

              {/* Badge Mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 px-4 py-3 rounded-xl border border-orange-200 dark:border-orange-800"
              >
                <Smartphone className="w-5 h-5 text-green-700" />
                <span className="text-lime-500 dark:text-orange-300 font-medium text-sm md:text-base">
                  Développement mobile - Disponible très bientôt !
                </span>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <CTAButton
                  ctaName="hero-demarrer-projet"
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href="/contact">
                    Démarrer mon projet
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CTAButton>

                <CTAButton
                  ctaName="hero-decouvrir-services"
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800 px-8 py-4 rounded-xl transition-all duration-300 group"
                >
                  <Link href="/services">
                    Découvrir nos services
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CTAButton>
              </motion.div>
            </div>

            {/* Illustration SVG Interactive */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative  lg:order-last"
            >
              <div className="relative w-full h-96 md:h-[500px]">
                <svg
                  viewBox="0 0 500 400"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Définitions des gradients */}
                  <defs>
                    <linearGradient
                      id="primaryGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                    <linearGradient
                      id="secondaryGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                    <linearGradient
                      id="accentGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Cercles de fond animés */}
                  <circle
                    cx="400"
                    cy="100"
                    r="60"
                    fill="url(#primaryGradient)"
                    opacity="0.1"
                  >
                    <animate
                      attributeName="r"
                      values="60;80;60"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx="100"
                    cy="300"
                    r="40"
                    fill="url(#secondaryGradient)"
                    opacity="0.1"
                  >
                    <animate
                      attributeName="r"
                      values="40;60;40"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Écran principal - Ordinateur */}
                  <g transform="translate(150, 120)">
                    <rect
                      x="0"
                      y="0"
                      width="200"
                      height="120"
                      rx="8"
                      fill="url(#primaryGradient)"
                      filter="url(#glow)"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.8;1;0.8"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect
                      x="10"
                      y="10"
                      width="180"
                      height="90"
                      rx="4"
                      fill="#1F2937"
                    />

                    {/* Lignes de code animées */}
                    <rect x="20" y="25" width="60" height="3" fill="#3B82F6">
                      <animate
                        attributeName="width"
                        values="60;120;60"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect x="20" y="35" width="80" height="3" fill="#10B981">
                      <animate
                        attributeName="width"
                        values="80;140;80"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect x="20" y="45" width="100" height="3" fill="#F59E0B">
                      <animate
                        attributeName="width"
                        values="100;160;100"
                        dur="3.5s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect x="20" y="55" width="70" height="3" fill="#EF4444">
                      <animate
                        attributeName="width"
                        values="70;130;70"
                        dur="2.8s"
                        repeatCount="indefinite"
                      />
                    </rect>

                    {/* Support */}
                    <rect
                      x="90"
                      y="120"
                      width="20"
                      height="30"
                      fill="#6B7280"
                    />
                    <ellipse cx="100" cy="160" rx="40" ry="8" fill="#6B7280" />
                  </g>

                  {/* Smartphone */}
                  <g transform="translate(80, 180)">
                    <rect
                      x="0"
                      y="0"
                      width="60"
                      height="100"
                      rx="12"
                      fill="url(#secondaryGradient)"
                      filter="url(#glow)"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 30 50;5 30 50;0 30 50"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect
                      x="5"
                      y="15"
                      width="50"
                      height="70"
                      rx="4"
                      fill="#111827"
                    />
                    <circle cx="30" cy="10" r="2" fill="#6B7280" />
                    <rect
                      x="25"
                      y="90"
                      width="10"
                      height="3"
                      rx="1.5"
                      fill="#6B7280"
                    />

                    {/* Contenu mobile animé */}
                    <rect x="10" y="25" width="20" height="2" fill="#3B82F6">
                      <animate
                        attributeName="opacity"
                        values="1;0.3;1"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect x="10" y="30" width="30" height="2" fill="#10B981">
                      <animate
                        attributeName="opacity"
                        values="1;0.3;1"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect x="10" y="35" width="25" height="2" fill="#F59E0B">
                      <animate
                        attributeName="opacity"
                        values="1;0.3;1"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </rect>
                  </g>

                  {/* Tablette */}
                  <g transform="translate(320, 200)">
                    <rect
                      x="0"
                      y="0"
                      width="120"
                      height="80"
                      rx="8"
                      fill="url(#accentGradient)"
                      filter="url(#glow)"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 60 40;-3 60 40;0 60 40"
                        dur="5s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect
                      x="8"
                      y="8"
                      width="104"
                      height="64"
                      rx="4"
                      fill="#0F172A"
                    />
                    <circle cx="60" cy="75" r="3" fill="#6B7280" />

                    {/* Interface tablette */}
                    <rect x="15" y="20" width="40" height="3" fill="#8B5CF6">
                      <animate
                        attributeName="width"
                        values="40;80;40"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect x="15" y="28" width="60" height="3" fill="#06B6D4">
                      <animate
                        attributeName="width"
                        values="60;90;60"
                        dur="2.2s"
                        repeatCount="indefinite"
                      />
                    </rect>
                  </g>

                  {/* Éléments de connexion animés */}
                  <g opacity="0.6">
                    <path
                      d="M 140 240 Q 200 200 250 240"
                      stroke="url(#primaryGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;-10"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path
                      d="M 250 180 Q 300 160 380 240"
                      stroke="url(#secondaryGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;-10"
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>

                  {/* Particules flottantes */}
                  <circle cx="50" cy="80" r="3" fill="#3B82F6" opacity="0.7">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0;10,-10;0,0"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.7;0.3;0.7"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="450" cy="320" r="4" fill="#10B981" opacity="0.6">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0;-15,5;0,0"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0.2;0.6"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="400" cy="50" r="2" fill="#F59E0B" opacity="0.8">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0;5,15;0,0"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.8;0.4;0.8"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Icônes technologiques */}
                  <g transform="translate(50, 50)" opacity="0.4">
                    <circle
                      cx="0"
                      cy="0"
                      r="15"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0;360"
                        dur="10s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text
                      x="0"
                      y="5"
                      textAnchor="middle"
                      fill="#3B82F6"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      ⚛
                    </text>
                  </g>

                  <g transform="translate(420, 300)" opacity="0.4">
                    <rect
                      x="-10"
                      y="-10"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      rx="3"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0;-360"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <text
                      x="0"
                      y="5"
                      textAnchor="middle"
                      fill="#10B981"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      ⚡
                    </text>
                  </g>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                label: "Clients satisfaits",
                value: 10,
                suffix: "+",
              },
              { icon: Code, label: "Projets réalisés", value: 15, suffix: "+" },
              {
                icon: Award,
                label: "Années d'expérience",
                value: 1,
                suffix: "",
              },
              {
                icon: TrendingUp,
                label: "Taux de satisfaction",
                value: 85,
                suffix: "%",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 font-heading">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Nos Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des solutions digitales complètes pour propulser votre entreprise
              vers le succès
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Sites Vitrines",
                description:
                  "Sites web élégants et performants pour présenter votre entreprise",
                icon: "🌐",
                color: "from-purple-500 to-purple-600",
                gradient:
                  "from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20",
              },
              {
                title: "Applications Web",
                description:
                  "Solutions web sur mesure pour optimiser vos processus métier",
                icon: "⚡",
                color: "from-blue-500 to-blue-600",
                gradient:
                  "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
              },
              {
                title: "Mobile (Bientôt)",
                description: "Applications mobiles natives pour iOS et Android",
                icon: "📱",
                color: "from-amber-500 to-amber-600",
                gradient:
                  "from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <EnhancedCard
                  hoverEffect={true}
                  glowEffect={true}
                  gradient={service.gradient}
                  className="h-full"
                >
                  <div className="p-8">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl mb-6 text-2xl shadow-lg`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground font-heading">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </EnhancedCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <CTAButton
              ctaName="services-see-all"
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/20 px-8 py-3 rounded-xl bg-transparent backdrop-blur-sm group"
            >
              <Link href="/services">
                Voir tous nos services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Offre Starter Highlight */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Offre Limitée</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              Offre Starter
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl line-through opacity-70">
                  90 000 FCFA
                </span>
                <span className="text-5xl font-bold font-heading">
                  49 900 FCFA
                </span>
              </div>
              <p className="text-xl opacity-90">
                Pour les 5 premières entreprises seulement
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="font-medium">
                  Plus que {remainingSlots} places disponibles
                </span>
              </div>
            </div>

            <CTAButton
              ctaName="starter-offer-reserve"
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link href="/offres">
                Réserver ma place
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Zone de couverture géographique */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-foreground">
              🌍 Notre Zone d'Intervention en Afrique de l'Ouest
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Agence basée à Abidjan, nous servons toute la Côte d'Ivoire et les
              pays francophones de la région
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                country: "🇨🇮 Côte d'Ivoire",
                cities: ["Abidjan", "Yamoussoukro", "Bouaké", "San-Pédro"],
                status: "Base principale",
              },
              {
                country: "🇧🇫 Burkina Faso",
                cities: ["Ouagadougou", "Bobo-Dioulasso"],
                status: "Service disponible",
              },
              {
                country: "🇲🇱 Mali",
                cities: ["Bamako", "Sikasso"],
                status: "Service disponible",
              },
              {
                country: "🇸🇳 Sénégal",
                cities: ["Dakar", "Thiès"],
                status: "Service disponible",
              },
            ].map((zone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {zone.country}
                </h3>
                <div className="space-y-1 mb-3">
                  {zone.cities.map((city, cityIndex) => (
                    <div
                      key={cityIndex}
                      className="text-sm text-muted-foreground"
                    >
                      • {city}
                    </div>
                  ))}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full inline-block ${
                    zone.status === "Base principale"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : zone.status === "Service disponible"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                  }`}
                >
                  {zone.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 px-4 bg-muted/30">
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
              Nous utilisons les dernières technologies pour garantir
              performance, sécurité et évolutivité
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                name: "Next.js 15",
                color: "bg-black dark:bg-white dark:text-black text-white",
                icon: "⚡",
              },
              { name: "React 19", color: "bg-blue-500 text-white", icon: "⚛️" },
              {
                name: "Supabase",
                color: "bg-green-500 text-white",
                icon: "🗄️",
              },
              {
                name: "IA (A venir)",
                color: "bg-purple-500 text-white",
                icon: "🤖",
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${tech.color} rounded-2xl p-6 text-center font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-float group cursor-pointer`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <div className="text-sm font-heading">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final avec urgence */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🚀 Prêt à Digitaliser Votre Entreprise ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <strong>Rejoignez les PME ivoiriennes</strong> qui nous font
              confiance. Contactez-nous dès aujourd'hui pour un{" "}
              <strong>devis gratuit en 24h</strong> et transformez votre
              présence digitale !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton
                ctaName="final-cta-devis-gratuit"
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link className="flex flex-row" href="/contact">
                  <span>Devis Gratuit 24h</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CTAButton>
              <CTAButton
                ctaName="final-cta-whatsapp-direct"
                size="lg"
                variant="outline"
                className="border-2 border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/20 px-8 py-3 rounded-xl bg-transparent backdrop-blur-sm group"
                onClick={() =>
                  window.open(
                    "https://wa.me/2250585471688?text=Bonjour%20KN%20Web%20Agency,%20je%20souhaite%20un%20devis%20pour%20mon%20site%20web",
                    "_blank"
                  )
                }
              >
                📱 WhatsApp Direct
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
