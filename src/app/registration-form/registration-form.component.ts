import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { FileInputAccessorModule, ICustomFile } from 'file-input-accessor';
import { ApplicantData } from '../applicant';
import { ApplicantsStore } from '../applicants.store';
import { ErrorMessageDirective } from './error-message.directive';
import { RequiredInputDirective } from './required.directive';
import { PostgrestError } from '@supabase/supabase-js';

type ApplicantForm = {
  [K in keyof Omit<ApplicantData, 'id' | 'avatar'>]: AbstractControl<ApplicantData[K] | null>;
} & { avatar: FormControl<ICustomFile[] | null> };

@Component({
  selector: 'iisa-registration-form',
  templateUrl: './registration-form.component.html',
  imports: [
    ErrorMessageDirective,
    FormsModule,
    ReactiveFormsModule,
    RequiredInputDirective,
    MatIcon,
    RouterLink,
    FileInputAccessorModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  private store = inject(ApplicantsStore);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

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

  protected hobbies = [
    'Stargazing ✨',
    'Photography 📷',
    'Astronomy 🔭',
    'Rocketry 🚀',
    'Science 🧪',
    'Robotics 🤖',
    'Trekking 🥾',
    'Programming 💻',
    'Drone Flying 🛸',
    'Martial Arts 🥋',
    'Reading 📚',
    'Strategy Games ♟️',
    'Community Work 🤝',
  ].map((hobby) => ({ control: signal(false), value: hobby }));

  protected readonly selectedHobbies = computed(() =>
    this.hobbies.filter((hobby) => hobby.control()).map((hobby) => hobby.value),
  );

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      await this.store.create({
        ...this.form.value,
        hobbies: this.selectedHobbies()
          .concat(this.form.controls.hobbies.value ?? '')
          .join(', '),

        avatar: this.form.controls.avatar.value?.at(0),
      } as unknown as ApplicantData);

      this.router.navigate(['success']);
    } catch (error) {
      if ((error as PostgrestError).code === '23505') {
        this.snackBar.open('Applicant already exists', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      }
    }
  }
}
