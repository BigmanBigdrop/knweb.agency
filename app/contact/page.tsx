"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Phone, Mail, MapPin, MessageCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { FloatingElements } from "@/components/ui/floating-elements"
import { supabase } from "@/lib/supabase"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    projectType: "",
    estimatedBudget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          company_name: formData.companyName || null,
          project_type: formData.projectType || null,
          estimated_budget: formData.estimatedBudget || null,
          message: formData.message,
        },
      ])

      if (error) {
        console.error("Error submitting form:", error)
        alert("Une erreur est survenue. Veuillez réessayer.")
        return
      }

      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          fullName: "",
          email: "",
          companyName: "",
          projectType: "",
          estimatedBudget: "",
          message: "",
        })
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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
              Contactez-nous
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Prêt à transformer vos idées en réalité digitale ? Partagez-nous votre projet et obtenez un devis
              personnalisé gratuit.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 pb-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <EnhancedCard hoverEffect={false} className="shadow-2xl">
                <CardHeader className="pb-8">
                  <CardTitle className="text-3xl font-bold text-foreground font-heading">
                    Démarrons votre projet
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Remplissez ce formulaire et nous vous recontacterons dans les 24h
                  </p>
                </CardHeader>

                <CardContent>
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="text-foreground font-medium">
                            Nom complet *
                          </Label>
                          <Input
                            id="fullName"
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            className="border-border focus:border-purple-500 focus:ring-purple-500"
                            placeholder="Votre nom complet"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-foreground font-medium">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="border-border focus:border-purple-500 focus:ring-purple-500"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-foreground font-medium">
                          Nom de l'entreprise
                        </Label>
                        <Input
                          id="companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange("companyName", e.target.value)}
                          className="border-border focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-foreground font-medium">Type de projet *</Label>
                          <Select onValueChange={(value) => handleInputChange("projectType", value)}>
                            <SelectTrigger className="border-border focus:border-purple-500 focus:ring-purple-500">
                              <SelectValue placeholder="Sélectionnez un type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="site-vitrine">Site vitrine</SelectItem>
                              <SelectItem value="application-web">Application web</SelectItem>
                              <SelectItem value="refonte">Refonte de site</SelectItem>
                              <SelectItem value="mobile">Application mobile</SelectItem>
                              <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-foreground font-medium">Budget estimé</Label>
                          <Select onValueChange={(value) => handleInputChange("estimatedBudget", value)}>
                            <SelectTrigger className="border-border focus:border-purple-500 focus:ring-purple-500">
                              <SelectValue placeholder="Sélectionnez un budget" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="50k-100k">50 000 - 100 000 FCFA</SelectItem>
                              <SelectItem value="100k-200k">100 000 - 200 000 FCFA</SelectItem>
                              <SelectItem value="200k-400k">200 000 - 400 000 FCFA</SelectItem>
                              <SelectItem value="400k+">Plus de 400 000 FCFA</SelectItem>
                              <SelectItem value="non-defini">Non défini</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground font-medium">
                          Décrivez votre projet *
                        </Label>
                        <Textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="border-border focus:border-purple-500 focus:ring-purple-500 resize-none"
                          placeholder="Décrivez votre projet, vos objectifs, vos attentes..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Envoi en cours...
                          </div>
                        ) : (
                          <>
                            Envoyer ma demande <Send className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2 font-heading">Message envoyé !</h3>
                      <p className="text-muted-foreground">
                        Merci pour votre demande. Nous vous recontacterons dans les 24h.
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </EnhancedCard>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <EnhancedCard hoverEffect={false} gradient="from-purple-600 to-blue-600" className="text-white shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-heading">Informations de contact</CardTitle>
                  <p className="opacity-90">Plusieurs moyens de nous joindre</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Téléphone</p>
                      <a href="https://wa.me/2250585471688" className="opacity-90 hover:opacity-100 transition-opacity">
                        +225 0585471688
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a
                        href="mailto:contact@knwebagency.com"
                        className="opacity-90 hover:opacity-100 transition-opacity"
                      >
                        contact@knwebagency.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Localisation</p>
                      <p className="opacity-90">Abidjan, Côte d'Ivoire</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/20">
                    <Button
                      asChild
                      className="w-full bg-white text-purple-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <a href="https://wa.me/2250585471688" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 w-5 h-5" />
                        Discuter sur WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </EnhancedCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <EnhancedCard className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground font-heading">Horaires d'ouverture</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lundi - Vendredi</span>
                    <span className="font-semibold text-foreground">8h - 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Samedi</span>
                    <span className="font-semibold text-foreground">9h - 15h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimanche</span>
                    <span className="font-semibold text-foreground">Fermé</span>
                  </div>
                </CardContent>
              </EnhancedCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <EnhancedCard gradient="from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
                      <MessageCircle className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 font-heading">Réponse rapide garantie</h3>
                    <p className="text-muted-foreground text-sm">
                      Nous nous engageons à répondre à toutes les demandes dans les 24h ouvrées.
                    </p>
                  </div>
                </CardContent>
              </EnhancedCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
