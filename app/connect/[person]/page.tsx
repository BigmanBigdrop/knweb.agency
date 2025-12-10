"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  Download,
  MessageCircle,
  Mail,
  Code,
  Database,
  Zap,
  ExternalLink,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Contact data for both persons
const contactData = {
  ceo: {
    name: "Ange M. Kouame",
    title: "CEO & Responsable Commercial",
    tagline:
      "Je transforme vos idées en solutions digitales performantes que vous ne quitterez jamais",
    email: "contact@knweb.agency",
    phone: "+225 0585471688",
    whatsappMessage:
      "Bonjour, j'ai scanné votre carte de visite et je souhaiterais discuter d'un projet web avec vous.",
    logo: "/logo.png",
    expertise: [
      {
        icon: Code,
        title: "Sites Web & Vitrines",
        color: "from-purple-500 to-purple-600",
      },
      {
        icon: Database,
        title: "Logiciels de Gestion / SaaS",
        color: "from-blue-500 to-blue-600",
      },
      {
        icon: Zap,
        title: "Transformation Digitale",
        color: "from-green-500 to-green-600",
      },
    ],
    featuredProject: {
      name: "Toreb - Digitalisation de Restaurants",
      url: "https://toreb.vercel.app",
      description: "Logiciel de gestion et digitalisation de restaurants",
    },
    social: {
      linkedin: "https://linkedin.com/in/knwebagency",
      github: "https://github.com/knwebagency",
      twitter: "https://twitter.com/knwebagency",
    },
  },
  cto: {
    name: "Marshall Christ T. N'Guessan",
    title: "CTO & Lead Developer",
    tagline:
      "J'architece et développe des solutions web robustes et évolutives avec les technologies les plus modernes",
    email: "dev@knweb.agency",
    phone: "+225 0585471688",
    whatsappMessage:
      "Bonjour, j'ai scanné votre carte de visite et je souhaiterais discuter des aspects techniques d'un projet.",
    logo: "/logo.png",
    expertise: [
      {
        icon: Code,
        title: "Next.js & React 19",
        color: "from-purple-500 to-purple-600",
      },
      {
        icon: Database,
        title: "Supabase & PostgreSQL",
        color: "from-blue-500 to-blue-600",
      },
      {
        icon: Zap,
        title: "TypeScript & Architecture",
        color: "from-green-500 to-green-600",
      },
    ],
    featuredProject: {
      name: "Toreb - Digitalisation de Restaurants",
      url: "https://toreb.vercel.app",
      description: "Architecture évolutive avec Next.js 15 & Supabase",
    },
    social: {
      linkedin: "https://linkedin.com/in/knwebagency",
      github: "https://github.com/knwebagency",
      twitter: "https://twitter.com/knwebagency",
    },
  },
};

export default function ConnectPage({ params }: { params: Promise<{ person: string }> }) {
  const { person } = use(params);

  // Validate person parameter
  if (person !== "ceo" && person !== "cto") {
    notFound();
  }

  const data = contactData[person];
  const vcardUrl = `/vcards/${person}.vcf`;

  // WhatsApp link with pre-filled message
  const whatsappLink = `https://wa.me/${data.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(data.whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="overflow-hidden shadow-2xl border-0">
          {/* Identity Header */}
          <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 text-white p-8 text-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative z-10"
            >
              {/* Logo */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center overflow-hidden">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-2">
                  <img
                    src="/kn-logo.png"
                    alt="KN Web Agency"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Name & Title */}
              <h1 className="text-2xl font-bold mb-2 font-heading">{data.name}</h1>
              <p className="text-purple-100 text-sm font-medium mb-4">{data.title}</p>

              {/* Tagline */}
              <p className="text-white/90 text-sm leading-relaxed italic">
                "{data.tagline}"
              </p>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Magic Button - Download vCard */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Button
                asChild
                className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <a href={vcardUrl} download>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  Enregistrer mon contact
                  <Download className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
                </a>
              </Button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              <Button
                asChild
                variant="outline"
                className="h-12 border-2 border-green-500 text-green-600 hover:bg-green-50 font-medium group"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  WhatsApp
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-medium group"
              >
                <a href={`mailto:${data.email}`}>
                  <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Email
                </a>
              </Button>
            </motion.div>

            {/* Expertise */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Domaines d'expertise
              </h2>
              <div className="space-y-2">
                {data.expertise.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {item.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Featured Project */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Projet phare du moment
              </h2>
              <a
                href={data.featuredProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 transition-colors">
                      {data.featuredProject.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {data.featuredProject.description}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-purple-600 flex-shrink-0 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </a>
            </motion.div>

            {/* Visit Website Link */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.85 }}
            >
              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 group"
              >
                <a href="https://www.knweb.agency" target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Visiter notre site web
                  <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                </a>
              </Button>
            </motion.div>

            {/* Social Footer */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <p className="text-xs text-gray-500 text-center mb-3">Suivez-nous</p>
              <div className="flex justify-center gap-4">
                {/* LinkedIn */}
                <a
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors group"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a
                  href={data.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>

                {/* Twitter/X */}
                <a
                  href={data.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center hover:bg-sky-200 dark:hover:bg-sky-900/50 transition-colors group"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Footer Text */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-400">
                KN Web Agency
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
