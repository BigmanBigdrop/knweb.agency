"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after component mounts to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 200) {
        // Après 200px de scroll, on cache la navbar
        if (currentScrollY > lastScrollY) {
          setIsVisible(false); // Scroll vers le bas = cacher
        } else {
          setIsVisible(true); // Scroll vers le haut = montrer
        }
      } else {
        setIsVisible(true); // Toujours visible en haut de page
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Services" },
    { href: "/projets", label: "Projets" },
    { href: "/offres", label: "Offres" },
    { href: "/a-propos", label: "À propos" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const { theme, resolvedTheme } = useTheme();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
            lastScrollY > 50
              ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
              : "bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm"
          }`}
        >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                {mounted ? (
                  resolvedTheme === "dark" ? (
                    <img
                      src="/logo-white.png"
                      alt="Logo dark"
                      className="h-28 w-28"
                    />
                  ) : (
                    <img
                      src="/logo-dark.png"
                      alt="Logo light"
                      className="h-28 w-28"
                    />
                  )
                ) : (
                  <div className="h-28 w-28" />
                )}
              </Link>

              {/* Navigation Desktop */}
              <nav className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150 relative group font-medium"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-150"></span>
                  </Link>
                ))}
              </nav>

              {/* Actions Desktop */}
              <div className="hidden lg:flex items-center space-x-4">
                <ThemeToggle />
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-150"
                >
                  <Link href="/contact">Devis Gratuit</Link>
                </Button>
              </div>

              {/* Mobile: Theme Toggle + Menu Button */}
              <div className="flex lg:hidden items-center space-x-2">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-150"
                  aria-label="Menu"
                >
                  <div className="relative w-5 h-5">
                    <Menu
                      className={`absolute inset-0 w-5 h-5 transition-all duration-150 ${
                        isMenuOpen
                          ? "rotate-90 scale-0 opacity-0"
                          : "rotate-0 scale-100 opacity-100"
                      }`}
                    />
                    <X
                      className={`absolute inset-0 w-5 h-5 transition-all duration-150 ${
                        isMenuOpen
                          ? "rotate-0 scale-100 opacity-100"
                          : "-rotate-90 scale-0 opacity-0"
                      }`}
                    />
                  </div>
                </Button>
              </div>
            </div>

            {/* Menu Mobile */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="lg:hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
                >
                  <nav className="py-4 space-y-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15, delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-2 text-foreground hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all duration-150 font-medium"
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.15,
                        delay: navItems.length * 0.05,
                      }}
                      className="px-4 pt-2"
                    >
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-150"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Link href="/contact">Devis Gratuit</Link>
                      </Button>
                    </motion.div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
