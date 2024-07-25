import {
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  inject,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

const DarkModes = ['light', 'dark'] as const;
export type DarkMode = (typeof DarkModes)[number];

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  private _platformId = inject(PLATFORM_ID);
  private _renderer = inject(RendererFactory2).createRenderer(null, null);
  private _document = inject(DOCUMENT);
  private _darkMode$ = new BehaviorSubject<DarkMode>('light');
  public darkMode$ = this._darkMode$.asObservable();

  constructor() {
    this.syncInitialStateFromLocalStorage();
    this.toggleClassOnDarkModeChanges();
  }

  private syncInitialStateFromLocalStorage(): void {
    if (isPlatformBrowser(this._platformId)) {
      this._darkMode$.next(
        (localStorage.getItem('darkMode') as DarkMode) ?? 'light'
      );
    }
  }

  private toggleClassOnDarkModeChanges(): void {
    this.darkMode$.subscribe((darkMode) => {
      if (darkMode === 'dark') {
        this._renderer.addClass(this._document.documentElement, 'dark');
      } else {
        this._renderer.removeClass(this._document.documentElement, 'dark');
      }
    });
  }

  public setDarkMode(newMode: DarkMode): void {
    localStorage.setItem('darkMode', newMode);
    this._darkMode$.next(newMode);
  }
}
