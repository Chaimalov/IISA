import { withCallState, withDataService } from '@angular-architects/ngrx-toolkit';
import { signalStore, type, withHooks, withMethods, withProps } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { Applicant } from './applicant';
import { DalService } from './dal.service';
import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';

export const ApplicantsStore = signalStore(
  { providedIn: 'root' },
  withCallState(),
  withEntities({
    entity: type<Applicant>(),
  }),
  withDataService({
    dataServiceType: DalService,
    filter: {
      email: '',
      full_name: '',
      phone_number: '',
    },
  }),
  withProps(({ entities }) => ({
    applicants: entities,
  })),
  withMethods((store) => ({
    get: (id: Applicant['id']): Applicant | undefined => store.entities()[id],
  })),
  withHooks({
    onInit: (store) => {
      const dal = inject(DalService);

      dal.listen().pipe(startWith({}), takeUntilDestroyed()).subscribe(store.load);
    },
  }),
);
