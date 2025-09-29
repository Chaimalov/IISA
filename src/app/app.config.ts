import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { DomSanitizer } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAppInitializer(() => {
      const iconRegistry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);
      iconRegistry.addSvgIcon('IISA', sanitizer.bypassSecurityTrustResourceUrl('IISA.svg'));
      iconRegistry.addSvgIcon('Astronaut', sanitizer.bypassSecurityTrustResourceUrl('astronaut.svg'));
    }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      routes,
      withRouterConfig({
        urlUpdateStrategy: 'eager',
      }),
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
      }),
      // withViewTransitions(),
    ),
  ],
};
