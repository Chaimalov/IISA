import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { patchState, signalStore, type, withHooks, withMethods, withProps } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { ICustomFile } from 'file-input-accessor';
import { startWith } from 'rxjs';
import { Applicant, Application } from '@IISA/lib';
import { DalService } from './dal.service';

export const ApplicantsStore = signalStore(
  { providedIn: 'root' },
  withEntities({
    entity: type<Applicant>(),
  }),
  withProps(({ entities }) => ({
    applicants: entities,
  })),
  withMethods((store) => {
    const dal = inject(DalService);

    return {
      upload: (file: ICustomFile): Promise<string | null> => dal.uploadImage(file),
      load: async (): Promise<void> => {
        const applicants = await dal.load();
        patchState(store, setAllEntities(applicants));
      },
      create: (entity: Application): Promise<Applicant> => dal.create(entity),
      update: (entity: Application & Pick<Applicant, 'id'>): Promise<Applicant> => dal.update(entity),
      delete: (entity: Applicant): Promise<void> => dal.delete(entity),
      get: (id: Applicant['id']): Applicant | undefined => store.entityMap()[id],
    };
  }),
  withHooks({
    onInit: (store) => {
      const dal = inject(DalService);

      dal.listen().pipe(startWith({}), takeUntilDestroyed()).subscribe(store.load);
    },
  }),
);
