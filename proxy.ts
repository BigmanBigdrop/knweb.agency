import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logger } from "@/lib/helpers";

// Liste des emails admin autorisés
const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(email => email.trim().toLowerCase()) || [];

export default async function proxy(req: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: req,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request: req,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  try {
    // Refresh session if expired - required for Server Components
    const {
      data: { session },
    } = await supabase.auth.getSession();

    logger.info("Proxy", {
      url: req.nextUrl.pathname,
      hasSession: !!session,
      user: session?.user?.email || "No user",
    });

    // Protect admin routes
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      !req.nextUrl.pathname.includes("/login") &&
      !req.nextUrl.pathname.includes("/unauthorized")
    ) {
      if (!session) {
        logger.info("Proxy - Redirecting to login (no session)");
        // Stocker l'URL originale pour redirection après connexion réussie
        const redirectUrl = new URL("/admin/login", req.url);

        // Ajouter l'URL de retour comme paramètre de requête si ce n'est pas la page de login
        if (req.nextUrl.pathname !== "/admin/login") {
          redirectUrl.searchParams.set("returnUrl", req.nextUrl.pathname);
        }

        return NextResponse.redirect(redirectUrl);
      }

      // Vérifier que l'utilisateur est bien admin
      const userEmail = session.user?.email?.toLowerCase();
      const isAdmin = ADMIN_EMAILS.length === 0 || (userEmail && ADMIN_EMAILS.includes(userEmail));

      if (!isAdmin) {
        logger.warn(`Proxy - Access denied for non-admin user: ${userEmail}`);
        return NextResponse.redirect(new URL("/admin/unauthorized", req.url));
      }

      logger.info("Proxy - Access granted (admin verified)");
    } else if (req.nextUrl.pathname === "/admin/login" && session) {
      logger.info("Proxy - Redirecting authenticated user from login");
      // Si l'utilisateur est déjà connecté et essaie d'accéder à la page de login, le rediriger vers le dashboard
      const returnUrl =
        req.nextUrl.searchParams.get("returnUrl") || "/admin/dashboard";
      return NextResponse.redirect(new URL(returnUrl, req.url));
    }

    return supabaseResponse;
  } catch (error) {
    logger.error("Proxy error", { error });
    return supabaseResponse;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
