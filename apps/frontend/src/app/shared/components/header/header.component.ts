import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideLogOut } from '@ng-icons/lucide';
import {
  SmtAvatarComponent,
  SmtAvatarFallbackDirective,
  SmtAvatarImageDirective,
  SmtButtonDirective,
  SmtPopoverTriggerDirective,
  SmtMenuComponent,
  SmtMenuItemComponent,
  SmtMenuSeparatorComponent,
} from '@smite/design-system';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIconComponent,
    SmtButtonDirective,
    SmtAvatarComponent,
    SmtAvatarImageDirective,
    SmtAvatarFallbackDirective,
    SmtPopoverTriggerDirective,
    SmtMenuComponent,
    SmtMenuItemComponent,
    SmtMenuSeparatorComponent,
  ],
  providers: [provideIcons({ lucideLogOut })],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
