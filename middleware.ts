import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.includes("/login")) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}
