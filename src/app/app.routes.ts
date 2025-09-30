import { Routes } from '@angular/router';
import { editApplicationGuard } from './edit-application/edit-application.guard';
import { ERROR_ROUTES } from './error/error.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'edit-application',
    loadComponent: () =>
      import('./edit-application/edit-application.component').then((m) => m.EditApplicationComponent),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./application-form/application-form.component').then((m) => m.ApplicationFormComponent),
        canActivate: [editApplicationGuard],
      },
    ],
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
    path: 'error',
    children: ERROR_ROUTES,
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
