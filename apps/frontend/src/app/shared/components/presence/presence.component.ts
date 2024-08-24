import { Component, computed, inject } from '@angular/core';
import {
  SmtGradientProfileComponent,
  SmtTooltipComponent,
} from '@smite/design-system';
import { CommonModule } from '@angular/common';

import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-presence',
  standalone: true,
  templateUrl: './presence.component.html',
  imports: [CommonModule, SmtGradientProfileComponent, SmtTooltipComponent],
})
export class PresenceComponent {
  private readonly _websocketService = inject(WebsocketService);

  public readonly activeUsers = computed(() =>
    this._websocketService.activeUsers(),
  );
}
