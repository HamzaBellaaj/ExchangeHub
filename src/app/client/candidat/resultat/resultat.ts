import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidature, StatutCandidature } from '../../../commun/InterfaceCandidature';
import { CandidatureService } from '../../../commun/CandidatureService';

@Component({
  selector: 'app-resultat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultat.html',
  styleUrl: './resultat.css',
})
export class Resultat implements OnInit {
  candidatures: Candidature[] = [];
  candidaturesAffichees: Candidature[] = [];

  libelles = {
    'en-attente': 'En attente',
    'entretien-planifie': 'Entretien Planifié',
    'accepte': 'Accepté',
    'refuse': 'Refusé'
  };

  constructor(private candidatureService: CandidatureService) {}

  ngOnInit(): void {
    this.candidatureService.candidatures$.subscribe(candidatures => {
      this.candidatures = candidatures;
      this.candidaturesAffichees = candidatures;
    });
  }

  filtrer(statut: StatutCandidature | 'tous'): void {
    if (statut === 'tous') {
      this.candidaturesAffichees = this.candidatures;
    } else {
      this.candidaturesAffichees = this.candidatures.filter(c => c.statut === statut);
    }
  }

  openLink(lien: string): void {
    window.open(lien, '_blank');
  }
}


