import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ColorSchemeService } from '../services/color-scheme.service';

@Component({
  selector: 'iisa-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found.component.html',
  host: {
    class:
      'text-center grid place-items-center overflow-clip place-content-center auto-fill-150 auto-cols-fr auto-rows-auto',
  },
  imports: [],
})
export class NotFoundComponent {
  protected colorScheme = inject(ColorSchemeService);
}
