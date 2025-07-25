"use client"

import { motion } from "framer-motion"

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg opacity-20 blur-lg"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-20 blur-lg"
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl opacity-15 blur-xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
