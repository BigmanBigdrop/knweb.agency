"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface EnhancedCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
  glowEffect?: boolean
  gradient?: string
}

export function EnhancedCard({
  children,
  className,
  hoverEffect = true,
  glowEffect = false,
  gradient,
}: EnhancedCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("group relative", glowEffect && "hover:shadow-2xl hover:shadow-purple-500/25", className)}
    >
      <Card
        className={cn(
          "relative overflow-hidden border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl",
          "shadow-xl hover:shadow-2xl transition-all duration-500",
          gradient && `bg-gradient-to-br ${gradient}`,
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/10 before:to-blue-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        )}
      >
        {children}
      </Card>
    </motion.div>
  )
}
