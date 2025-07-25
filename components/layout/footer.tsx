import Link from "next/link"
import { Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">KN</span>
              </div>
              <span className="font-bold text-xl font-heading">Web Agency</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Votre partenaire digital à Abidjan pour transformer vos idées en
              solutions web innovantes.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-heading">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="/services"
                  className="hover:text-purple-400 transition-colors"
                >
                  Sites Vitrines
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-purple-400 transition-colors"
                >
                  Applications Web
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-purple-400 transition-colors"
                >
                  Développement Mobile
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-purple-400 transition-colors"
                >
                  Refonte UX/UI
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-heading">Entreprise</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  href="/a-propos"
                  className="hover:text-purple-400 transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/projets"
                  className="hover:text-purple-400 transition-colors"
                >
                  Projets
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-purple-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-purple-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-heading">Newsletter</h3>
            <p className="text-gray-300 text-sm">
              Recevez nos dernières actualités et conseils directement dans
              votre boîte mail.
            </p>
            <NewsletterSignup source="footer" />
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Abidjan, Côte d'Ivoire</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a
                  href="mailto:contact@knweb.agency"
                  className="hover:text-purple-400 transition-colors"
                >
                  contact@knweb.agency
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 KN Web Agency. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link
                href="/mentions-legales"
                className="hover:text-purple-400 transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-confidentialite"
                className="hover:text-purple-400 transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/admin/login"
                className="hover:text-purple-400 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
