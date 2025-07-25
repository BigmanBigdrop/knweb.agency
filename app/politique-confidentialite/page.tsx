import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de confidentialité - KN Web Agency",
  description: "Politique de confidentialité de KN Web Agency, protection de vos données personnelles",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50/30 to-blue-50/30 dark:from-background dark:via-purple-950/20 dark:to-blue-950/20 pt-20">
      <div className="container mx-auto max-w-4xl px-4 py-20">
        <h1 className="text-4xl font-bold mb-8 font-heading bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Politique de confidentialité
        </h1>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>Collecte des données</h2>
          <p>
            KN Web Agency collecte des données personnelles uniquement lorsque vous nous les fournissez volontairement
            via nos formulaires de contact, d'inscription à la newsletter ou lors de demandes de devis.
          </p>

          <h2>Types de données collectées</h2>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Nom de l'entreprise</li>
            <li>Numéro de téléphone (optionnel)</li>
            <li>Informations sur votre projet</li>
          </ul>

          <h2>Utilisation des données</h2>
          <p>Vos données personnelles sont utilisées pour :</p>
          <ul>
            <li>Répondre à vos demandes de contact</li>
            <li>Vous envoyer des devis personnalisés</li>
            <li>Vous tenir informé de nos actualités (newsletter)</li>
            <li>Améliorer nos services</li>
          </ul>

          <h2>Conservation des données</h2>
          <p>
            Vos données sont conservées pendant une durée de 3 ans maximum à compter de notre dernier contact, sauf
            obligation légale contraire.
          </p>

          <h2>Partage des données</h2>
          <p>
            KN Web Agency ne vend, ne loue, ni ne partage vos données personnelles avec des tiers, sauf dans les cas
            suivants :
          </p>
          <ul>
            <li>Avec votre consentement explicite</li>
            <li>Pour répondre à une obligation légale</li>
            <li>Avec nos prestataires techniques (hébergement, analytics) dans le cadre strict de nos services</li>
          </ul>

          <h2>Vos droits</h2>
          <p>Conformément à la réglementation en vigueur, vous disposez des droits suivants :</p>
          <ul>
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit de suppression</li>
            <li>Droit à la portabilité</li>
            <li>Droit d'opposition</li>
          </ul>

          <h2>Cookies et technologies similaires</h2>
          <p>Notre site utilise des cookies pour :</p>
          <ul>
            <li>Améliorer votre expérience de navigation</li>
            <li>Analyser le trafic du site (Google Analytics)</li>
            <li>Mémoriser vos préférences</li>
          </ul>

          <h2>Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
            contre la perte, l'utilisation abusive, l'accès non autorisé, la divulgation, l'altération ou la
            destruction.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, contactez-nous
            :
          </p>
          <ul>
            <li>Email : contact@knweb.agency</li>
            <li>Téléphone : +225 0585471688</li>
          </ul>

          <h2>Modifications</h2>
          <p>
            Cette politique de confidentialité peut être mise à jour. La date de dernière modification est indiquée en
            bas de cette page.
          </p>

          <p className="text-sm text-muted-foreground mt-8">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
      </div>
    </div>
  )
}
