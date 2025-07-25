"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Mail,
  Building,
  DollarSign,
  ArrowLeft,
  RefreshCw,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { supabase, type ContactMessage } from "@/lib/supabase";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm, filterType]);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      setError("");

      const { data, error: supabaseError } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setMessages(data || []);
    } catch (error) {
      console.error("Erreur chargement messages:", error);
      setError("Erreur lors du chargement des messages");
    } finally {
      setIsLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (message) =>
          message.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.company_name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrer par type de projet
    if (filterType !== "all") {
      filtered = filtered.filter(
        (message) => message.project_type === filterType
      );
    }

    setFilteredMessages(filtered);
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", messageId);

      if (error) {
        throw error;
      }

      setMessages(messages.filter((msg) => msg.id !== messageId));
    } catch (error) {
      console.error("Erreur suppression message:", error);
      alert("Erreur lors de la suppression du message");
    }
  };

  const exportMessages = async () => {
    try {
      const messagesToExport =
        filteredMessages.length > 0 ? filteredMessages : messages;

      if (messagesToExport.length === 0) {
        alert("Aucun message à exporter");
        return;
      }

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
        ...messagesToExport.map((msg) =>
          [
            `"${msg.full_name}"`,
            `"${msg.email}"`,
            `"${msg.company_name || ""}"`,
            `"${msg.project_type || ""}"`,
            `"${msg.estimated_budget || ""}"`,
            `"${msg.message.replace(/"/g, '""')}"`,
            `"${format(new Date(msg.created_at), "dd/MM/yyyy HH:mm", {
              locale: fr,
            })}"`,
          ].join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `messages_${
        filterType !== "all" ? filterType + "_" : ""
      }${format(new Date(), "yyyy-MM-dd")}.csv`;
      link.click();
    } catch (error) {
      console.error("Erreur export:", error);
      alert("Erreur lors de l'export");
    }
  };

  const getProjectTypes = () => {
    const types = messages
      .map((msg) => msg.project_type)
      .filter((type) => type !== null)
      .filter((type, index, array) => array.indexOf(type) === index);
    return types as string[];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement des messages...</p>
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
                Erreur de chargement
              </h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <div className="space-y-2">
                <Button onClick={loadMessages} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Réessayer
                </Button>
                <Button
                  onClick={() => router.push("/admin/dashboard")}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour au dashboard
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
              <Button
                onClick={() => router.push("/admin/dashboard")}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Gestion des Messages
                </h1>
                <p className="text-sm text-muted-foreground">
                  {filteredMessages.length} message(s)
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={loadMessages}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                onClick={exportMessages}
                variant="outline"
                size="sm"
                className="bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par nom, email, entreprise ou message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Type de projet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    {getProjectTypes().map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des messages */}
        <div className="space-y-4">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                              <Mail className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {message.full_name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {format(
                                  new Date(message.created_at),
                                  "dd MMM yyyy à HH:mm",
                                  { locale: fr }
                                )}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {message.email}
                            </p>
                          </div>
                        </div>

                        {message.company_name && (
                          <div className="flex items-center mb-2">
                            <Building className="w-4 h-4 text-muted-foreground mr-2" />
                            <span className="text-sm text-muted-foreground">
                              {message.company_name}
                            </span>
                          </div>
                        )}

                        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                          {message.message}
                        </p>

                        <div className="flex items-center space-x-4">
                          {message.project_type && (
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                              {message.project_type}
                            </Badge>
                          )}
                          {message.estimated_budget && (
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            >
                              <DollarSign className="w-3 h-3 mr-1" />
                              {message.estimated_budget}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedMessage(message)}
                              className="bg-transparent"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Détails du message</DialogTitle>
                            </DialogHeader>
                            {selectedMessage && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Nom complet
                                    </label>
                                    <p className="text-sm">
                                      {selectedMessage.full_name}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Email
                                    </label>
                                    <p className="text-sm">
                                      {selectedMessage.email}
                                    </p>
                                  </div>
                                  {selectedMessage.company_name && (
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Entreprise
                                      </label>
                                      <p className="text-sm">
                                        {selectedMessage.company_name}
                                      </p>
                                    </div>
                                  )}
                                  {selectedMessage.project_type && (
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Type de projet
                                      </label>
                                      <p className="text-sm">
                                        {selectedMessage.project_type}
                                      </p>
                                    </div>
                                  )}
                                  {selectedMessage.estimated_budget && (
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Budget estimé
                                      </label>
                                      <p className="text-sm">
                                        {selectedMessage.estimated_budget}
                                      </p>
                                    </div>
                                  )}
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Date
                                    </label>
                                    <p className="text-sm">
                                      {format(
                                        new Date(selectedMessage.created_at),
                                        "dd MMMM yyyy à HH:mm",
                                        {
                                          locale: fr,
                                        }
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Message
                                  </label>
                                  <p className="text-sm mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    {selectedMessage.message}
                                  </p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Supprimer le message
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer ce message de{" "}
                                {message.full_name} ? Cette action est
                                irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMessage(message.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card>
              <CardContent className="p-12">
                <div className="text-center">
                  <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Aucun message trouvé
                  </h3>
                  <p className="text-muted-foreground">
                    {searchTerm || filterType !== "all"
                      ? "Aucun message ne correspond à vos critères de recherche"
                      : "Aucun message de contact n'a été reçu pour le moment"}
                  </p>
                  {(searchTerm || filterType !== "all") && (
                    <Button
                      onClick={() => {
                        setSearchTerm("");
                        setFilterType("all");
                      }}
                      variant="outline"
                      className="mt-4 bg-transparent"
                    >
                      Effacer les filtres
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
