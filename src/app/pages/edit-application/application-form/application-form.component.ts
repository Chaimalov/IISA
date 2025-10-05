import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import {
  ApplicationFormGroup,
  AstronautIdentityComponent,
  CommunicationProtocolsComponent,
  PersonalOrbitComponent,
  PersonalStatementComponent,
} from '@IISA/components';
import { ApplicantStore } from '@IISA/services';
import { PostgrestError } from '@supabase/supabase-js';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'iisa-edit-application-form',
  imports: [
    ReactiveFormsModule,
    AstronautIdentityComponent,
    CommunicationProtocolsComponent,
    PersonalOrbitComponent,
    PersonalStatementComponent,
    RouterLink,
  ],
  templateUrl: './application-form.component.html',
  host: {
    class: 'place-items-center p-8 *:max-w-lg text-balance place-self-center',
  },
})
export class EditApplicationFormComponent {
  public store = inject(ApplicantStore);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  public readonly id = input.required<string>();

  private readonly applicant = computed(() => this.store.applicants.value().find(({ id }) => id === this.id()));
  protected readonly form = computed(() => new ApplicationFormGroup(this.applicant()));

  protected async submit(): Promise<void> {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    try {
      await this.store.update({ ...this.form().getRawValue(), id: this.id() });

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

  protected async delete(): Promise<void> {
    this.store.delete(this.id());
    this.router.navigate(['']);
  }
}
