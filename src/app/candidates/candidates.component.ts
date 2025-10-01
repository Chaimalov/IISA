import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicantComponent } from '../applicant/applicant.component';
import { ApplicantStore } from '../services/applicants.store';

@Component({
  selector: 'iisa-candidates',
  imports: [ApplicantComponent, FormsModule],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'gap-2 grid grid-rows-[1fr_auto] h-[calc(100dvh-5rem)]',
  },
})
export class CandidatesComponent {
  protected readonly store = inject(ApplicantStore);
  protected readonly router = inject(Router);

  protected readonly searchQuery = signal('');
  protected readonly candidates = computed(() => {
    if (!this.searchQuery()) {
      return this.store.applicants();
    }

    return this.store
      .applicants()
      .filter((applicant) => applicant.full_name.toLowerCase().includes(this.searchQuery().toLowerCase().trim()));
  });
}
