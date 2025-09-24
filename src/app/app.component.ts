import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'iisa-root',
  imports: [RouterOutlet, RouterLink, MatIcon],
  templateUrl: './app.component.html',
  host: {
    class: 'h-full grid grid-rows-[1fr_auto]',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
