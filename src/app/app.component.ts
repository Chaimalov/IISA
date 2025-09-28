import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ColorSchemeService } from './color-scheme.service';

@Component({
  selector: 'iisa-root',
  imports: [RouterOutlet, RouterLink, MatIcon, FormsModule],
  templateUrl: './app.component.html',
  host: {
    class: 'h-dvh grid grid-rows-[auto_1fr]',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected colorScheme = inject(ColorSchemeService);
}
