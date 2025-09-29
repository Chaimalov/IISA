import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ApplicantsStore } from '../applicants.store';
import { AgeChartDirective, DateChartDirective } from './charts';
import { MapComponent } from './map/map.component';
import { ApplicantsTableComponent } from './table/applicants-table.component';

const className = 'grid h-full overflow-auto pt-20 p-4 gap-4';

@Component({
  selector: 'iisa-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [ApplicantsTableComponent, AgeChartDirective, MapComponent, DateChartDirective, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideCharts(withDefaultRegisterables())],
  host: {
    class: className,
  },
})
export class DashboardComponent {
  protected store = inject(ApplicantsStore);
}
