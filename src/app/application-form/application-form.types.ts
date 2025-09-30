import { AbstractControl } from '@angular/forms';
import { Application } from '@IISA/lib';

export type ApplicationFormControls = {
  [K in keyof Application]: AbstractControl<Application[K]>;
};
