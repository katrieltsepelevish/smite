import { Component, inject, signal } from '@angular/core';
import {
  SmtButtonDirective,
  SmtCardComponent,
  SmtCardContentComponent,
  SmtCardHeaderComponent,
  SmtCardSubtitleDirective,
  SmtCardTitleDirective,
} from '@smite/design-system';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideLoader, lucideToyBrick } from '@ng-icons/lucide';
import { finalize } from 'rxjs';
import { toast } from 'ngx-sonner';
import moment from 'moment-timezone';
import { Router } from '@angular/router';

import { WhiteboardsService } from '../../../../shared/services/whiteboards.service';

@Component({
  selector: 'app-create-whiteboard',
  standalone: true,
  imports: [
    NgIconComponent,
    SmtButtonDirective,
    SmtCardComponent,
    SmtCardHeaderComponent,
    SmtCardContentComponent,
    SmtCardTitleDirective,
    SmtCardSubtitleDirective,
  ],
  providers: [provideIcons({ lucideToyBrick, lucideLoader })],
  templateUrl: './create-whiteboard.component.html',
})
export class CreateWhiteboardComponent {
  private readonly _whiteboardsService = inject(WhiteboardsService);
  private readonly _router = inject(Router);

  public readonly isLoading = signal<boolean>(false);

  public createWhiteboard(): void {
    this.isLoading.set(true);

    this._whiteboardsService
      .createWhiteboard()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(({ token }) => {
        toast('Whiteboard has been created', {
          description: moment(new Date()).format('dddd, MMMM Do [at] h:mma'),
        });
        this._router.navigate(['/boards', token]);
      });
  }
}
