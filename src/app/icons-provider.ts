import { EnvironmentProviders, importProvidersFrom, inject, provideAppInitializer, Provider } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LucideAngularModule } from 'lucide-angular';

export function provideIcons(): EnvironmentProviders[] {
  return [
    importProvidersFrom(LucideAngularModule.pick({})),
    provideAppInitializer(() => {
      const iconRegistry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);

      iconRegistry.addSvgIcon('IISA', sanitizer.bypassSecurityTrustResourceUrl('IISA.svg'));
      iconRegistry.addSvgIcon('Astronaut', sanitizer.bypassSecurityTrustResourceUrl('astronaut.svg'));
      iconRegistry.addSvgIcon('spinner', sanitizer.bypassSecurityTrustResourceUrl('spinner.svg'));
    }),
  ];
}
