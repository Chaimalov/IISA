import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { patchState, signalStore, type, withHooks, withMethods, withProps } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { ICustomFile } from 'file-input-accessor';
import { startWith } from 'rxjs';
import { Applicant, Application } from '@IISA/lib';
import { ApplicantsApiService } from '@IISA/services';

export const ApplicantStore = signalStore(
  { providedIn: 'root' },
  withEntities({
    entity: type<Applicant>(),
  }),
  withProps(({ entities }) => ({
    applicants: entities,
  })),
  withMethods((store) => {
    const api = inject(ApplicantsApiService);

    return {
      upload: (image: ICustomFile): Promise<string | null> => api.upload(image),
      load: async (): Promise<void> => {
        const applicants = await api.load();
        patchState(store, setAllEntities(applicants));
      },
      search: (email: Applicant['email']): Promise<Applicant> => api.loadByEmail(email),
      create: (application: Application): Promise<Applicant> => api.create(application),
      update: (application: Application & Pick<Applicant, 'id'>): Promise<Applicant> => api.update(application),
      delete: (id: Applicant['id']): Promise<void> => api.delete(id),
      get: (id: Applicant['id']): Applicant | undefined => store.entityMap()[id],
    };
  }),
  withHooks({
    onInit: (store) => {
      const api = inject(ApplicantsApiService);

      api.listen().pipe(startWith({}), takeUntilDestroyed()).subscribe(store.load);
    },
  }),
);
