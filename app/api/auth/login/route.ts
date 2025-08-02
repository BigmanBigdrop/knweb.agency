import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 🔒 PROTECTION CONTRE LES ATTAQUES BRUTE FORCE
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes

function isBlocked(ip: string): boolean {
  const attempts = loginAttempts.get(ip);
  if (!attempts) return false;

  if (attempts.count >= MAX_ATTEMPTS) {
    const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
    if (timeSinceLastAttempt < BLOCK_DURATION) {
      return true;
    } else {
      // Reset after block duration
      loginAttempts.delete(ip);
      return false;
    }
  }
  return false;
}

function recordAttempt(ip: string, success: boolean) {
  if (success) {
    loginAttempts.delete(ip);
    return;
  }

  const attempts = loginAttempts.get(ip) || {
    count: 0,
    lastAttempt: Date.now(),
  };
  attempts.count++;
  attempts.lastAttempt = Date.now();
  loginAttempts.set(ip, attempts);
}

export async function POST(request: NextRequest) {
  try {
    // 🔒 SÉCURITÉ: Obtenir l'IP du client
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // 🔒 SÉCURITÉ: Vérifier si l'IP est bloquée
    if (isBlocked(ip)) {
      console.warn(`[SECURITY] Blocked login attempt from IP: ${ip}`);
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans 15 minutes." },
        { status: 429 }
      );
    }

    // 🔒 SÉCURITÉ: Validation des données d'entrée
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      recordAttempt(ip, false);
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // 🔒 SÉCURITÉ: Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      recordAttempt(ip, false);
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // 🔒 SÉCURITÉ: Log des tentatives de connexion
    console.log(`[AUTH] Login attempt: ${email} from IP: ${ip}`);

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      recordAttempt(ip, false);
      console.warn(
        `[AUTH] Failed login: ${email} from IP: ${ip} - ${error.message}`
      );
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data.session) {
      recordAttempt(ip, true);
      console.log(`[AUTH] Successful login: ${email} from IP: ${ip}`);
      return NextResponse.json({
        user: data.user,
        session: data.session,
        success: true,
      });
    }

    recordAttempt(ip, false);
    return NextResponse.json(
      { error: "Échec de la création de session" },
      { status: 400 }
    );
  } catch (error) {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    recordAttempt(ip, false);
    console.error(`[AUTH] Server error from IP: ${ip}`, error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
