import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { lucideLoader } from '@ng-icons/lucide';

import { LayoutComponent } from '../../core/layout/layout.component';
import { WhiteboardsService } from '../../shared/services/whiteboards.service';
import { WebsocketService } from '../../shared/services/websocket.service';
import { PresenceComponent } from '../../shared/components/presence/presence.component';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [NgIconComponent, LayoutComponent, PresenceComponent],
  providers: [
    WebsocketService,
    WhiteboardsService,
    provideIcons({ lucideLoader }),
  ],
  templateUrl: './playground.component.html',
})
export class PlaygroundComponent implements OnInit {
  private readonly _whiteboardsService = inject(WhiteboardsService);
  private readonly _websocketService = inject(WebsocketService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  private readonly _boardId = this._route.snapshot.paramMap.get('boardId');

  public readonly isLoading = signal<boolean>(true);

  public readonly whiteboard = computed(() =>
    this._whiteboardsService.whiteboard(),
  );

  ngOnInit(): void {
    this._whiteboardsService
      .getWhiteboard(this._boardId as string)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: ({ token: roomId }) => this._websocketService.joinRoom(roomId),
        error: () => this._router.navigateByUrl('/404'),
      });
  }
}
