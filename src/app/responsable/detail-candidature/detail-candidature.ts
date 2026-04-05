import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

type ApplicationStatus = 'en_attente' | 'preselectionne' | 'entretien_planifie' | 'accepte' | 'refuse';
type MobilityType = 'student' | 'teaching';

interface Application {
  id: string;
  candidateName: string;
  programName: string;
  mobilityType: MobilityType;
  status: ApplicationStatus;
  submittedAt: string;
  personalInfo: { phone: string; address: string; nationality: string; };
  documents: { cv: string; motivationLetter: string; transcripts: string; };
  notes?: string;
  evaluationScore?: number;
}

@Component({
  selector: 'app-detail-candidature',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-candidature.html',
  styleUrl: './detail-candidature.css',
})
export class DetailCandidature implements OnInit {

  application: Application | null = null;
  notes = '';
  score = '';
  showStatusModal = false;
  newStatus: ApplicationStatus = 'en_attente';
  toast: { message: string; type: 'success' | 'error' } | null = null;

  statusOptions: { value: ApplicationStatus; label: string }[] = [
    { value: 'en_attente',         label: 'En Attente' },
    { value: 'preselectionne',     label: 'Présélectionné' },
    { value: 'entretien_planifie', label: 'Entretien Planifié' },
    { value: 'accepte',            label: 'Accepté' },
    { value: 'refuse',             label: 'Refusé' },
  ];

  private allApplications: Application[] = [
    {
      id: '1', candidateName: 'Sophie Martin',
      programName: 'Échange Académique - Université de Barcelone',
      mobilityType: 'student', status: 'entretien_planifie', submittedAt: '2026-02-15',
      personalInfo: { phone: '+33 6 12 34 56 78', address: '45 Rue de la République, Paris', nationality: 'Française' },
      documents: { cv: 'cv_sophie_martin.pdf', motivationLetter: 'lettre_motivation_barcelona.pdf', transcripts: 'releves_notes_l3.pdf' },
      notes: 'Excellente candidate avec de solides compétences linguistiques.', evaluationScore: 16,
    },
    {
      id: '2', candidateName: 'Lucas Dubois',
      programName: 'Semestre Recherche - Université de Rome',
      mobilityType: 'student', status: 'preselectionne', submittedAt: '2026-02-20',
      personalInfo: { phone: '+33 6 98 76 54 32', address: '12 Avenue des Champs, Lyon', nationality: 'Française' },
      documents: { cv: 'cv_lucas_dubois.pdf', motivationLetter: 'lettre_motivation_rome.pdf', transcripts: 'releves_notes_m2.pdf' },
      notes: 'Projet de recherche prometteur en archéologie.', evaluationScore: 15,
    },
    {
      id: '3', candidateName: 'Emma Lefebvre',
      programName: 'Double Diplôme - Université de Stockholm',
      mobilityType: 'student', status: 'accepte', submittedAt: '2026-01-10',
      personalInfo: { phone: '+33 7 45 67 89 01', address: '78 Boulevard Voltaire, Marseille', nationality: 'Française' },
      documents: { cv: 'cv_emma_lefebvre.pdf', motivationLetter: 'lettre_motivation_stockholm.pdf', transcripts: 'releves_notes_m1.pdf' },
      notes: "Dossier exceptionnel. Candidate très motivée.", evaluationScore: 18,
    },
    {
      id: '4', candidateName: 'Thomas Rousseau',
      programName: 'Échange Académique - Université de Barcelone',
      mobilityType: 'student', status: 'en_attente', submittedAt: '2026-03-05',
      personalInfo: { phone: '+33 6 23 45 67 89', address: '23 Rue du Commerce, Toulouse', nationality: 'Française' },
      documents: { cv: 'cv_thomas_rousseau.pdf', motivationLetter: 'lettre_motivation_barcelona.pdf', transcripts: 'releves_notes_l3.pdf' },
    },
    {
      id: '5', candidateName: 'Camille Petit',
      programName: 'Programme Intensif - Université de Lisbonne',
      mobilityType: 'student', status: 'refuse', submittedAt: '2026-02-01',
      personalInfo: { phone: '+33 7 89 01 23 45', address: '56 Place de la Victoire, Bordeaux', nationality: 'Française' },
      documents: { cv: 'cv_camille_petit.pdf', motivationLetter: 'lettre_motivation_lisbonne.pdf', transcripts: 'releves_notes_l2.pdf' },
      notes: 'Dossier incomplet. Niveau linguistique insuffisant.', evaluationScore: 9,
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = this.allApplications.find(a => a.id === id);
    if (found) {
      this.application = found;
      this.notes = found.notes || '';
      this.score = found.evaluationScore?.toString() || '';
      this.newStatus = found.status;
    }
  }

  goBack() {
    this.router.navigate(['/candidatures']);
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  getMobilityLabel(type: string): string {
    return type === 'student' ? 'Étudiant' : 'Enseignement';
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

  confirmStatusChange() {
    if (this.application) this.application.status = this.newStatus;
    this.showStatusModal = false;
    this.showToast('Statut mis à jour avec succès');
  }

  saveEvaluation() {
    this.showToast('Évaluation enregistrée avec succès');
  }

  accept() {
    if (this.application) this.application.status = 'accepte';
    this.showToast('Candidature acceptée');
  }

  reject() {
    if (this.application) this.application.status = 'refuse';
    this.showToast('Candidature refusée', 'error');
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toast = { message, type };
    setTimeout(() => (this.toast = null), 3000);
  }
}