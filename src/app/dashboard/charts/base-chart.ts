import { computed, effect, inject, Signal } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ColorSchemeService } from '../../color-scheme.service';
import { COLOR_2, COLOR_3 } from './chart';

export abstract class BaseChart {
  private chartDirective = inject(BaseChartDirective);
  private colorScheme = inject(ColorSchemeService);

  protected abstract chart: Signal<ChartConfiguration>;

  protected readonly colors = computed(() => {
    return {
      textColor: this.colorScheme.theme() === 'dark' ? 'white' : 'black',
      backgroundColor: this.colorScheme.theme() === 'dark' ? COLOR_3 : COLOR_2,
      borderColor: this.colorScheme.theme() === 'dark' ? COLOR_2 : COLOR_3,
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
