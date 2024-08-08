import { Component } from '@angular/core';

import {
  SmtButtonDirective,
  SmtCardComponent,
  SmtCardContentComponent,
  SmtCardHeaderComponent,
  SmtCardSubtitleDirective,
  SmtCardTitleDirective,
} from '@smite/design-system';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideToyBrick } from '@ng-icons/lucide';

@Component({
  selector: 'app-create-room',
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
  providers: [provideIcons({ lucideToyBrick })],
  templateUrl: './create-room.component.html',
})
export class CreateRoomComponent {}
