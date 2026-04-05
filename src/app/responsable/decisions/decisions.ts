import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ApplicationStatus = 'en_attente' | 'preselectionne' | 'entretien_planifie' | 'accepte' | 'refuse';
type MobilityType = 'student' | 'teaching';

interface Application {
  id: string;
  candidateName: string;
  programName: string;
  mobilityType: MobilityType;
  status: ApplicationStatus;
  evaluationScore?: number;
}

@Component({
  selector: 'app-decisions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './decisions.html',
  styleUrl: './decisions.css',
})
export class Decisions implements OnInit {

  searchTerm = '';
  filterMode: 'pending' | 'decided' = 'pending';
  showModal = false;
  decisionType: 'accept' | 'reject' | null = null;
  selectedAppId: string | null = null;
  justification = '';
  toast: { message: string; type: 'success' | 'error' } | null = null;

  applications: Application[] = [];

  ngOnInit() {
    this.applications = [
      { id: '1', candidateName: 'Sophie Martin',   programName: 'Échange Académique - Université de Barcelone', mobilityType: 'student', status: 'entretien_planifie', evaluationScore: 16 },
      { id: '2', candidateName: 'Lucas Dubois',    programName: 'Semestre Recherche - Université de Rome',      mobilityType: 'student', status: 'preselectionne',     evaluationScore: 15 },
      { id: '3', candidateName: 'Emma Lefebvre',   programName: 'Double Diplôme - Université de Stockholm',     mobilityType: 'student', status: 'accepte',            evaluationScore: 18 },
      { id: '4', candidateName: 'Thomas Rousseau', programName: 'Échange Académique - Université de Barcelone', mobilityType: 'student', status: 'en_attente' },
      { id: '5', candidateName: 'Camille Petit',   programName: 'Programme Intensif - Université de Lisbonne',  mobilityType: 'student', status: 'refuse',             evaluationScore: 9 },
    ];
  }

  get pendingApps(): Application[] {
    return this.applications.filter(a =>
      a.status === 'preselectionne' || a.status === 'entretien_planifie'
    );
  }

  get decidedApps(): Application[] {
    return this.applications.filter(a =>
      a.status === 'accepte' || a.status === 'refuse'
    );
  }

  get filtered(): Application[] {
    const list = this.filterMode === 'pending' ? this.pendingApps : this.decidedApps;
    return list.filter(a =>
      a.candidateName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      a.programName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get stats() {
    return {
      toDecide:  this.pendingApps.length,
      accepted:  this.applications.filter(a => a.status === 'accepte').length,
      rejected:  this.applications.filter(a => a.status === 'refuse').length,
    };
  }

  openDecision(appId: string, type: 'accept' | 'reject') {
    this.selectedAppId = appId;
    this.decisionType = type;
    this.justification = '';
    this.showModal = true;
  }

  confirmDecision() {
    if (!this.selectedAppId || !this.decisionType) return;
    const idx = this.applications.findIndex(a => a.id === this.selectedAppId);
    if (idx !== -1) {
      this.applications[idx].status = this.decisionType === 'accept' ? 'accepte' : 'refuse';
    }
    const msg = this.decisionType === 'accept'
      ? 'Candidature acceptée avec succès'
      : 'Candidature refusée';
    this.showToast(msg, this.decisionType === 'accept' ? 'success' : 'error');
    this.showModal = false;
    this.selectedAppId = null;
    this.decisionType = null;
    this.justification = '';
  }

  getSelectedApp(): Application | null {
    return this.applications.find(a => a.id === this.selectedAppId) || null;
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      en_attente: 'En Attente', preselectionne: 'Présélectionné',
      entretien_planifie: 'Entretien Planifié', accepte: 'Accepté', refuse: 'Refusé',
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      en_attente: 'b-gray', preselectionne: 'b-orange',
      entretien_planifie: 'b-purple', accepte: 'b-green', refuse: 'b-red',
    };
    return classes[status] || '';
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toast = { message, type };
    setTimeout(() => (this.toast = null), 3000);
  }
}