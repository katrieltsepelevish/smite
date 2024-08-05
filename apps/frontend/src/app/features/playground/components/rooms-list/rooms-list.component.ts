import { Component } from '@angular/core';
import {
  SmtBadgeDirective,
  SmtButtonDirective,
  SmtCardComponent,
  SmtCardContentComponent,
  SmtCardHeaderComponent,
  SmtCardSubtitleDirective,
  SmtCardTitleDirective,
  SmtSeparatorComponent,
} from '@smite/design-system';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideBook, lucideRefreshCw, lucideEllipsis } from '@ng-icons/lucide';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [
    NgIconComponent,
    SmtBadgeDirective,
    SmtButtonDirective,
    SmtCardComponent,
    SmtCardHeaderComponent,
    SmtCardContentComponent,
    SmtCardTitleDirective,
    SmtCardSubtitleDirective,
    SmtSeparatorComponent,
  ],
  providers: [provideIcons({ lucideRefreshCw, lucideBook, lucideEllipsis })],
  templateUrl: './rooms-list.component.html',
})
export class RoomsListComponent {}
