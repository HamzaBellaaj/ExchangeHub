import { Routes } from '@angular/router';
import { Acceuil } from './acceuil/acceuil';
import { FormationComponent } from './formation/formation';
import { VoirDetails } from './formation/voir-details/voir-details';
import { SoumettreCandidature } from './formation/soumettre-candidature/soumettre-candidature';
import { Resultat } from './resultat/resultat';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'acceuil',
    pathMatch: 'full'
  },
  {
    path: 'acceuil',
    component: Acceuil
  },
  {
    path: 'formation',
    component: FormationComponent
  },
  {
    path: 'formation/voir-details/:id',
    component: VoirDetails
  },
  {
    path: 'formation/soumettre-candidature/:id',
    component: SoumettreCandidature
  },
  {
    path: 'resultat',
    component: Resultat
  }
];
