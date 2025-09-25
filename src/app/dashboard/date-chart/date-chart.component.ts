import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ApplicantsStore } from '../../applicants.store';

const style = getComputedStyle(document.documentElement);
const COLOR_2 = style.getPropertyValue('--color-surface-2');
const COLOR_3 = style.getPropertyValue('--color-surface-3');

@Component({
  selector: 'iisa-date-chart',
  templateUrl: './date-chart.component.html',
  imports: [BaseChartDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,

  providers: [provideCharts(withDefaultRegisterables())],
})
export class DateChartComponent {
  private store = inject(ApplicantsStore);

  protected readonly chart = computed(() => {
    const entries = this.store.applicants().reduce(
      (acc, applicant) => {
        const date = new Date(applicant.created_at).toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        });
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      type: 'line',
      data: {
        yLabels: Object.values(entries) as unknown as string[],
        xLabels: Object.keys(entries),
        datasets: [
          {
            label: 'Registration Date Breakdown',
            data: Object.values(entries),
            backgroundColor: COLOR_2,
            borderColor: COLOR_3,
            showLine: true,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
            title: {
              text: 'Registration Date breakdown',
              align: 'center',
              display: true,
              color: 'white',
            },
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
