import { Component, inject, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideBook,
  lucideCopy,
  lucideEllipsis,
  lucideTrash,
} from '@ng-icons/lucide';
import {
  SmtBadgeDirective,
  SmtButtonDirective,
  SmtMenuComponent,
  SmtMenuItemComponent,
  SmtPopoverTriggerDirective,
} from '@smite/design-system';
import { toast } from 'ngx-sonner';
import { RouterLink } from '@angular/router';

import { Whiteboard } from '../../../../shared/interfaces/whiteboard.interface';
import { ClipboardService } from '../../../../shared/services/clipboard.service';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time.pipe';
import { WhiteboardsService } from '../../../../shared/services/whiteboards.service';

@Component({
  selector: 'app-whiteboard',
  standalone: true,
  imports: [
    RouterLink,
    RelativeTimePipe,
    NgIconComponent,
    SmtButtonDirective,
    SmtPopoverTriggerDirective,
    SmtMenuComponent,
    SmtMenuItemComponent,
    SmtBadgeDirective,
  ],
  providers: [
    provideIcons({
      lucideCopy,
      lucideBook,
      lucideEllipsis,
      lucideTrash,
    }),
  ],
  templateUrl: './whiteboard.component.html',
})
export class WhiteboardComponent {
  private readonly _whiteboardsService = inject(WhiteboardsService);
  private readonly _clipboardService = inject(ClipboardService);

  @Input() whiteboard!: Whiteboard;

  public copyToClipboard(text: string): void {
    this._clipboardService.copyToClipboard(text);
  }

  public deleteWhiteboard(id: string): void {
    this._whiteboardsService
      .deleteWhiteboard(id)

      .subscribe({
        next: () => toast.success('Joined the whiteboard successfully'),
        error: ({ message }) => toast.error(message),
      });
  }
}
