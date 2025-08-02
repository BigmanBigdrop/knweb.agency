import { Metadata } from 'next';
import OffresClient from './offres-client';

export const metadata: Metadata = {
  title: 'Nos Offres - Sites Web et Applications | KN Web Agency Abidjan',
  description: 'Découvrez nos forfaits création de sites web à partir de 49,000 FCFA. Site vitrine, application web, solution sur-mesure. Hébergement inclus, support 3 mois. Abidjan, Côte d\'Ivoire.',
  keywords: 'création site web Abidjan, KN web agency, offres création site web, développement web Côte d\'Ivoire, site vitrine professionnel, application web sur mesure, agence web Abidjan, tarif site internet, forfait développement web',
};

export default function OffresPage() {
  return <OffresClient />;
}