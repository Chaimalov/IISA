import { computed, Directive, inject } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BaseChart } from './base-chart';
import { ApplicantStore } from '@IISA/services';

@Directive({
  selector: '[iisaHobbyChart]',
  hostDirectives: [BaseChartDirective],
})
export class HobbyChartDirective extends BaseChart {
  private store = inject(ApplicantStore);

  protected readonly chart = computed(() => {
    const { backgroundColor, borderColor, textColor } = this.colors();

    const allHobbies = this.store.applicants().flatMap((c) => c.hobbies);
    const counts = allHobbies.reduce(
      (acc, hobby) => {
        if (hobby) {
          acc[hobby] = (acc[hobby] || 0) + 1;
        }

        return acc;
      },
      {} as Record<string, number>,
    );

    const sortedHobbies = Object.entries(counts).sort(([, aCount], [, bCount]) => bCount - aCount);

    return {
      type: 'bar',
      data: {
        labels: sortedHobbies.map(([hobby]) => hobby),
        datasets: [
          {
            label: 'Hobby Popularity',
            data: sortedHobbies.map(([, count]) => count),
            backgroundColor,
            borderColor,
            borderRadius: 4,
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: textColor,
            },
            title: {
              text: 'Popularity',
              align: 'center',
              display: true,
              color: textColor,
            },
          },
          y: {
            ticks: {
              color: textColor,
            },
            title: {
              text: 'Hobby',
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
