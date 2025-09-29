import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { ColorSchemeService } from '../color-scheme.service';

const className = 'grid gap-4 place-items-center p-8 *:max-w-lg text-balance place-self-center';

@Component({
  selector: 'iisa-home',
  templateUrl: './home.component.html',
  imports: [RegistrationFormComponent, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: className,
  },
})
export class HomeComponent {
  protected colorScheme = inject(ColorSchemeService);
}
