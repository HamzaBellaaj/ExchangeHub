import { Formation } from './InterfaceFormation';

export const FORMATIONS: Formation[] = [
  {
    id: 1,
    titre: 'Échange Académique - Université de Barcelone',
    pays: 'Espagne',
    universite: 'Universitat Pompeu Fabra',
    dateDebut: '01/09/2026',
    dateFin: '31/01/2027',
    placesDisponibles: 8,
    description: 'Programme d\'échange d\'un semestre à l\'Université Pompeu Fabra de Barcelone. Immersion académique complète avec cours en anglais et espagnol.',
    criteres: [
      'Moyenne générale minimum de 12/20',
      'Niveau B2 en anglais ou espagnol',
      'Être inscrit en L3 ou M1',
      'Lettre de motivation convaincante'
    ],
    image: 'assets/barcelone.jpg'
  },
  {
    id: 2,
    titre: 'Stage Professionnel - Dublin',
    pays: 'Irlande',
    universite: 'University College Dublin',
    dateDebut: '15/02/2026',
    dateFin: '15/06/2026',
    placesDisponibles: 5,
    description: 'Stage professionnel de 4 mois dans une entreprise technologique à Dublin avec suivi académique.',
    criteres: [
      'Moyenne générale minimum de 13/20',
      'Niveau B2 en anglais',
      'Avoir complété au moins 60 crédits',
      'Lettre de motivation et CV en anglais'
    ],
    image: 'assets/dublin.jpg'
  },
  {
    id: 3,
    titre: 'Semestre à Montréal',
    pays: 'Canada',
    universite: 'Université de Montréal',
    dateDebut: '01/09/2026',
    dateFin: '31/12/2026',
    placesDisponibles: 6,
    description: 'Semestre d\'études au Canada avec intégration dans les cursus québécois. Découverte de la culture nord-américaine.',
    criteres: [
      'Moyenne générale minimum de 12/20',
      'Niveau B2 en anglais ou français avancé',
      'Être en L3 ou M1',
      'Adaptabilité et esprit d\'équipe'
    ],
    image: 'assets/montreal.jpg'
  },
  {
    id: 4,
    titre: 'Programme d\'écchange - Tokyo',
    pays: 'Japon',
    universite: 'Université de Waseda',
    dateDebut: '10/04/2026',
    dateFin: '30/09/2026',
    placesDisponibles: 3,
    description: 'Programme d\'écchange intensif avec apprentissage de la langue japonaise. Immersion totale dans la culture nippone.',
    criteres: [
      'Moyenne générale minimum de 14/20',
      'Anglais courant (B2 minimum)',
      'Motivation particulière pour la culture asiatique',
      'Entretien de sélection obligatoire'
    ],
    image: 'assets/tokyo.jpg'
  },
  {
    id: 5,
    titre: 'Erasmus+ - Université de Berlin',
    pays: 'Allemagne',
    universite: 'Technische Universität Berlin',
    dateDebut: '01/10/2026',
    dateFin: '31/01/2027',
    placesDisponibles: 10,
    description: 'Programme Erasmus+ permettant l\'obtention de bourses de mobilité en Allemagne. Cours en anglais et allemand.',
    criteres: [
      'Moyenne générale minimum de 11/20',
      'Niveau A2 en allemand recommandé',
      'Être inscrit en L3 ou M1',
      'Dossier Erasmus complet'
    ],
    image: 'assets/berlin.jpg'
  },
  {
    id: 6,
    titre: 'Summer School - Suisse',
    pays: 'Suisse',
    universite: 'Université de Genève',
    dateDebut: '15/07/2026',
    dateFin: '15/08/2026',
    placesDisponibles: 12,
    description: 'École d\'été intensive d\'un mois en Suisse avec masterclasses de renommés professionnels.',
    criteres: [
      'Moyenne générale minimum de 12/20',
      'Niveau B1 en anglais',
      'Diplôme de L2 ou en cours de L3',
      'Dossier de candidature motivé'
    ],
    image: 'assets/geneva.jpg'
  }
];
