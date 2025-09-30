import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { PostgrestError } from '@supabase/supabase-js';
import { FileInputAccessorModule, ICustomFile } from 'file-input-accessor';
import { concatMap, filter, tap } from 'rxjs';
import { Application } from '../../lib/applicant.types';
import { ErrorMessageDirective } from './error-message.directive';
import { RequiredInputDirective } from './required.directive';
import { ApplicantsStore } from '../services/applicants.store';
import { CdkListboxModule } from '@angular/cdk/listbox';

type ApplicantForm = {
  [K in keyof Omit<Application, 'avatar'>]: AbstractControl<Application[K]>;
};

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
    CdkListboxModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  private store = inject(ApplicantsStore);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  protected form = new FormGroup({
    full_name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phone_number: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)],
    }),
    date_of_birth: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    city_region: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    hobbies: new FormControl<string[]>([]),
    personal_statement: new FormControl(''),
  } satisfies ApplicantForm);

  protected readonly avatar = {
    value: signal<ICustomFile[] | undefined>(undefined),
    loading: signal(false),
    error: signal<string | undefined>(undefined),
  };

  protected avatarUrl$ = toObservable(this.avatar.value).pipe(
    filter(Boolean),
    tap(() => this.avatar.loading.set(true)),
    concatMap((file) => this.store.upload(file[0])),
    tap({
      error: () => {
        this.avatar.error.set('Something went wrong');
        this.avatar.loading.set(false);
      },
      next: (url) => {
        this.avatar.error.set(undefined);
        this.avatar.loading.set(false);
        return url;
      },
    }),
  );

  protected readonly avatarUrl = toSignal(this.avatarUrl$, { initialValue: null });

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
  ];

  protected readonly otherHobbies = signal('');

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      await this.store.create({
        ...this.form.getRawValue(),
        avatar: this.avatarUrl(),
        hobbies: (this.form.controls.hobbies.value ?? []).concat(
          this.otherHobbies()
            .split(',')
            .map((hobby) => hobby.trim()),
        ),
      });

      this.router.navigate(['blast-off']);
    } catch (error) {
      if ((error as PostgrestError).code === '23505') {
        this.snackBar.open('Application already exists', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      }

      console.error(error);
    }
  }
}
