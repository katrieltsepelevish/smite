import { Component } from '@angular/core';
import {
  SmtButtonDirective,
  SmtCardComponent,
  SmtCardContentComponent,
  SmtCardHeaderComponent,
  SmtCardSubtitleDirective,
  SmtCardTitleDirective,
} from '@smite/design-system';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBook, lucideRefreshCw, lucideEllipsis } from '@ng-icons/lucide';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [
    NgIconComponent,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
    HlmBadgeDirective,
    SmtButtonDirective,
    SmtCardComponent,
    SmtCardHeaderComponent,
    SmtCardContentComponent,
    SmtCardTitleDirective,
    SmtCardSubtitleDirective,
  ],
  providers: [provideIcons({ lucideRefreshCw, lucideBook, lucideEllipsis })],
  templateUrl: './rooms-list.component.html',
})
export class RoomsListComponent {}
