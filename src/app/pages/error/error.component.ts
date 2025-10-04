import { Location } from '@angular/common';
import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'iisa-error',
  imports: [RouterLink],
  templateUrl: './error.component.html',
  host: {
    class: 'grid gap-4 place-items-center p-8 *:max-w-lg text-balance place-self-center',
  },
})
export class ErrorComponent {
  protected location = inject(Location);

  public readonly error = input('');
  public readonly message = input('');
}
