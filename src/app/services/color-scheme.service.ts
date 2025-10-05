import { computed, effect, Injectable, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map } from 'rxjs';

type ColorMode = 'light' | 'dark' | 'system';
type ColorTheme = 'light' | 'dark';

const COLOR_THEME_KEY = 'color-theme';

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  private readonly preferredColorScheme = toSignal<ColorTheme, ColorTheme>(
    fromEvent<MediaQueryListEvent>(window.matchMedia('(prefers-color-scheme: dark)'), 'change').pipe(
      map((media) => (media.matches ? 'dark' : 'light')),
    ),
    {
      initialValue: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    },
  );

  public readonly mode = signal<ColorMode>(this.getTheme());

  public toggle(): void {
    this.mode.update((mode) => (mode === 'dark' ? 'light' : 'dark'));
  }

  public readonly theme = computed<ColorTheme>(() => {
    const mode = this.mode();

    if (mode === 'system') {
      return this.preferredColorScheme();
    }

    return mode;
  });

  public readonly isDark = computed(() => this.theme() === 'dark');
  public readonly isLight = computed(() => this.theme() === 'light');

  public constructor() {
    effect(() => {
      document.documentElement.dataset['theme'] = this.theme();
    });

    effect(() => this.setTheme());
  }

  private getTheme(): ColorMode {
    return (localStorage.getItem(COLOR_THEME_KEY) as ColorMode | undefined) ?? 'system';
  }

  private setTheme(): void {
    localStorage.setItem(COLOR_THEME_KEY, this.mode());
  }
}
