import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Router, RouterLink } from '@angular/router';
import { FileInputAccessorModule, ICustomFile } from 'file-input-accessor';
import { ApplicantData } from '../applicant';
import { ApplicantsStore } from '../applicants.store';
import { RequiredInputDirective } from './required.directive';

type ApplicantForm = {
  [K in keyof Omit<ApplicantData, 'id' | 'avatar'>]: AbstractControl<ApplicantData[K] | null>;
} & { avatar: FormControl<ICustomFile[] | null> };

@Component({
  selector: 'iisa-registration-form',
  templateUrl: './registration-form.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    RequiredInputDirective,
    MatIcon,
    MatInputModule,
    MatStepperModule,
    RouterLink,
    FileInputAccessorModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  private store = inject(ApplicantsStore);
  private router = inject(Router);

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
    avatar: new FormControl<ICustomFile[] | null>(null),
  } satisfies ApplicantForm);

  public constructor() {
    const avatar = toSignal(this.form.controls.avatar.valueChanges);
    effect(() => {
      console.log(avatar()?.at(0));
    });
  }

  protected async submit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    await this.store.create({
      ...this.form.value,
      avatar: this.form.controls.avatar.value?.at(0),
    } as unknown as ApplicantData);

    this.router.navigate(['success']);
  }
}
