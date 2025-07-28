"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAnalytics, useCTATracking } from "@/components/analytics-tracker";
import {
  validateContactForm,
  sanitizeInput,
  showErrorToast,
  showSuccessToast,
  logger,
} from "@/lib/helpers";

export default function ContactPage() {
  const { trackEvent } = useAnalytics();
  const { trackCTAClick } = useCTATracking();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    projectType: "",
    estimatedBudget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation côté client améliorée
    const validation = validateContactForm({
      fullName: formData.fullName,
      email: formData.email,
      message: formData.message,
      companyName: formData.companyName,
      projectType: formData.projectType,
    });

    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      showErrorToast("Erreur de validation", firstError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitisation des données
      const sanitizedData = {
        full_name: sanitizeInput(formData.fullName),
        email: sanitizeInput(formData.email),
        company_name: formData.companyName
          ? sanitizeInput(formData.companyName)
          : null,
        project_type: formData.projectType || null,
        estimated_budget: formData.estimatedBudget || null,
        message: sanitizeInput(formData.message),
      };

      const { error } = await supabase
        .from("contact_messages")
        .insert([sanitizedData]);

      if (error) {
        logger.error("Error submitting form:", error);
        showErrorToast(
          "Erreur d'envoi",
          "Une erreur est survenue. Veuillez réessayer."
        );
        return;
      }

      logger.log("✅ Message submitted successfully to Supabase");
      logger.log("🔍 Inserted data:", sanitizedData);

      // Tracker l'événement de soumission du formulaire
      trackEvent({
        event_type: "form_submit",
        page: "/contact",
        metadata: {
          form_type: "contact",
          project_type: formData.projectType,
          estimated_budget: formData.estimatedBudget,
          has_company: !!formData.companyName,
        },
      });

      showSuccessToast(
        "Message envoyé !",
        "Nous vous recontacterons dans les 24h."
      );
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          companyName: "",
          projectType: "",
          estimatedBudget: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      logger.error("Error submitting form:", error);
      showErrorToast(
        "Erreur système",
        "Une erreur inattendue est survenue. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-3xl shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/25">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-6 font-heading">
                Message envoyé avec succès !
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Merci pour votre confiance. Notre équipe d'experts vous
                recontactera dans les 24h avec une proposition personnalisée.
              </p>
              <div className="mt-8 p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl border border-emerald-400/30">
                <p className="text-emerald-300 text-sm font-medium">
                  ⚡ Réponse garantie sous 24h ouvrées
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block p-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
              <div className="bg-slate-900 rounded-full px-6 py-2">
                <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Contactez notre équipe
                </span>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 text-white font-heading leading-tight">
              Créons ensemble votre
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-gradient-x">
                succès digital
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transformez vos idées en solutions digitales exceptionnelles.
              Notre équipe d'experts vous accompagne de la conception à la
              réalisation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-purple-500/25">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white font-heading">
                      Démarrons votre projet
                    </h2>
                    <p className="text-gray-400 mt-1">
                      Partagez votre vision, nous la transformerons en réalité
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-purple-400 transition-colors"
                      >
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                        placeholder="Votre nom complet"
                      />
                    </div>

                    <div className="group">
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-purple-400 transition-colors"
                      >
                        Email professionnel *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                        placeholder="votre@entreprise.com"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-purple-400 transition-colors"
                    >
                      Nom de l'entreprise
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label
                        htmlFor="projectType"
                        className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-purple-400 transition-colors"
                      >
                        Type de projet *
                      </label>
                      <select
                        id="projectType"
                        required
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            projectType: e.target.value,
                          }))
                        }
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                      >
                        <option value="" className="bg-slate-800">
                          Sélectionnez un type
                        </option>
                        <option value="site-vitrine" className="bg-slate-800">
                          Site vitrine premium
                        </option>
                        <option
                          value="application-web"
                          className="bg-slate-800"
                        >
                          Application web sur mesure
                        </option>
                        <option value="refonte" className="bg-slate-800">
                          Refonte & modernisation
                        </option>
                        <option value="mobile" className="bg-slate-800">
                          📱 Application mobile
                        </option>
                        <option value="autre" className="bg-slate-800">
                          Projet personnalisé
                        </option>
                      </select>
                    </div>

                    <div className="group">
                      <label
                        htmlFor="estimatedBudget"
                        className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-purple-400 transition-colors"
                      >
                        Budget estimé
                      </label>
                      <select
                        id="estimatedBudget"
                        value={formData.estimatedBudget}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            estimatedBudget: e.target.value,
                          }))
                        }
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                      >
                        <option value="" className="bg-slate-800">
                          Sélectionnez un budget
                        </option>
                        <option value="50k-100k" className="bg-slate-800">
                          50 - 100.000 FCFA
                        </option>
                        <option value="100k-200k" className="bg-slate-800">
                          100 - 200.000 FCFA
                        </option>
                        <option value="200k-400k" className="bg-slate-800">
                          200 - 400.000 FCFA
                        </option>
                        <option value="400k+" className="bg-slate-800">
                          Plus de 400.000 FCFA
                        </option>
                        <option value="non-defini" className="bg-slate-800">
                          À définir ensemble
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-purple-400 transition-colors"
                    >
                      Décrivez votre vision *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 resize-none"
                      placeholder="Partagez votre vision, vos objectifs, vos défis... Plus vous êtes précis, mieux nous pourrons vous accompagner dans votre réussite."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.fullName ||
                      !formData.email ||
                      !formData.message
                    }
                    onClick={() =>
                      trackCTAClick("contact-form-submit", "form-button")
                    }
                    className="group relative w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-5 px-8 rounded-xl transition-all duration-300 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Lancer mon projet
                          <svg
                            className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  </button>

                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-400">
                      🔒 Vos informations sont sécurisées et traitées
                      confidentiellement
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="space-y-8">
              {/* Card principale */}
              <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 p-[1px] rounded-3xl shadow-2xl shadow-purple-500/25">
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 h-full">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white font-heading">
                      Parlons de votre projet
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">
                          Ligne Téléphonique
                        </p>
                        <a
                          href="tel:+2250585471688"
                          className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium"
                        >
                          +225 05 85 47 16 88
                        </a>
                        <p className="text-xs text-gray-400 mt-1">
                          Réponse immédiate garantie
                        </p>
                      </div>
                    </div>

                    <div className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.947a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">
                          Email Professionnel
                        </p>
                        <a
                          href="mailto:contact@knweb.agency"
                          className="text-gray-300 hover:text-purple-400 transition-colors text-sm font-medium"
                        >
                          contact@knweb.agency
                        </a>
                        <p className="text-xs text-gray-400 mt-1">
                          Réponse sous 24h ouvrées
                        </p>
                      </div>
                    </div>

                    <div className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">
                          Localisation
                        </p>
                        <p className="text-gray-300 text-sm font-medium">
                          Abidjan, Côte d'Ivoire
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Disponibles sur rendez-vous
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <a
                      href="https://wa.me/2250585471688"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackCTAClick("whatsapp-contact", "external-link")
                      }
                      className="group relative w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                    >
                      <span className="relative z-10 flex items-center">
                        <svg
                          className="w-6 h-6 mr-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688" />
                        </svg>
                        Discuter sur WhatsApp
                        <svg
                          className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white font-heading">
                    Horaires d'ouverture
                  </h4>
                </div>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Lundi - Vendredi
                    </span>
                    <span className="font-bold text-white">8h - 18h</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                      Samedi
                    </span>
                    <span className="font-bold text-white">9h - 15h</span>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Dimanche
                    </span>
                    <span className="font-bold text-white">Fermé</span>
                  </div>
                </div>
              </div>

              {/* Garantie */}
              <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-amber-400/30 p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/25">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-amber-300 mb-3 text-lg font-heading">
                    Réponse Rapide Garantie
                  </h4>
                  <p className="text-amber-200 text-sm leading-relaxed">
                    <span className="font-semibold">Engagement qualité :</span>{" "}
                    Réponse personnalisée dans les 24h ouvrées ou consultation
                    gratuite offerte !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
