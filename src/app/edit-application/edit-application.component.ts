import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicantsStore } from '@IISA/services';
import { ErrorCode } from '../error/error.routes';
import { DAYS } from './edit-application.guard';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'iisa-edit-application',
  imports: [FormsModule],
  templateUrl: './edit-application.component.html',
  host: {
    class: 'grid gap-4 place-items-center p-8 *:max-w-lg text-balance place-self-center',
  },
})
export class EditApplicationComponent {
  private store = inject(ApplicantsStore);
  private router = inject(Router);

  protected readonly days = DAYS;
  protected readonly email = signal<string | undefined>(undefined);

  protected async search(): Promise<void> {
    const email = this.email();

    if (!email) return;

    try {
      const applicant = await this.store.search(email);

      this.router.navigate(['edit-application', applicant.id]);
    } catch (error) {
      console.error(error);

      this.router.navigate(['/error', ErrorCode['No application found for this email.']]);
    }
  }
}
