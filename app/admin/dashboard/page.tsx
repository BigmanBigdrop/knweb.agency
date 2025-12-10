"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MessageSquare,
  TrendingUp,
  LogOut,
  Mail,
  Building,
  Download,
  Eye,
  MousePointer,
  AlertCircle,
  RefreshCw,
  Loader2,
  QrCode,
} from "lucide-react";
import { signOut, getCurrentUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

interface DashboardStats {
  totalMessages: number;
  totalLeads: number;
  starterSlotsRemaining: number;
  messagesLast30Days: number;
  viewsLast7Days: number;
  ctaClicksLast7Days: number;
}

interface RecentMessage {
  id: string;
  full_name: string;
  email: string;
  company_name: string | null;
  project_type: string | null;
  estimated_budget: string | null;
  message: string;
  created_at: string;
}

export default function AdminDashboard() {
  console.log("AdminDashboard component loaded");

  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalMessages: 0,
    totalLeads: 0,
    starterSlotsRemaining: 10,
    messagesLast30Days: 0,
    viewsLast7Days: 0,
    ctaClicksLast7Days: 0,
  });
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [realtimeStatus, setRealtimeStatus] = useState<string>("Disconnected");
  const router = useRouter();

  useEffect(() => {
    initializeDashboard();

    // Écouter les changements d'état d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session);

      if (event === "SIGNED_OUT" || !session) {
        router.push("/admin/login");
      } else if (event === "SIGNED_IN" && session) {
        // Rafraîchir les données si l'utilisateur vient de se connecter
        await initializeDashboard();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Supabase Realtime subscriptions for dashboard data
  useEffect(() => {
    console.log("🔄 Setting up Supabase Realtime subscriptions...");

    // S'abonner aux changements sur contact_messages
    const messagesChannel = supabase
      .channel("contact_messages_changes")
      .on(
        "postgres_changes",
        {
          event: "*", // INSERT, UPDATE, DELETE
          schema: "public",
          table: "contact_messages",
        },
        (payload) => {
          console.log("🆕 Contact message change detected:", payload);
          // Recharger les messages récents et les stats
          loadRecentMessages();
          loadDashboardStats();
        }
      )
      .subscribe((status) => {
        console.log("Messages subscription status:", status);
        setRealtimeStatus(status === "SUBSCRIBED" ? "Connected" : status);
      });

    // S'abonner aux changements sur leads
    const leadsChannel = supabase
      .channel("leads_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "leads",
        },
        (payload) => {
          console.log("🆕 Lead change detected:", payload);
          loadDashboardStats();
        }
      )
      .subscribe();

    // S'abonner aux changements sur starter_offer_slots
    const slotsChannel = supabase
      .channel("slots_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "starter_offer_slots",
        },
        (payload) => {
          console.log("🆕 Slots change detected:", payload);
          loadDashboardStats();
        }
      )
      .subscribe();

    // Nettoyer les subscriptions à la fin
    return () => {
      console.log("🔌 Unsubscribing from Realtime channels...");
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(leadsChannel);
      supabase.removeChannel(slotsChannel);
    };
  }, []);

  const initializeDashboard = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Vérifier la session d'authentification
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Erreur de session:", sessionError);
        router.push("/admin/login");
        return;
      }

      if (!session) {
        console.log("Aucune session trouvée, redirection vers login");
        router.push("/admin/login");
        return;
      }

      // Vérifier la connexion Supabase
      const connectionTest = await testSupabaseConnection();
      if (!connectionTest) {
        setError(
          "Impossible de se connecter à Supabase. Vérifiez votre configuration."
        );
        return;
      }

      setIsSupabaseConnected(true);

      // Récupérer l'utilisateur actuel
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push("/admin/login");
        return;
      }

      setUser(currentUser);

      // Charger les données du dashboard
      await loadDashboardData();
    } catch (error) {
      console.error("Erreur lors de l'initialisation:", error);
      setError("Erreur lors du chargement du tableau de bord");
    } finally {
      setIsLoading(false);
    }
  };

  const testSupabaseConnection = async (): Promise<boolean> => {
    try {
      console.log("🔍 Testing Supabase connection...");

      // Test simple de connexion
      const { data, error } = await supabase
        .from("contact_messages")
        .select("id")
        .limit(1);

      if (error) {
        console.error("❌ Supabase connection test failed:", error);
        return false;
      }

      console.log("✅ Supabase connection test successful");

      // Test de la configuration real-time
      const realtimeStatus = supabase.realtime.isConnected();
      console.log("Real-time connection status:", realtimeStatus);

      return true;
    } catch (error) {
      console.error("Test de connexion Supabase échoué:", error);
      return false;
    }
  };

  const loadDashboardStats = async () => {
    try {
      // Charger les statistiques avec gestion d'erreur pour chaque requête
      const statsPromises = [
        loadTotalMessages(),
        loadTotalLeads(),
        loadStarterSlots(),
        loadMessagesLast30Days(),
        loadViewsLast7Days(),
        loadCTAClicksLast7Days(),
      ];

      const results = await Promise.allSettled(statsPromises);

      // Traiter les résultats
      const newStats: DashboardStats = {
        totalMessages: results[0].status === "fulfilled" ? results[0].value : 0,
        totalLeads: results[1].status === "fulfilled" ? results[1].value : 0,
        starterSlotsRemaining:
          results[2].status === "fulfilled" ? results[2].value : 10,
        messagesLast30Days:
          results[3].status === "fulfilled" ? results[3].value : 0,
        viewsLast7Days:
          results[4].status === "fulfilled" ? results[4].value : 0,
        ctaClicksLast7Days:
          results[5].status === "fulfilled" ? results[5].value : 0,
      };

      setStats(newStats);
      console.log("📊 Dashboard stats updated:", newStats);
    } catch (error) {
      console.error("Erreur lors du chargement des stats:", error);
    }
  };

  const loadDashboardData = async () => {
    try {
      // Charger les statistiques
      await loadDashboardStats();

      // Charger les messages récents
      await loadRecentMessages();
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }
  };

  const loadTotalMessages = async (): Promise<number> => {
    try {
      const { count, error } = await supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("Erreur chargement total messages:", error);
      return 0;
    }
  };

  const loadTotalLeads = async (): Promise<number> => {
    try {
      const { count, error } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("Erreur chargement total leads:", error);
      return 0;
    }
  };

  const loadStarterSlots = async (): Promise<number> => {
    try {
      const { data, error } = await supabase
        .from("starter_offer_slots")
        .select("remaining_slots")
        .eq("id", 1)
        .single();

      if (error) throw error;
      return data?.remaining_slots || 10;
    } catch (error) {
      console.error("Erreur chargement starter slots:", error);
      return 10;
    }
  };

  const loadMessagesLast30Days = async (): Promise<number> => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { count, error } = await supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true })
        .gte("created_at", thirtyDaysAgo.toISOString());

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("Erreur chargement messages 30j:", error);
      return 0;
    }
  };

  const loadViewsLast7Days = async (): Promise<number> => {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { count, error } = await supabase
        .from("site_metrics")
        .select("*", { count: "exact", head: true })
        .eq("event_type", "page_view")
        .gte("created_at", sevenDaysAgo.toISOString());

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("Erreur chargement vues 7j:", error);
      return 0;
    }
  };

  const loadCTAClicksLast7Days = async (): Promise<number> => {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { count, error } = await supabase
        .from("site_metrics")
        .select("*", { count: "exact", head: true })
        .eq("event_type", "cta_click")
        .gte("created_at", sevenDaysAgo.toISOString());

      if (error) throw error;
      return count || 0;
    } catch (error) {
      console.error("Erreur chargement clics CTA 7j:", error);
      return 0;
    }
  };

  const loadRecentMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentMessages(data || []);
    } catch (error) {
      console.error("Erreur chargement messages récents:", error);
      setRecentMessages([]);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/admin/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const handleRefresh = async () => {
    console.log("🔄 Manual refresh triggered");
    setIsLoading(true);
    try {
      await loadDashboardData();
    } finally {
      setIsLoading(false);
    }
  };

  const exportMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        alert("Aucun message à exporter");
        return;
      }

      // Créer le CSV
      const csvContent = [
        [
          "Nom",
          "Email",
          "Entreprise",
          "Type de projet",
          "Budget",
          "Message",
          "Date",
        ].join(","),
        ...data.map((msg) =>
          [
            `"${msg.full_name}"`,
            `"${msg.email}"`,
            `"${msg.company_name || ""}"`,
            `"${msg.project_type || ""}"`,
            `"${msg.estimated_budget || ""}"`,
            `"${msg.message.replace(/"/g, '""')}"`,
            `"${new Date(msg.created_at).toLocaleDateString("fr-FR")}"`,
          ].join(",")
        ),
      ].join("\n");

      // Télécharger le fichier
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Manipulation du DOM sécurisée (côté client uniquement)
      if (typeof document !== "undefined") {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `messages_contact_${
          new Date().toISOString().split("T")[0]
        }.csv`;
        link.click();
      }
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
      alert("Erreur lors de l'export des messages");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-muted-foreground">
            Chargement du tableau de bord...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Erreur de connexion
              </h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <div className="space-y-2">
                <Button onClick={initializeDashboard} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Réessayer
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Retour à la connexion
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KN</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Tableau de bord KN Web Agency
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Connecté en tant que {user?.email}</span>
                  {isSupabaseConnected && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Supabase connecté
                    </Badge>
                  )}
                  <Badge
                    variant={
                      realtimeStatus === "SUBSCRIBED" ? "default" : "outline"
                    }
                    className={`${
                      realtimeStatus === "SUBSCRIBED"
                        ? "bg-blue-100 text-blue-800"
                        : realtimeStatus === "CHANNEL_ERROR"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {realtimeStatus === "SUBSCRIBED"
                      ? "🔴 Real-time"
                      : realtimeStatus === "CHANNEL_ERROR"
                      ? "🔄 Polling"
                      : "⚪ Offline"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => router.push("/admin/qr-codes")}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                QR Codes
              </Button>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Actualiser
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Messages Total
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalMessages}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.messagesLast30Days} ce mois
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Leads Générés
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalLeads}</div>
                <p className="text-xs text-muted-foreground">
                  Prospects qualifiés
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Places Starter
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.starterSlotsRemaining}
                </div>
                <p className="text-xs text-muted-foreground">
                  Places restantes
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vues (7j)</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.viewsLast7Days}</div>
                <p className="text-xs text-muted-foreground">
                  Pages vues cette semaine
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Clics CTA (7j)
                </CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.ctaClicksLast7Days}
                </div>
                <p className="text-xs text-muted-foreground">
                  Clics sur boutons CTA
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => router.push("/admin/messages")}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Gérer les messages
                </Button>
                <Button
                  onClick={exportMessages}
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exporter les messages
                </Button>
                <Button
                  onClick={initializeDashboard}
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Actualiser les données
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Messages récents */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Messages récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.length > 0 ? (
                    recentMessages.map((message) => (
                      <div
                        key={message.id}
                        className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                            <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {message.full_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(message.created_at).toLocaleDateString(
                                "fr-FR"
                              )}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {message.email}
                          </p>
                          {message.company_name && (
                            <div className="flex items-center mt-1">
                              <Building className="w-3 h-3 text-muted-foreground mr-1" />
                              <p className="text-xs text-muted-foreground truncate">
                                {message.company_name}
                              </p>
                            </div>
                          )}
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                            {message.message}
                          </p>
                          {message.project_type && (
                            <Badge variant="secondary" className="mt-2 text-xs">
                              {message.project_type}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Aucun message récent
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Les messages apparaîtront ici une fois que des
                        utilisateurs auront contacté votre site
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
