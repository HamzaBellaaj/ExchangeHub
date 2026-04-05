import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Formation } from '../../../commun/InterfaceFormation';
import { FORMATIONS } from '../../../commun/dataFormations';
import { CandidatureService } from '../../../commun/CandidatureService';

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formation.html',
  styleUrl: './formation.css',
})
export class FormationComponent implements OnInit {
  formations: Formation[] = [];

  constructor(private router: Router, private candidatureService: CandidatureService) {}

  ngOnInit(): void {
    this.formations = FORMATIONS;
  }

  voirDetails(id: number): void {
    this.router.navigate(['/client/formation/voir-details', id]);
  }

  avezCandidature(formationId: number): boolean {
    return this.candidatureService.avezCandidature(formationId);
  }
}
