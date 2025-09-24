import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ApplicantsStore } from "../applicants.store";
import { AgeChartComponent } from "./age-chart/age-chart.component";
import { ApplicantsTableComponent } from "./table/applicants-table.component";
import { MapComponent } from "./map/map.component";

@Component({
  selector: "iisa-dashboard",
  templateUrl: "./dashboard.component.html",
  imports: [
    ApplicantsTableComponent,
    RouterOutlet,
    AgeChartComponent,
    MapComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "grid h-full",
  },
})
export class DashboardComponent {
  private store = inject(ApplicantsStore);
}
