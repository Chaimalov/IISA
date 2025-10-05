import { computed, Directive, inject } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from './chart';
import { ApplicantStore } from '@IISA/services';

@Directive({
  selector: '[iisaDateChart]',
  hostDirectives: [BaseChartDirective],
})
export class DateChartDirective extends Chart {
  private store = inject(ApplicantStore);

  protected readonly chart = computed(() => {
    const { backgroundColor, borderColor, textColor } = this.colors();

    const entries = this.store.applicants.value().reduce(
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
            backgroundColor: backgroundColor + '50',
            cubicInterpolationMode: 'monotone',
            fill: true,
            borderColor,
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
              color: textColor,
            },
            title: {
              text: 'Date',
              align: 'center',
              display: true,
              color: textColor,
            },
          },
          y: {
            ticks: {
              color: textColor,
              stepSize: 1,
            },
            title: {
              text: 'Amount',
              align: 'center',
              display: true,
              color: textColor,
            },
          },
        },
      },
    } as const satisfies ChartConfiguration;
  });
}
