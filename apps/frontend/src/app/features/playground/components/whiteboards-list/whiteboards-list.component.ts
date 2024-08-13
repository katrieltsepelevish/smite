import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import {
  lucideBook,
  lucideRefreshCw,
  lucideEllipsis,
  lucideLoader,
  lucideCopy,
} from '@ng-icons/lucide';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

import { WhiteboardsService } from '../../../../shared/services/whiteboards.service';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time.pipe';
import { ClipboardService } from '../../../../shared/services/clipboard.service';

@Component({
  selector: 'app-whiteboards-list',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    SmtBadgeDirective,
    SmtButtonDirective,
    SmtCardComponent,
    SmtCardHeaderComponent,
    SmtCardContentComponent,
    SmtCardTitleDirective,
    SmtCardSubtitleDirective,
    SmtSeparatorComponent,
    RelativeTimePipe,
  ],
  providers: [
    provideIcons({
      lucideCopy,
      lucideLoader,
      lucideRefreshCw,
      lucideBook,
      lucideEllipsis,
    }),
  ],
  templateUrl: './whiteboards-list.component.html',
})
export class WhiteboardsListComponent implements OnInit {
  private readonly _whiteboardsService = inject(WhiteboardsService);
  private readonly _clipboardService = inject(ClipboardService);
  private readonly _destoryRef = inject(DestroyRef);

  public readonly whiteboards = computed(() =>
    this._whiteboardsService.whiteboard(),
  );
  public readonly isLoading = signal<boolean>(true);
  public readonly isRefreshing = signal<boolean>(false);

  ngOnInit(): void {
    this._loadUserWhiteboards();
  }

  private _loadUserWhiteboards(): void {
    this.isLoading.set(true);

    this._whiteboardsService
      .getUserWhiteboards()
      .pipe(
        takeUntilDestroyed(this._destoryRef),
        finalize(() => {
          this.isLoading.set(false);
          this.isRefreshing.set(false);
        }),
      )
      .subscribe();
  }

  public refreshWhiteboards(): void {
    this.isRefreshing.set(true);
    this._loadUserWhiteboards();
  }

  public copyToClipboard(text: string): void {
    this._clipboardService.copyToClipboard(text);
  }
}
