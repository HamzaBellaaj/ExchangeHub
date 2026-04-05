import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type InterviewStatus = 'a_venir' | 'en_cours' | 'termine';

interface Interview {
  id: string;
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

interface NewInterview {
  candidate: string;
  type: string;
  date: string;
  time: string;
  location: string;
  participants: string;
  notes: string;
}

@Component({
  selector: 'app-entretiens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entretiens.html',
  styleUrl: './entretiens.css',
})
export class Entretiens implements OnInit {

  showCreateModal = false;
  showEditModal = false;
  toast: { message: string; type: 'success' | 'error' } | null = null;
  editingInterview: Interview | null = null;

  newInterview: NewInterview = {
    candidate: '', type: '', date: '', time: '',
    location: '', participants: '', notes: ''
  };

  interviews: Interview[] = [];

  get upcomingInterviews(): Interview[] {
    return this.interviews.filter(i => i.status === 'a_venir');
  }

  get completedInterviews(): Interview[] {
    return this.interviews.filter(i => i.status === 'termine');
  }

  ngOnInit() {
    this.interviews = [
      {
        id: '1', candidateName: 'Sophie Martin',
        programName: 'Échange Académique - Université de Barcelone',
        date: '2026-03-28', time: '14:00',
        location: 'Salle de Réunion A - Bâtiment Principal',
        type: 'in_person', status: 'a_venir',
        participants: ['Jean Dupont', 'Claire Moreau'],
        notes: 'Prévoir 30 minutes. Focus sur les compétences linguistiques.',
      },
      {
        id: '2', candidateName: 'Lucas Dubois',
        programName: 'Semestre Recherche - Université de Rome',
        date: '2026-03-25', time: '10:30',
        location: 'Visioconférence', type: 'online', status: 'a_venir',
        participants: ['Jean Dupont', 'Marie Bernard'],
        meetingLink: 'https://meet.example.com/lucas-dubois-interview',
        notes: 'Discussion approfondie du projet de recherche.',
      },
      {
        id: '3', candidateName: 'Emma Lefebvre',
        programName: 'Double Diplôme - Université de Stockholm',
        date: '2026-02-10', time: '15:00',
        location: 'Visioconférence', type: 'online', status: 'termine',
        participants: ['Jean Dupont', 'Marie Bernard', 'Claire Moreau'],
        meetingLink: 'https://meet.example.com/emma-lefebvre-interview',
        notes: "Entretien excellent. Candidate acceptée à l'unanimité. Très bonne maîtrise de l'anglais et projet académique cohérent.",
      },
    ];
  }

  formatDateLong(d: string): string {
    return new Date(d).toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  }

  openCreateModal() {
    this.newInterview = { candidate: '', type: '', date: '', time: '', location: '', participants: '', notes: '' };
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createInterview() {
    if (!this.newInterview.candidate || !this.newInterview.date || !this.newInterview.time) {
      this.showToast('Veuillez remplir les champs obligatoires', 'error');
      return;
    }
    const newId = (this.interviews.length + 1).toString();
    this.interviews.push({
      id: newId,
      candidateName: this.newInterview.candidate,
      programName: 'Programme non spécifié',
      date: this.newInterview.date,
      time: this.newInterview.time,
      location: this.newInterview.location,
      type: this.newInterview.type === 'online' ? 'online' : 'in_person',
      status: 'a_venir',
      participants: this.newInterview.participants.split(',').map(p => p.trim()).filter(p => p),
      notes: this.newInterview.notes,
    });
    this.showToast('Entretien planifié avec succès');
    this.showCreateModal = false;
  }

  openEditModal(interview: Interview) {
    this.editingInterview = { ...interview };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingInterview = null;
  }

  saveEdit() {
    if (!this.editingInterview) return;
    const idx = this.interviews.findIndex(i => i.id === this.editingInterview!.id);
    if (idx !== -1) this.interviews[idx] = { ...this.editingInterview };
    this.showToast('Entretien modifié avec succès');
    this.showEditModal = false;
    this.editingInterview = null;
  }

  cancelInterview(interview: Interview) {
    this.interviews = this.interviews.filter(i => i.id !== interview.id);
    this.showToast('Entretien annulé', 'error');
  }

  markDone(interview: Interview) {
    const idx = this.interviews.findIndex(i => i.id === interview.id);
    if (idx !== -1) this.interviews[idx].status = 'termine';
    this.showToast('Entretien marqué comme terminé');
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toast = { message, type };
    setTimeout(() => (this.toast = null), 3000);
  }
}