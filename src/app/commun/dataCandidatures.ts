import { Candidature } from './InterfaceCandidature';

export const CANDIDATURES: Candidature[] = [
  {
    id: 1,
    formationId: 1,
    titre: 'Échange Académique - Université de Barcelone',
    universite: 'Universitat Pompeu Fabra',
    pays: 'Espagne',
    dateDepot: '15/02/2026',
    statut: 'entretien-planifie',
    telephone: '+33 6 12 34 56 78',
    typesMobilite: 'Étudiant',
    entretien: {
      date: '28/03/2026',
      heure: '14:00',
      lieu: 'Salle de Réunion A - Bâtiment Principal',
      type: 'presentiel'
    }
  },
  {
    id: 2,
    formationId: 3,
    titre: 'Semestre à Montréal',
    universite: 'Université de Montréal',
    pays: 'Canada',
    dateDepot: '05/02/2026',
    statut: 'entretien-planifie',
    telephone: '+33 6 12 34 56 78',
    typesMobilite: 'Étudiant',
    entretien: {
      date: '15/03/2026',
      heure: '10:00',
      lieu: 'Visioconférence',
      type: 'enligne',
      lien: 'https://meet.google.com/abc-defg-hij'
    }
  },
  {
    id: 3,
    formationId: 4,
    titre: 'Programme d\'échange - Tokyo',
    universite: 'Université de Waseda',
    pays: 'Japon',
    dateDepot: '20/01/2026',
    statut: 'en-attente',
    telephone: '+33 6 12 34 56 78',
    typesMobilite: 'Étudiant'
  },
  {
    id: 4,
    formationId: 5,
    titre: 'Erasmus+ - Université de Berlin',
    universite: 'Technische Universität Berlin',
    pays: 'Allemagne',
    dateDepot: '12/02/2026',
    statut: 'refuse',
    telephone: '+33 6 12 34 56 78',
    typesMobilite: 'Étudiant'
  }
];


