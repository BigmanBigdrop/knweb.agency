"use client"

import { motion } from "framer-motion"

export default function SVGAnimation() {
  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      <svg width="400" height="300" viewBox="0 0 400 300" className="w-full h-full max-w-md">
        {/* Background circles */}
        <motion.circle
          cx="200"
          cy="150"
          r="120"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeDasharray="10,5"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.circle
          cx="200"
          cy="150"
          r="80"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="1"
          strokeDasharray="5,3"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Central elements */}
        <motion.rect
          x="180"
          y="130"
          width="40"
          height="40"
          rx="8"
          fill="url(#gradient3)"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Floating elements */}
        <motion.circle
          cx="120"
          cy="80"
          r="8"
          fill="#9370DB"
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.circle
          cx="280"
          cy="220"
          r="6"
          fill="#4A90E2"
          initial={{ y: 0 }}
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
        />

        <motion.rect
          x="300"
          y="70"
          width="12"
          height="12"
          rx="2"
          fill="#8B4513"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Connection lines */}
        <motion.path
          d="M 120 80 Q 160 100 180 130"
          fill="none"
          stroke="url(#gradient4)"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.path
          d="M 220 130 Q 250 180 280 220"
          fill="none"
          stroke="url(#gradient4)"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9370DB" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4A90E2" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B4513" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9370DB" />
            <stop offset="50%" stopColor="#4A90E2" />
            <stop offset="100%" stopColor="#8B4513" />
          </linearGradient>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9370DB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4A90E2" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
