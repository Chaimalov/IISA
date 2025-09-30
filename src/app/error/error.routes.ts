import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { NOT_ALLOWED_ERROR } from '../edit-application/edit-application.guard';

const loadComponent = (): Promise<Type<unknown>> => import('./error.component').then((m) => m.ErrorComponent);

export const ERROR_ROUTES = [
  {
    path: 'IS-404',
    loadComponent,
    data: {
      error: 'No application found for this email.',
      message: 'Please check your entry or start a new mission dossier.',
    },
  },
  {
    path: 'IS-401',
    loadComponent,
    data: {
      error: NOT_ALLOWED_ERROR,
      message: '',
    },
  },
  {
    path: '**',
    loadComponent,
    data: {
      error: 'Something went wrong.',
      message: 'Please try again later.',
    },
  },
] as const satisfies Routes;

export type ErrorCode = (typeof ERROR_ROUTES)[number]['path'];
export const ErrorCode = {
  'Application cannot be edited after 3 days.': 'IS-401',
  'No application found for this email.': 'IS-404',
  'Something went wrong.': '**',
} as const satisfies Record<(typeof ERROR_ROUTES)[number]['data']['error'], ErrorCode>;
