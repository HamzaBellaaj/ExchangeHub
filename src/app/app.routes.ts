import { Routes } from '@angular/router';
import { Dashboard } from './responsable/dashboard/dashboard';
import { Candidatures } from './responsable/candidatures/candidatures';
import { DetailCandidature } from './responsable/detail-candidature/detail-candidature';
import { Entretiens } from './responsable/entretiens/entretiens';
import { Decisions } from './responsable/decisions/decisions';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'candidatures', component: Candidatures },
  { path: 'candidature/:id', component: DetailCandidature },
  { path: 'entretiens', component: Entretiens },
  { path: 'decisions', component: Decisions },
];