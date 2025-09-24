import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from "@angular/router";
import { MatIconRegistry } from "@angular/material/icon";
import { provideHttpClient } from "@angular/common/http";

import { routes } from "./app.routes";
import { DomSanitizer } from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAppInitializer(() => {
      const iconRegistry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);
      iconRegistry.addSvgIcon(
        "IISA",
        sanitizer.bypassSecurityTrustResourceUrl("IISA.svg")
      );
    }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
      withInMemoryScrolling({ anchorScrolling: "enabled" })
    ),
  ],
};
