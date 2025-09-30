import { EnvironmentProviders, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

export function provideIcons(): EnvironmentProviders[] {
  return [
    importProvidersFrom(LucideAngularModule.pick({ Moon, Sun })),
    provideAppInitializer(() => {
      const iconRegistry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);

      iconRegistry.addSvgIcon('IISA', sanitizer.bypassSecurityTrustResourceUrl('IISA.svg'));
      iconRegistry.addSvgIcon('Astronaut', sanitizer.bypassSecurityTrustResourceUrl('astronaut.svg'));
      iconRegistry.addSvgIcon('spinner', sanitizer.bypassSecurityTrustResourceUrl('spinner.svg'));
    }),
  ];
}
