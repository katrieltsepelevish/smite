import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideLogOut } from '@ng-icons/lucide';
import { SmtButtonDirective } from '@smite/design-system';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import {
  HlmMenuBarComponent,
  HlmMenuItemDirective,
  HlmMenuComponent,
  HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmAvatarImageDirective,
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
} from '@spartan-ng/ui-avatar-helm';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    BrnSeparatorComponent,
    HlmMenuBarComponent,
    HlmMenuItemDirective,
    HlmMenuComponent,
    HlmMenuSeparatorComponent,
    BrnMenuTriggerDirective,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    NgIconComponent,
    SmtButtonDirective,
  ],
  providers: [provideIcons({ lucideLogOut })],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
