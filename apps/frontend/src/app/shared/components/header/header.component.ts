import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideLogOut } from '@ng-icons/lucide';
import { SmtButtonDirective } from '@smite/design-system';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
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
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HlmSeparatorDirective,
    BrnSeparatorComponent,
    HlmMenuBarComponent,
    HlmMenuItemDirective,
    HlmMenuComponent,
    HlmMenuSeparatorComponent,
    BrnMenuTriggerDirective,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmIconComponent,
    HlmButtonDirective,
    SmtButtonDirective,
  ],
  providers: [provideIcons({ lucideLogOut })],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
