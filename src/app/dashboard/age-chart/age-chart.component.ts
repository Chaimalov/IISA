import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BarController, BarElement, CategoryScale, ChartConfiguration, LinearScale } from 'chart.js';
import { BaseChartDirective, provideCharts } from 'ng2-charts';
import { ApplicantsStore } from '../../applicants.store';
import { COLOR_2, COLOR_3 } from '../chart';

@Component({
  selector: 'iisa-age-chart',
  templateUrl: './age-chart.component.html',
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

  protected readonly chart = computed(() => {
    const entries = this.store.applicants().reduce(
      (acc, applicant) => {
        acc[applicant.age!] = (acc[applicant.age!] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    return {
      type: 'bar',
      data: {
        yLabels: Object.values(entries) as unknown as string[],
        xLabels: Object.keys(entries),
        datasets: [
          {
            label: 'Applicants',
            data: Object.values(entries),
            backgroundColor: COLOR_2,
            borderColor: COLOR_3,
            borderWidth: 1,
          },
        ],
      },
      options: {
        font: {},
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
            title: {
              text: 'Age breakdown',
              align: 'center',
              display: true,
              color: 'white',
            },
            type: 'linear',
          },
          y: {
            ticks: {
              color: 'white',
              stepSize: 1,
            },
            title: {
              text: 'Amount',
              align: 'center',
              display: true,
              color: 'white',
            },
          },
        },
      },
    } as const satisfies ChartConfiguration;
  });
}
