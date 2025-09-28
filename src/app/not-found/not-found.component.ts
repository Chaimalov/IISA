import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ColorSchemeService } from '../color-scheme.service';

@Component({
  selector: 'iisa-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found.component.html',
  host: {
    class: 'text-center grid items-center min-h-dvh h-dvh auto-fill-150 auto-cols-fr auto-rows-fr',
  },
  imports: [],
})
export class NotFoundComponent {
  protected colorScheme = inject(ColorSchemeService);
}
