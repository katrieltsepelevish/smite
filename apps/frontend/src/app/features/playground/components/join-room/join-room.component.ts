import { Component } from '@angular/core';
import {
  SmtButtonDirective,
  SmtCardComponent,
  SmtCardContentComponent,
  SmtCardHeaderComponent,
  SmtCardSubtitleDirective,
  SmtCardTitleDirective,
  SmtInputDirective,
} from '@smite/design-system';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [
    SmtButtonDirective,
    SmtCardComponent,
    SmtCardHeaderComponent,
    SmtCardContentComponent,
    SmtCardTitleDirective,
    SmtCardSubtitleDirective,
    SmtInputDirective,
  ],
  providers: [],
  templateUrl: './join-room.component.html',
})
export class JoinRoomComponent {}
