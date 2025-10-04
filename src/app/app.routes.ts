import { Routes } from '@angular/router';
import { editApplicationGuard } from './pages/edit-application/edit-application.guard';
import { ERROR_ROUTES } from './error.routes';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'edit-application',
    loadComponent: () =>
      import('./pages/edit-application/edit-application.component').then((m) => m.EditApplicationComponent),
  },
  {
    path: 'edit-application/:id',
    loadComponent: () =>
      import('./pages/edit-application/application-form/application-form.component').then(
        (m) => m.EditApplicationFormComponent,
      ),
    canActivate: [editApplicationGuard],
  },
  {
    path: 'blast-off',
    loadComponent: () => import('./pages/success/success.component').then((m) => m.SuccessComponent),
  },
  {
    path: 'mission-control',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'candidate-review',
    loadComponent: () => import('./pages/candidates/candidates.component').then((m) => m.CandidatesComponent),
  },
  {
    path: 'error',
    children: ERROR_ROUTES,
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
