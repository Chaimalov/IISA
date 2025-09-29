import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ApplicantsStore } from '../applicants.store';
import { MapComponent } from './map/map.component';
import { ApplicantsTableComponent } from './table/applicants-table.component';
import { AgeChartDirective, DateChartDirective } from './charts';
import { RouterLink } from '@angular/router';
import { ApplicantComponent } from '../applicant/applicant.component';

const className = 'grid h-full overflow-auto pt-16';

@Component({
  selector: 'iisa-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    ApplicantsTableComponent,
    AgeChartDirective,
    MapComponent,
    ApplicantComponent,
    DateChartDirective,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideCharts(withDefaultRegisterables())],
  host: {
    class: className,
  },
})
export class DashboardComponent {
  protected store = inject(ApplicantsStore);
}
