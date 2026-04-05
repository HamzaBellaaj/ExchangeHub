import { Routes } from '@angular/router';
import { ClientComponent } from './client/client';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/client',
        pathMatch: 'full'
    },
    {
        path: 'client',
        component: ClientComponent,
        loadChildren: () => import('./client/client.routes').then(m => m.CLIENT_ROUTES)
    },
    {
        path: '**',
        redirectTo: '/client'
    }
];
