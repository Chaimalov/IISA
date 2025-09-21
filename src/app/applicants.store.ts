import {
  patchState,
  signalStore,
  type,
  withHooks,
  withMethods,
  withProps,
} from "@ngrx/signals";
import { addEntities, withEntities } from "@ngrx/signals/entities";
import { Applicant, applicants } from "./applicant";

export const ApplicantsStore = signalStore(
  { providedIn: "root" },
  withEntities({
    entity: type<Applicant>(),
    collection: "_applicants",
  }),
  withProps(({ _applicantsEntities }) => ({
    applicants: _applicantsEntities,
  })),
  withMethods((store) => ({
    get: (id: string): Applicant | undefined =>
      store._applicantsEntityMap()[id],
  })),
  withHooks({
    onInit: (store) => {
      patchState(store, addEntities(applicants, { collection: "_applicants" }));
    },
  })
);
