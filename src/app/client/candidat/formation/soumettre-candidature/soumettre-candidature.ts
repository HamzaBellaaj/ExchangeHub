import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Formation } from '../../../../commun/InterfaceFormation';
import { FORMATIONS } from '../../../../commun/dataFormations';
import { CandidatureService } from '../../../../commun/CandidatureService';
import { Candidature } from '../../../../commun/InterfaceCandidature';

@Component({
  selector: 'app-soumettre-candidature',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './soumettre-candidature.html',
  styleUrl: './soumettre-candidature.css',
})
export class SoumettreCandidature implements OnInit {
  candidatureForm!: FormGroup;
  formation: Formation | null = null;
  formationTitle: string = '';
  mobiliteOptions = ['Mobilité Étudiant', 'Mobilité Enseignement'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private candidatureService: CandidatureService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.formation = FORMATIONS.find(f => f.id === id) || null;
      if (this.formation) {
        this.formationTitle = `${this.formation.titre} - ${this.formation.universite}`;
      }
    });
  }

  initForm(): void {
    this.candidatureForm = this.fb.group({
      telephone: ['', [Validators.required]],
      nationalite: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      mobiliteType: ['Mobilité Étudiant', [Validators.required]],
      cv: ['', [Validators.required]],
      lettre: ['', [Validators.required]],
      notes: ['', [Validators.required]],
    });
  }

  onFileSelected(event: Event, fieldName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.candidatureForm.get(fieldName)?.setValue(file.name);
    }
  }

  soumettreFormulaire(): void {
    if (this.candidatureForm.valid && this.formation) {
      const nouvelleCandidature: Candidature = {
        id: Date.now(),
        formationId: this.formation.id,
        titre: this.formation.titre,
        universite: this.formation.universite,
        pays: this.formation.pays,
        dateDepot: new Date().toISOString().split('T')[0],
        statut: 'en-attente',
        telephone: this.candidatureForm.get('telephone')?.value,
        typesMobilite: this.candidatureForm.get('mobiliteType')?.value
      };
      this.candidatureService.ajouter(nouvelleCandidature);
      this.router.navigate(['/client/resultat']);
    }
  }

  annuler(): void {
    this.router.navigate(['/client/formation']);
  }
}
