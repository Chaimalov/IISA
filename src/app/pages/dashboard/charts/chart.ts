import { computed, effect, inject, Signal } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ColorSchemeService } from '../../../services/color-scheme.service';

export const COLOR_2 = '#47b5ff';
export const COLOR_3 = '#1363df';

export abstract class Chart {
  private chartDirective = inject(BaseChartDirective);
  private colorScheme = inject(ColorSchemeService);

  protected abstract chart: Signal<ChartConfiguration>;

  protected readonly colors = computed(() => {
    return this.colorScheme.isDark()
      ? {
          textColor: 'white',
          backgroundColor: COLOR_3,
          borderColor: COLOR_2,
        }
      : {
          textColor: 'black',
          backgroundColor: COLOR_2,
          borderColor: COLOR_3,
        };
  });

  public constructor() {
    effect(() => {
      this.chartDirective.data = this.chart().data;
      this.chartDirective.options = this.chart().options;
      this.chartDirective.type = this.chart().type;
      this.chartDirective.render();
    });
  }
}
