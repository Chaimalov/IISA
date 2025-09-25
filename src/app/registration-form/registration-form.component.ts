import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { Applicant } from '../applicant';
import { MatIcon } from '@angular/material/icon';

type ApplicantForm = { image: AbstractControl<string> } & {
  [K in keyof Pick<
    Applicant,
    'city_region' | 'date_of_birth' | 'full_name' | 'email' | 'hobbies' | 'personal_statement' | 'phone_number'
  >]: AbstractControl<Applicant[K]>;
};

@Component({
  selector: 'iisa-registration-form',
  templateUrl: './registration-form.component.html',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIcon, MatInputModule, MatStepperModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  protected form = new FormGroup({
    full_name: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone_number: new FormControl('', { validators: [Validators.required] }),
    date_of_birth: new FormControl('', { validators: [Validators.required] }),
    city_region: new FormControl('', { validators: [Validators.required] }),
    hobbies: new FormControl(''),
    personal_statement: new FormControl(''),
    image: new FormControl(null),
  } satisfies ApplicantForm);
}
