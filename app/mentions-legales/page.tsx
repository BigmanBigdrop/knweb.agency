import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions légales - KN Web Agency",
  description: "Mentions légales de KN Web Agency, agence web à Abidjan",
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30 dark:from-background dark:via-purple-950/20 dark:to-blue-950/20 pt-20">
      <div className="container mx-auto max-w-4xl px-4 py-20">
        <h1 className="text-4xl font-bold mb-8 font-heading bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Mentions légales
        </h1>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>Informations légales</h2>
          <p>
            <strong>Raison sociale :</strong> KN Web Agency
            <br />
            <strong>Forme juridique :</strong> Entreprise individuelle
            <br />
            <strong>Adresse :</strong> Abidjan, Côte d'Ivoire
            <br />
            <strong>Email :</strong> contact@knwebagency.com
            <br />
            <strong>Téléphone :</strong> +225 0585471688
          </p>

          <h2>Directeur de la publication</h2>
          <p>Le directeur de la publication du site est le gérant de KN Web Agency.</p>

          <h2>Hébergement</h2>
          <p>
            Ce site est hébergé par Vercel Inc.
            <br />
            340 S Lemon Ave #4133
            <br />
            Walnut, CA 91789
            <br />
            États-Unis
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble de ce site relève de la législation ivoirienne et internationale sur le droit d'auteur et la
            propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents
            téléchargeables et les représentations iconographiques et photographiques.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Conformément à la loi ivoirienne sur la protection des données personnelles, vous disposez d'un droit
            d'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit,
            contactez-nous à l'adresse : contact@knwebagency.com
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. En continuant à
            naviguer sur ce site, vous acceptez l'utilisation de cookies.
          </p>

          <h2>Limitation de responsabilité</h2>
          <p>
            KN Web Agency s'efforce de fournir des informations aussi précises que possible. Toutefois, elle ne pourra
            être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient
            de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
          </p>
        </div>
      </div>
    </div>
  )
}
