import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { PostgrestError } from '@supabase/supabase-js';
import { FileInputAccessorModule } from 'file-input-accessor';
import { ApplicantsStore } from '../services/applicants.store';
import { ApplicationFormControls } from './application-form.types';
import { AstronautIdentityComponent } from './astronaut-identity/astronaut-identity.component';
import { CommunicationProtocolsComponent } from './communication-protocols/communication-protocols.component';
import { PersonalOrbitComponent } from './personal-orbit/personal-orbit.component';
import { PersonalStatementComponent } from './personal-statement/personal-statement.component';

@Component({
  selector: 'iisa-application-form',
  templateUrl: './application-form.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    FileInputAccessorModule,
    AstronautIdentityComponent,
    CommunicationProtocolsComponent,
    PersonalOrbitComponent,
    PersonalStatementComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationFormComponent {
  private store = inject(ApplicantsStore);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  protected form = new FormGroup({
    avatar: new FormControl<string | null>(null, { nonNullable: true }),
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
  } satisfies ApplicationFormControls);

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      await this.store.create(this.form.getRawValue());

      this.router.navigate(['blast-off']);
    } catch (error) {
      console.error(error);

      if ((error as PostgrestError).code === '23505') {
        this.snackBar.open('Application already exists', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'end',
          duration: 5000,
        });
      }
    }
  }
}
