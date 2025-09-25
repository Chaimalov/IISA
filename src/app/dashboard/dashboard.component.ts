import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApplicantsStore } from '../applicants.store';
import { AgeChartComponent } from './age-chart/age-chart.component';
import { MapComponent } from './map/map.component';
import { ApplicantsTableComponent } from './table/applicants-table.component';
import { DateChartComponent } from './date-chart/date-chart.component';

const className = 'grid h-full ';

@Component({
  selector: 'iisa-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [ApplicantsTableComponent, AgeChartComponent, MapComponent, DateChartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: className,
  },
})
export class DashboardComponent {
  private store = inject(ApplicantsStore);
}
