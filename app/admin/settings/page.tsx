"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save, Loader2, DollarSign, BarChart3, Phone, Share2 } from "lucide-react";
import { getSiteSettings, updateSiteSettings, type SiteSettings } from "@/lib/supabase";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    const data = await getSiteSettings();
    if (data) {
      setSettings(data);
    } else {
      toast.error("Erreur lors du chargement des paramètres");
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!settings) return;

    setIsSaving(true);
    const result = await updateSiteSettings(settings);

    if (result.success) {
      toast.success("Paramètres sauvegardés avec succès !");
    } else {
      toast.error(`Erreur: ${result.error || "Impossible de sauvegarder"}`);
    }
    setIsSaving(false);
  };

  const updateField = (field: keyof SiteSettings, value: string | number) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Erreur</CardTitle>
            <CardDescription>Impossible de charger les paramètres</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={loadSettings}>Réessayer</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Paramètres du Site</h1>
            <p className="text-muted-foreground mt-2">
              Gérez les prix, statistiques et informations affichées sur le site
            </p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} size="lg">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="pricing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pricing">
              <DollarSign className="mr-2 h-4 w-4" />
              Tarification
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart3 className="mr-2 h-4 w-4" />
              Statistiques
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Phone className="mr-2 h-4 w-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="social">
              <Share2 className="mr-2 h-4 w-4" />
              Réseaux Sociaux
            </TabsTrigger>
          </TabsList>

          {/* PRICING TAB */}
          <TabsContent value="pricing">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Offre Starter</CardTitle>
                  <CardDescription>
                    Prix et disponibilité de l'offre Starter
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="starter-original">Prix Original (FCFA)</Label>
                    <Input
                      id="starter-original"
                      type="number"
                      value={settings.starter_original_price}
                      onChange={(e) =>
                        updateField("starter_original_price", parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="starter-current">Prix Actuel (FCFA)</Label>
                    <Input
                      id="starter-current"
                      type="number"
                      value={settings.starter_current_price}
                      onChange={(e) =>
                        updateField("starter_current_price", parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="starter-slots">Nombre de Places Total</Label>
                    <Input
                      id="starter-slots"
                      type="number"
                      value={settings.starter_total_slots}
                      onChange={(e) =>
                        updateField("starter_total_slots", parseInt(e.target.value))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Offre Pro</CardTitle>
                  <CardDescription>
                    Prix de l'offre Pro
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="pro-original">Prix Original (FCFA)</Label>
                    <Input
                      id="pro-original"
                      type="number"
                      value={settings.pro_original_price}
                      onChange={(e) =>
                        updateField("pro_original_price", parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="pro-current">Prix Actuel (FCFA)</Label>
                    <Input
                      id="pro-current"
                      type="number"
                      value={settings.pro_current_price}
                      onChange={(e) =>
                        updateField("pro_current_price", parseInt(e.target.value))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* STATS TAB */}
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques de la Page d'Accueil</CardTitle>
                <CardDescription>
                  Chiffres clés affichés sur la homepage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="projects">Projets Réalisés</Label>
                    <Input
                      id="projects"
                      type="number"
                      value={settings.stats_projects_completed}
                      onChange={(e) =>
                        updateField("stats_projects_completed", parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="clients">Clients Satisfaits</Label>
                    <Input
                      id="clients"
                      type="number"
                      value={settings.stats_satisfied_clients}
                      onChange={(e) =>
                        updateField("stats_satisfied_clients", parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Années d'Expérience</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={settings.stats_years_experience}
                      onChange={(e) =>
                        updateField("stats_years_experience", parseInt(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="technologies">Technologies Utilisées</Label>
                    <Input
                      id="technologies"
                      type="number"
                      value={settings.stats_technologies_used}
                      onChange={(e) =>
                        updateField("stats_technologies_used", parseInt(e.target.value))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONTACT TAB */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Informations de Contact</CardTitle>
                <CardDescription>
                  Coordonnées affichées dans le footer et la page contact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={settings.contact_phone}
                    onChange={(e) => updateField("contact_phone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) => updateField("contact_email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    type="text"
                    value={settings.contact_address}
                    onChange={(e) => updateField("contact_address", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SOCIAL TAB */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Réseaux Sociaux</CardTitle>
                <CardDescription>
                  Liens vers vos profils sociaux
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="twitter">Twitter / X</Label>
                  <Input
                    id="twitter"
                    type="url"
                    placeholder="https://twitter.com/knwebagency"
                    value={settings.social_twitter}
                    onChange={(e) => updateField("social_twitter", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/company/knwebagency"
                    value={settings.social_linkedin}
                    onChange={(e) => updateField("social_linkedin", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    type="url"
                    placeholder="https://facebook.com/knwebagency"
                    value={settings.social_facebook}
                    onChange={(e) => updateField("social_facebook", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} size="lg">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder les Modifications
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
