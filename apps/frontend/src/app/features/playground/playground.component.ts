import { Component } from '@angular/core';

import { LayoutComponent } from '../../core/layout/layout.component';
import { CreateWhiteboardComponent } from './components/create-whiteboard/create-whiteboard.component';
import { JoinWhiteboardComponent } from './components/join-whiteboard/join-whiteboard.component';
import { WhiteboardsListComponent } from './components/whiteboards-list/whiteboards-list.component';
import { WhiteboardsService } from '../../shared/services/whiteboards.service';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    LayoutComponent,
    CreateWhiteboardComponent,
    JoinWhiteboardComponent,
    WhiteboardsListComponent,
  ],
  providers: [WhiteboardsService],
  templateUrl: './playground.component.html',
})
export class PlaygroundComponent {}
