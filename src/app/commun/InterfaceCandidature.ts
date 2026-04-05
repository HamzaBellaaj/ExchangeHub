import { Entretien } from './InterfaceEntretien';

export type StatutCandidature = 'en-attente' | 'entretien-planifie' | 'accepte' | 'refuse';

export interface Candidature {
  id: number;
  formationId: number;
  titre: string;
  universite: string;
  pays: string;
  dateDepot: string;
  statut: StatutCandidature;
  telephone?: string;
  typesMobilite?: string;
  entretien?: Entretien;
}


