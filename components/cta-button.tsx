"use client"

import { Button } from "@/components/ui/button"
import { trackCTAClick } from "@/lib/supabase"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

interface CTAButtonProps {
  children: ReactNode
  ctaName: string
  href?: string
  onClick?: () => void
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  asChild?: boolean
}

export function CTAButton({
  children,
  ctaName,
  href,
  onClick,
  className,
  variant = "default",
  size = "default",
  asChild = false,
}: CTAButtonProps) {
  const pathname = usePathname()

  const handleClick = () => {
    trackCTAClick(ctaName, pathname)
    if (onClick) onClick()
  }

  if (href) {
    return (
      <Button asChild={asChild} variant={variant} size={size} className={className} onClick={handleClick}>
        <a href={href}>{children}</a>
      </Button>
    )
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleClick}>
      {children}
    </Button>
  )
}
