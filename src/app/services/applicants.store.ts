import { inject, resource } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Applicant, Application } from '@IISA/lib';
import { ApplicantsApiService } from '@IISA/services';
import { signalStore, withMethods, withProps } from '@ngrx/signals';
import { ICustomFile } from 'file-input-accessor';
import { map } from 'rxjs';

export const ApplicantStore = signalStore(
  { providedIn: 'root' },
  withProps(() => {
    const api = inject(ApplicantsApiService);
    const refresh = toSignal(api.listen().pipe(map(() => ({}))), { initialValue: {} });

    return {
      applicants: resource({
        request: refresh,
        loader: () => api.load(),
        defaultValue: [],
      }).asReadonly(),
    };
  }),
  withMethods(() => {
    const api = inject(ApplicantsApiService);

    return {
      upload: (image: ICustomFile): Promise<string | null> => api.upload(image),
      search: (email: Applicant['email']): Promise<Applicant> => api.loadByEmail(email),
      create: (application: Application): Promise<Applicant> => api.create(application),
      update: (application: Application & Pick<Applicant, 'id'>): Promise<Applicant> => api.update(application),
      delete: (id: Applicant['id']): Promise<void> => api.delete(id),
    };
  }),
);
