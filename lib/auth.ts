import { supabase } from "./supabase";

// Implémentation de cache simple pour réduire les appels API
let userCache: any = null;
let userCacheTime: number = 0;
const USER_CACHE_TTL = 60 * 1000; // 1 minute en millisecondes

// Cache pour la session
let sessionCache: any = null;
let sessionCacheTime: number = 0;
const SESSION_CACHE_TTL = 60 * 1000; // 1 minute en millisecondes

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Invalider le cache après une connexion réussie
    userCache = null;
    userCacheTime = 0;
    sessionCache = null;
    sessionCacheTime = 0;

    return { user: data.user, session: data.session };
  } catch (error) {
    console.error("Erreur de connexion:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }

    // Invalider les caches lors de la déconnexion
    userCache = null;
    userCacheTime = 0;
    sessionCache = null;
    sessionCacheTime = 0;

    // Redirection sera gérée par l'appelant
  } catch (error) {
    console.error("Erreur de déconnexion:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const now = Date.now();

    // Utiliser le cache si disponible et pas expiré
    if (userCache && now - userCacheTime < USER_CACHE_TTL) {
      return userCache;
    }

    // D'abord vérifier s'il y a une session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Erreur de session:", sessionError);
      return null;
    }

    if (!session) {
      console.log("Aucune session trouvée");
      return null;
    }

    // Ensuite récupérer l'utilisateur
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Erreur récupération utilisateur:", error);
      return null;
    }

    // Mettre à jour le cache
    userCache = user;
    userCacheTime = now;

    return user;
  } catch (error) {
    console.error("Erreur récupération utilisateur:", error);
    return null;
  }
};

export const getSession = async () => {
  try {
    const now = Date.now();

    // Utiliser le cache si disponible et pas expiré
    if (sessionCache && now - sessionCacheTime < SESSION_CACHE_TTL) {
      return sessionCache;
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    // Mettre à jour le cache
    sessionCache = session;
    sessionCacheTime = now;

    return session;
  } catch (error) {
    console.error("Erreur récupération session:", error);
    return null;
  }
};

export const isAdmin = async () => {
  try {
    const user = await getCurrentUser();

    // Pour l'instant, tout utilisateur authentifié est considéré comme admin
    // Vous pouvez ajouter une logique plus complexe ici si nécessaire
    return !!user;
  } catch (error) {
    console.error("Erreur vérification admin:", error);
    return false;
  }
};
