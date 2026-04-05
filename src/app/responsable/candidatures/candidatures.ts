import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type ApplicationStatus = 'en_attente' | 'preselectionne' | 'entretien_planifie' | 'accepte' | 'refuse';
type MobilityType = 'student' | 'teaching';

interface Application {
  id: string;
  candidateName: string;
  programName: string;
  mobilityType: MobilityType;
  status: ApplicationStatus;
  submittedAt: string;
}

@Component({
  selector: 'app-candidatures',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './candidatures.html',
  styleUrl: './candidatures.css',
})
export class Candidatures implements OnInit {

  searchTerm = '';
  statusFilter: ApplicationStatus | 'all' = 'all';

  allApplications: Application[] = [];

  ngOnInit() {
    this.allApplications = [
      { id: '1', candidateName: 'Sophie Martin',   programName: 'Échange Académique - Université de Barcelone', mobilityType: 'student', status: 'entretien_planifie', submittedAt: '2026-02-15' },
      { id: '2', candidateName: 'Lucas Dubois',    programName: 'Semestre Recherche - Université de Rome',      mobilityType: 'student', status: 'preselectionne',     submittedAt: '2026-02-20' },
      { id: '3', candidateName: 'Emma Lefebvre',   programName: 'Double Diplôme - Université de Stockholm',     mobilityType: 'student', status: 'accepte',            submittedAt: '2026-01-10' },
      { id: '4', candidateName: 'Thomas Rousseau', programName: 'Échange Académique - Université de Barcelone', mobilityType: 'student', status: 'en_attente',         submittedAt: '2026-03-05' },
      { id: '5', candidateName: 'Camille Petit',   programName: 'Programme Intensif - Université de Lisbonne',  mobilityType: 'student', status: 'refuse',             submittedAt: '2026-02-01' },
    ];
  }

  get filtered(): Application[] {
    return this.allApplications.filter(app => {
      const matchSearch =
        app.candidateName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        app.programName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.statusFilter === 'all' || app.status === this.statusFilter;
      return matchSearch && matchStatus;
    });
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }

  getMobilityLabel(type: string): string {
    return type === 'student' ? 'Étudiant' : 'Enseignement';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      en_attente:          'En Attente',
      preselectionne:      'Présélectionné',
      entretien_planifie:  'Entretien Planifié',
      accepte:             'Accepté',
      refuse:              'Refusé',
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      en_attente:          'b-gray',
      preselectionne:      'b-orange',
      entretien_planifie:  'b-purple',
      accepte:             'b-green',
      refuse:              'b-red',
    };
    return classes[status] || '';
  }
}