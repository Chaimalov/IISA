import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Applicant } from '../applicant';
import { ApplicantsStore } from '../applicants.store';

@Component({
  selector: 'iisa-applicant',
  templateUrl: './applicant.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicantComponent {
  private applicants = inject(ApplicantsStore);
  public readonly id = input.required<Applicant['id']>();

  protected readonly applicant = computed(() => {
    return this.applicants.get(this.id());
  });
}
