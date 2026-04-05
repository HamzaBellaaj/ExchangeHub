export interface Formation {
  id: number;
  titre: string;
  pays: string;
  universite: string;
  dateDebut: string;
  dateFin: string;
  placesDisponibles: number;
  description: string;
  criteres: string[];
  image?: string;
}
