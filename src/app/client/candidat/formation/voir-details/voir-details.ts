import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from '../../../../commun/InterfaceFormation';
import { FORMATIONS } from '../../../../commun/dataFormations';

@Component({
  selector: 'app-voir-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voir-details.html',
  styleUrl: './voir-details.css',
})
export class VoirDetails implements OnInit {
  formation: Formation | null = null;
  id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getFormationDetails(this.id);
    });
  }

  getFormationDetails(id: number): void {
    this.formation = FORMATIONS.find(f => f.id === id) || null;
  }

  postuler(): void {
    if (this.formation) {
      this.router.navigate(['/client/formation/soumettre-candidature', this.id]);
    }
  }

  retour(): void {
    this.router.navigate(['/client/formation']);
  }
}
