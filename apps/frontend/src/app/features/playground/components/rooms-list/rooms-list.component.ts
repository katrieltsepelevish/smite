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

import { RoomsService } from '../../../../shared/services/rooms.service';
import { RelativeTimePipe } from '../../../../shared/pipes/relative-time.pipe';
import { ShortenIdPipe } from '../../../../shared/pipes/shorten-id-pipe';
import { ClipboardService } from '../../../../shared/services/clipboard.service';

@Component({
  selector: 'app-rooms-list',
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
    ShortenIdPipe,
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
  templateUrl: './rooms-list.component.html',
})
export class RoomsListComponent implements OnInit {
  private readonly _roomsService = inject(RoomsService);
  private readonly _clipboardService = inject(ClipboardService);
  private readonly _destoryRef = inject(DestroyRef);

  public readonly rooms = computed(() => this._roomsService.rooms());
  public readonly isLoading = signal<boolean>(true);
  public readonly isRefreshing = signal<boolean>(false);

  ngOnInit(): void {
    this._loadUserRooms();
  }

  private _loadUserRooms(): void {
    this.isLoading.set(true);

    this._roomsService
      .getUserRooms()
      .pipe(
        takeUntilDestroyed(this._destoryRef),
        finalize(() => {
          this.isLoading.set(false);
          this.isRefreshing.set(false);
        }),
      )
      .subscribe();
  }

  public refreshRooms(): void {
    this.isRefreshing.set(true);
    this._loadUserRooms();
  }

  public copyToClipboard(text: string): void {
    this._clipboardService.copyToClipboard(text);
  }
}
