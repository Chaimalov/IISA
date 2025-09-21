import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import {
  BarController,
  BarElement,
  CategoryScale,
  ChartConfiguration,
  LinearScale,
} from "chart.js";
import { BaseChartDirective, provideCharts } from "ng2-charts";
import { ApplicantsStore } from "../../applicants.store";

@Component({
  selector: "iisa-age-chart",
  templateUrl: "./age-chart.component.html",
  imports: [BaseChartDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,

  providers: [
    provideCharts({
      registerables: [BarController, CategoryScale, LinearScale, BarElement],
    }),
  ],
})
export class AgeChartComponent {
  private store = inject(ApplicantsStore);

  protected chart = computed(() => {
    const entries = this.store.applicants().reduce((acc, applicant) => {
      acc[applicant.age] = (acc[applicant.age] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return {
      type: "bar",

      data: {
        yLabels: Object.values(entries),
        xLabels: this.store.applicants().map((applicant) => applicant.age),
        datasets: [
          {
            label: "Applicants",
            data: Object.values(entries),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    } as const satisfies ChartConfiguration;
  });
}
