import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideSun, lucideMoon } from '@ng-icons/lucide';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { DarkMode, SmtThemeSwitcherService } from './theme-switcher.service';
import { SmtButtonDirective } from '../button';

@Component({
  selector: 'smt-theme-switcher',
  standalone: true,
  imports: [CommonModule, NgIconComponent, SmtButtonDirective],
  providers: [SmtThemeSwitcherService, provideIcons({ lucideSun, lucideMoon })],
  template: ` <button
    smtBtn
    variant="ghost"
    class="size-10 p-0"
    (click)="toggleDarkMode()"
  >
    <ng-icon [name]="isDarkMode ? 'lucideMoon' : 'lucideSun'" size="20" />
  </button>`,
})
export class SmtThemeSwitcherComponent implements OnInit, OnDestroy {
  private _themeService = inject(SmtThemeSwitcherService);
  private _darkModeSubscription: Subscription = new Subscription();
  public isDarkMode = false;

  ngOnInit(): void {
    this._darkModeSubscription = this._themeService.darkMode$.subscribe(
      (mode: DarkMode) => {
        this.isDarkMode = mode === 'dark';
      }
    );
  }

  ngOnDestroy(): void {
    if (this._darkModeSubscription) {
      this._darkModeSubscription.unsubscribe();
    }
  }

  toggleDarkMode(): void {
    const updatedMode = this.isDarkMode ? 'light' : 'dark';
    this._themeService.setDarkMode(updatedMode);
  }
}
