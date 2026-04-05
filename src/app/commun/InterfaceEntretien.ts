export type TypeEntretien = 'presentiel' | 'enligne';

export interface Entretien {
  date: string;
  heure: string;
  lieu: string;
  type: TypeEntretien;
  lien?: string;
}
