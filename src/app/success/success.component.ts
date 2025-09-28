import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ColorSchemeService } from '../color-scheme.service';

@Component({
  selector: 'iisa-success',
  imports: [],
  templateUrl: './success.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'text-center grid items-center h-dvh auto-fill-150 auto-cols-fr auto-rows-fr',
  },
})
export class SuccessComponent {
  protected colorScheme = inject(ColorSchemeService);
}
