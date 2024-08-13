import { Component } from '@angular/core';
import {
  SmtButtonDirective,
  SmtTooltipComponent,
  SmtThemeSwitcherComponent,
} from '@smite/design-system';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideZap, lucideBarChart, lucideTerminal } from '@ng-icons/lucide';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    SmtThemeSwitcherComponent,
    NgIconComponent,
    SmtTooltipComponent,
    SmtButtonDirective,
  ],
  providers: [provideIcons({ lucideTerminal, lucideZap, lucideBarChart })],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}
