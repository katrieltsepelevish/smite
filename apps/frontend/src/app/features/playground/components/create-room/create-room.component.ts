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
import moment from 'moment';

import { RoomsService } from '../../../../shared/services/rooms.service';

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
  providers: [provideIcons({ lucideToyBrick, lucideLoader })],
  templateUrl: './create-room.component.html',
})
export class CreateRoomComponent {
  private readonly _roomsService = inject(RoomsService);

  public readonly isLoading = signal<boolean>(false);

  public createRoom(): void {
    this.isLoading.set(true);

    this._roomsService
      .createRoom()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(({ createdAt }) => {
        toast('Room has been created', {
          description: moment(createdAt).format('dddd, MMMM Do [at] h:mma'),
        });
      });
  }
}
