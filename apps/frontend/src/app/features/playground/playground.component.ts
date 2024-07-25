import { Component } from '@angular/core';

import { LayoutComponent } from '../../core/layout/layout.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    LayoutComponent,
    CreateRoomComponent,
    JoinRoomComponent,
    RoomsListComponent,
  ],
  providers: [],
  templateUrl: './playground.component.html',
})
export class PlaygroundComponent {}
