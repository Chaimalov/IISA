import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Applicant } from '@IISA/lib';
import { ApplicantStore } from '@IISA/services';
import { ErrorCode } from '../../error.routes';

export const DAYS = 3;
const DAYS_IN_MS = DAYS * 24 * 60 * 60 * 1000;

export const EDIT_NOT_ALLOWED_ERROR = `Application cannot be edited after ${DAYS} days`;

export function isEditAllowed(applicant: Applicant): boolean {
  return new Date(applicant.created_at) >= new Date(Date.now() - DAYS_IN_MS);
}

export const editApplicationGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const applicant = inject(ApplicantStore)
    .applicants.value()
    .find(({ id }) => route.params['id'] === id);

  if (!applicant) {
    return new RedirectCommand(router.parseUrl(`/error/${ErrorCode.noApplicationFoundForThisEmail}`));
  }

  if (!isEditAllowed(applicant)) {
    return new RedirectCommand(router.parseUrl(`/error/${ErrorCode.applicationCannotBeEditedAfter3Days}`));
  }

  return true;
};
