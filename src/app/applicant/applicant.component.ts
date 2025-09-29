import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Applicant } from '../applicant';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'iisa-applicant',
  templateUrl: './applicant.component.html',
  imports: [MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'grid md:grid-cols-[250px_1fr] md:divide-x-2 divide-[canvas] *:p-8',
  },
})
export class ApplicantComponent {
  public readonly applicant = input.required<Applicant>();
}
