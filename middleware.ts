import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logger } from "@/lib/helpers";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    // Refresh session if expired - required for Server Components
    const {
      data: { session },
    } = await supabase.auth.getSession();

    logger.info("Middleware", {
      url: req.nextUrl.pathname,
      hasSession: !!session,
      user: session?.user?.email || "No user",
    });

    // Protect admin routes
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      !req.nextUrl.pathname.includes("/login")
    ) {
      if (!session) {
        logger.info("Middleware - Redirecting to login (no session)");
        // Stocker l'URL originale pour redirection après connexion réussie
        const redirectUrl = new URL("/admin/login", req.url);

        // Ajouter l'URL de retour comme paramètre de requête si ce n'est pas la page de login
        if (req.nextUrl.pathname !== "/admin/login") {
          redirectUrl.searchParams.set("returnUrl", req.nextUrl.pathname);
        }

        return NextResponse.redirect(redirectUrl);
      } else {
        logger.info("Middleware - Access granted (session exists)");
      }
    } else if (req.nextUrl.pathname === "/admin/login" && session) {
      logger.info("Middleware - Redirecting authenticated user from login");
      // Si l'utilisateur est déjà connecté et essaie d'accéder à la page de login, le rediriger vers le dashboard
      const returnUrl =
        req.nextUrl.searchParams.get("returnUrl") || "/admin/dashboard";
      return NextResponse.redirect(new URL(returnUrl, req.url));
    }

    return res;
  } catch (error) {
    logger.error("Middleware error", { error });
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
