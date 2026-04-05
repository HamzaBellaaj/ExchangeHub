import { Routes } from '@angular/router';
import { Home } from './candidat/home/home';
import { Acceuil } from './candidat/acceuil/acceuil';
import { FormationComponent } from './candidat/formation/formation';
import { VoirDetails } from './candidat/formation/voir-details/voir-details';
import { SoumettreCandidature } from './candidat/formation/soumettre-candidature/soumettre-candidature';
import { Resultat } from './candidat/resultat/resultat';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: Home,
    children: [
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
    ]
  }
];
