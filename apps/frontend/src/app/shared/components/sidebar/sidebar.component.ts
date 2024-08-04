import { Component } from '@angular/core';
import { SmtButtonDirective, SmtTooltipComponent } from '@smite/design-system';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
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
    SmtTooltipComponent,
    SmtButtonDirective,
  ],
  providers: [provideIcons({ lucideTerminal, lucideZap, lucideBarChart })],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}
