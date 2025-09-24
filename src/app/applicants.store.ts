import { withCallState, withDataService } from '@angular-architects/ngrx-toolkit';
import { signalStore, type, withHooks, withMethods, withProps } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { Applicant } from './applicant';
import { DalService } from './dal.service';

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
      store.load();
    },
  }),
);
