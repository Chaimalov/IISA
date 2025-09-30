import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Applicant } from '@IISA/lib';
import { ApplicantsStore } from '@IISA/services';
import { ErrorCode } from '../error/error.routes';

export const DAYS = 3;

export const NOT_ALLOWED_ERROR = `Application cannot be edited after ${DAYS} days.`;

export function isEditAllowed(applicant: Applicant): boolean {
  return new Date(applicant.created_at) >= new Date(Date.now() - DAYS * 24 * 60 * 60 * 1000);
}

export const editApplicationGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const applicant = inject(ApplicantsStore).get(route.params['id']);

  if (!applicant) {
    return new RedirectCommand(router.parseUrl(`/error/${ErrorCode['No application found for this email.']}`));
  }

  if (!isEditAllowed(applicant)) {
    return new RedirectCommand(router.parseUrl(`/error/${ErrorCode['Application cannot be edited after 3 days.']}`));
  }

  return true;
};
