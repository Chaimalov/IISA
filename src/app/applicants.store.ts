import {
  patchState,
  signalStore,
  type,
  withHooks,
  withMethods,
} from "@ngrx/signals";
import { addEntities, withEntities } from "@ngrx/signals/entities";
import { Applicant, applicants } from "./applicant";

export const ApplicantsStore = signalStore(
  { providedIn: "root" },
  withEntities({
    entity: type<Applicant>(),
  }),
  withMethods((store) => ({
    get: (id: string): Applicant | undefined => store.entityMap()[id],
  })),
  withHooks({
    onInit: (store) => {
      patchState(store, addEntities(applicants));
    },
  })
);
