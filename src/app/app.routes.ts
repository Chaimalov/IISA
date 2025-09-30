import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'blast-off',
    loadComponent: () => import('./success/success.component').then((m) => m.SuccessComponent),
  },
  {
    path: 'mission-control',
    loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'candidate-review',
    loadComponent: () => import('./candidates/candidates.component').then((m) => m.CandidatesComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
