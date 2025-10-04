import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Applicant } from '../../../lib/applicant.types';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'iisa-applicant',
  templateUrl: './applicant.component.html',
  imports: [MatIcon, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'grid md:grid-cols-[250px_1fr] md:divide-x-2 divide-[canvas] *:p-8',
  },
})
export class ApplicantComponent {
  public readonly applicant = input.required<Applicant>();
}
