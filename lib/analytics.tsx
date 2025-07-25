"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackPageView } from "./supabase"

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    trackPageView(pathname)
  }, [pathname])

  return null
}
