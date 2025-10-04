import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AgeChartDirective, DateChartDirective } from './charts';
import { MapComponent } from './map/map.component';
import { ApplicantsTableComponent } from './table/applicants-table.component';
import { HobbyChartDirective } from './charts/hobby-chart.directive';

const className = 'grid h-full overflow-auto p-4 gap-4';

@Component({
  selector: 'iisa-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    ApplicantsTableComponent,
    AgeChartDirective,
    MapComponent,
    DateChartDirective,
    HobbyChartDirective,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideCharts(withDefaultRegisterables())],
  host: {
    class: className,
  },
})
export class DashboardComponent {}
