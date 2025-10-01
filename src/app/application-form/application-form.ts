import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationFormControls } from './application-form.types';
import { Applicant, Application } from '@IISA/lib';

const defaultApplication: Application = {
  avatar: null,
  city_region: '',
  date_of_birth: '',
  email: '',
  full_name: '',
  hobbies: [],
  personal_statement: '',
  phone_number: '',
};

export class ApplicationFormGroup extends FormGroup {
  public constructor(initial = defaultApplication) {
    super({
      avatar: new FormControl<string | null>(initial.avatar, { nonNullable: true }),
      full_name: new FormControl(initial.full_name, { nonNullable: true, validators: [Validators.required] }),
      email: new FormControl(initial.email, {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phone_number: new FormControl(initial.phone_number, {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)],
      }),
      date_of_birth: new FormControl(initial.date_of_birth, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      city_region: new FormControl(initial.city_region, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      hobbies: new FormControl(initial.hobbies),
      personal_statement: new FormControl(initial.personal_statement),
    } satisfies ApplicationFormControls);
  }
}
