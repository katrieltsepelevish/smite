import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideLogOut } from '@ng-icons/lucide';
import {
  SmtAvatarComponent,
  SmtAvatarFallbackDirective,
  SmtAvatarImageDirective,
  SmtButtonDirective,
} from '@smite/design-system';
import {
  HlmMenuBarComponent,
  HlmMenuItemDirective,
  HlmMenuComponent,
  HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HlmMenuBarComponent,
    HlmMenuItemDirective,
    HlmMenuComponent,
    HlmMenuSeparatorComponent,
    BrnMenuTriggerDirective,
    NgIconComponent,
    SmtButtonDirective,
    SmtAvatarComponent,
    SmtAvatarImageDirective,
    SmtAvatarFallbackDirective,
  ],
  providers: [provideIcons({ lucideLogOut })],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
