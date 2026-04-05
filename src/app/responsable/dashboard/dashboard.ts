import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type ApplicationStatus = 'en_attente' | 'preselectionne' | 'entretien_planifie' | 'accepte' | 'refuse';
type MobilityType = 'student' | 'teaching';
type InterviewStatus = 'a_venir' | 'en_cours' | 'termine';

interface Application {
  id: string;
  candidateId: string;
  candidateName: string;
  programId: string;
  programName: string;
  mobilityType: MobilityType;
  status: ApplicationStatus;
  submittedAt: string;
  personalInfo: { phone: string; address: string; nationality: string; };
  documents: { cv: string; motivationLetter: string; transcripts: string; };
  notes?: string;
  evaluationScore?: number;
}

interface Interview {
  id: string;
  applicationId: string;
  candidateName: string;
  programName: string;
  date: string;
  time: string;
  location: string;
  type: 'in_person' | 'online';
  status: InterviewStatus;
  participants: string[];
  notes?: string;
  meetingLink?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  stats = { total: 0, pending: 0, accepted: 0, interviews: 0 };
  recentApplications: Application[] = [];
  upcomingInterviews: Interview[] = [];
  chartData: { name: string; value: number; color: string }[] = [];

  ngOnInit() {
    const apps: Application[] = [
      {
        id: '1', candidateId: '1', candidateName: 'Sophie Martin',
        programId: '1', programName: 'Échange Académique - Université de Barcelone',
        mobilityType: 'student', status: 'entretien_planifie', submittedAt: '2026-02-15',
        personalInfo: { phone: '', address: '', nationality: '' },
        documents: { cv: '', motivationLetter: '', transcripts: '' }
      },
      {
        id: '2', candidateId: '2', candidateName: 'Lucas Dubois',
        programId: '2', programName: 'Semestre Recherche - Université de Rome',
        mobilityType: 'student', status: 'preselectionne', submittedAt: '2026-02-20',
        personalInfo: { phone: '', address: '', nationality: '' },
        documents: { cv: '', motivationLetter: '', transcripts: '' }
      },
      {
        id: '3', candidateId: '3', candidateName: 'Emma Lefebvre',
        programId: '3', programName: 'Double Diplôme - Université de Stockholm',
        mobilityType: 'student', status: 'accepte', submittedAt: '2026-01-10',
        personalInfo: { phone: '', address: '', nationality: '' },
        documents: { cv: '', motivationLetter: '', transcripts: '' }
      },
      {
        id: '4', candidateId: '4', candidateName: 'Thomas Rousseau',
        programId: '1', programName: 'Échange Académique - Université de Barcelone',
        mobilityType: 'student', status: 'en_attente', submittedAt: '2026-03-05',
        personalInfo: { phone: '', address: '', nationality: '' },
        documents: { cv: '', motivationLetter: '', transcripts: '' }
      },
      {
        id: '5', candidateId: '5', candidateName: 'Camille Petit',
        programId: '4', programName: 'Programme Intensif - Université de Lisbonne',
        mobilityType: 'student', status: 'refuse', submittedAt: '2026-02-01',
        personalInfo: { phone: '', address: '', nationality: '' },
        documents: { cv: '', motivationLetter: '', transcripts: '' }
      },
    ];

    const interviews: Interview[] = [
      {
        id: '1', applicationId: '1', candidateName: 'Sophie Martin',
        programName: 'Échange Académique - Université de Barcelone',
        date: '2026-03-28', time: '14:00', location: 'Salle A',
        type: 'in_person', status: 'a_venir', participants: []
      },
      {
        id: '2', applicationId: '2', candidateName: 'Lucas Dubois',
        programName: 'Semestre Recherche - Université de Rome',
        date: '2026-03-25', time: '10:30', location: 'Visioconférence',
        type: 'online', status: 'a_venir', participants: []
      },
    ];

    this.stats = {
      total: apps.length,
      pending: apps.filter(a => a.status === 'en_attente').length,
      accepted: apps.filter(a => a.status === 'accepte').length,
      interviews: interviews.filter(i => i.status === 'a_venir').length,
    };

    this.recentApplications = apps;
    this.upcomingInterviews = interviews;

    this.chartData = [
      { name: 'Présélectionné', value: apps.filter(a => a.status === 'preselectionne').length, color: '#f97316' },
      { name: 'En attente',     value: apps.filter(a => a.status === 'en_attente').length,     color: '#64748b' },
      { name: 'Accepté',        value: apps.filter(a => a.status === 'accepte').length,        color: '#22c55e' },
      { name: 'Refusé',         value: apps.filter(a => a.status === 'refuse').length,         color: '#ef4444' },
    ];
  }

  buildConicGradient(): string {
    const total = this.stats.total || 1;
    let angle = 0;
    return 'conic-gradient(' + this.chartData.map(d => {
      const deg = (d.value / total) * 360;
      const part = `${d.color} ${Math.round(angle)}deg ${Math.round(angle + deg)}deg`;
      angle += deg;
      return part;
    }).join(', ') + ')';
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

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }
}