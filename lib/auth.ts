import { supabase } from "./supabase";

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

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
  } catch (error) {
    console.error("Erreur de déconnexion:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return user;
  } catch (error) {
    console.error("Erreur récupération utilisateur:", error);
    return null;
  }
};

export const getSession = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

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
