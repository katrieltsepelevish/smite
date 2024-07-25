import { Component } from '@angular/core';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain';
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective,
} from '@spartan-ng/ui-tooltip-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideZap, lucideBarChart, lucideTerminal } from '@ng-icons/lucide';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    ThemeSwitcherComponent,
    HlmIconComponent,
    HlmButtonDirective,
    BrnTooltipContentDirective,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
  ],
  providers: [provideIcons({ lucideTerminal, lucideZap, lucideBarChart })],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}
