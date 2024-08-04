import { Component } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { SmtButtonDirective } from '@smite/design-system';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBook, lucideRefreshCw, lucideEllipsis } from '@ng-icons/lucide';
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
    NgIconComponent,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
    HlmBadgeDirective,
    SmtButtonDirective,
  ],
  providers: [provideIcons({ lucideRefreshCw, lucideBook, lucideEllipsis })],
  templateUrl: './rooms-list.component.html',
})
export class RoomsListComponent {}
