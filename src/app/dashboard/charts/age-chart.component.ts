import { computed, Directive, inject } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BaseChart } from './base-chart';
import { ApplicantStore } from '@IISA/services';

@Directive({
  selector: '[iisaAgeChart]',
  hostDirectives: [BaseChartDirective],
})
export class AgeChartDirective extends BaseChart {
  private store = inject(ApplicantStore);

  protected readonly chart = computed(() => {
    const { backgroundColor, borderColor, textColor } = this.colors();

    const entries = this.store.applicants().reduce(
      (acc, applicant) => {
        acc[applicant.age] = (acc[applicant.age] || 0) + 1;
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
            backgroundColor,
            borderColor,
            borderRadius: 4,
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
              text: 'Age',
              align: 'center',
              display: true,
              color: textColor,
            },
            type: 'linear',
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
