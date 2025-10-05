import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicantComponent } from '../../components/applicant/applicant.component';
import { ApplicantStore } from '../../services/applicants.store';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

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
  private readonly debouncedSearchQuery = toSignal(toObservable(this.searchQuery).pipe(debounceTime(200)));

  protected readonly filteredApplicants = computed(() => {
    const query = this.debouncedSearchQuery()?.toLowerCase().trim();

    if (!query) {
      return this.store.applicants.value();
    }

    return this.store.applicants.value().filter((applicant) => applicant.full_name.toLowerCase().includes(query));
  });
}
