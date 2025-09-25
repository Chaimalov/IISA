import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'candidates',
    children: [
      {
        path: ':id',
        loadComponent: () => import('./applicant/applicant.component').then((m) => m.ApplicantComponent),
      },
    ],
  },
];
