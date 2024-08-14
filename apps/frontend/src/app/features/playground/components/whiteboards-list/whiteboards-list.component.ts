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
  SmtButtonDirective,
  SmtCardComponent,
  SmtCardContentComponent,
  SmtCardHeaderComponent,
  SmtCardSubtitleDirective,
  SmtCardTitleDirective,
  SmtSeparatorComponent,
} from '@smite/design-system';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideRefreshCw, lucideLoader } from '@ng-icons/lucide';
import { finalize } from 'rxjs';
import { toast } from 'ngx-sonner';
import { CommonModule } from '@angular/common';

import { WhiteboardsService } from '../../../../shared/services/whiteboards.service';
import { WhiteboardComponent } from '../whiteboard/whiteboard.component';

@Component({
  selector: 'app-whiteboards-list',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    SmtButtonDirective,
    SmtCardComponent,
    SmtCardHeaderComponent,
    SmtCardContentComponent,
    SmtCardTitleDirective,
    SmtCardSubtitleDirective,
    SmtSeparatorComponent,
    WhiteboardComponent,
  ],
  providers: [
    provideIcons({
      lucideLoader,
      lucideRefreshCw,
    }),
  ],
  templateUrl: './whiteboards-list.component.html',
})
export class WhiteboardsListComponent implements OnInit {
  private readonly _whiteboardsService = inject(WhiteboardsService);
  private readonly _destoryRef = inject(DestroyRef);

  public readonly whiteboards = computed(() =>
    this._whiteboardsService.whiteboards(),
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
      .subscribe({
        next: () => {
          if (this.isRefreshing()) {
            toast.success('Whiteboards list updated successfully');
          }
        },
        error: () => {
          if (this.isRefreshing()) {
            toast.error('Failed to refresh the whiteboards list');
          }
        },
      });
  }

  public refreshWhiteboards(): void {
    this.isRefreshing.set(true);
    this._loadUserWhiteboards();
  }
}
