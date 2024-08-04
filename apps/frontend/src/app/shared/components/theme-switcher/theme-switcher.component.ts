import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SmtButtonDirective } from '@smite/design-system';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideSun, lucideMoon } from '@ng-icons/lucide';
import { CommonModule } from '@angular/common';
import { DarkMode, ThemeSwitcherService } from './theme-switcher.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [
    CommonModule,
    HlmIconComponent,
    HlmButtonDirective,
    SmtButtonDirective,
  ],
  providers: [ThemeSwitcherService, provideIcons({ lucideSun, lucideMoon })],
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent implements OnInit, OnDestroy {
  private _themeService = inject(ThemeSwitcherService);
  public isDarkMode = false;
  private darkModeSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.darkModeSubscription = this._themeService.darkMode$.subscribe(
      (mode: DarkMode) => {
        this.isDarkMode = mode === 'dark';
      }
    );
  }

  ngOnDestroy(): void {
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }

  toggleDarkMode(): void {
    const updatedMode = this.isDarkMode ? 'light' : 'dark';
    this._themeService.setDarkMode(updatedMode);
  }
}
