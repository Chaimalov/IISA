import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { PostgrestError } from '@supabase/supabase-js';
import { FileInputAccessorModule } from 'file-input-accessor';
import { ApplicantStore } from '../services/applicants.store';
import { ApplicationFormGroup } from './application-form';
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
  private store = inject(ApplicantStore);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  protected form = new ApplicationFormGroup();

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
