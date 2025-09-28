import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ApplicantsStore } from '../applicants.store';
import { MapComponent } from './map/map.component';
import { ApplicantsTableComponent } from './table/applicants-table.component';
import { AgeChartDirective, DateChartDirective } from './charts';

const className = 'grid h-full overflow-auto pt-16';

@Component({
  selector: 'iisa-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [ApplicantsTableComponent, AgeChartDirective, MapComponent, DateChartDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideCharts(withDefaultRegisterables())],
  host: {
    class: className,
  },
})
export class DashboardComponent {
  private store = inject(ApplicantsStore);
}
