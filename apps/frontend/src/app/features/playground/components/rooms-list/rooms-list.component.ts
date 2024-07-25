import { Component } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideBook, lucideRefreshCw, lucideEllipsis } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmButtonDirective,
    HlmIconComponent,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
    HlmBadgeDirective,
  ],
  providers: [provideIcons({ lucideRefreshCw, lucideBook, lucideEllipsis })],
  templateUrl: './rooms-list.component.html',
})
export class RoomsListComponent {}
