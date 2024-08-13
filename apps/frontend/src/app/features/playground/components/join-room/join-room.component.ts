import { Component, inject, signal } from '@angular/core';
import {
  SmtButtonDirective,
  SmtCardComponent,
  SmtCardContentComponent,
  SmtCardHeaderComponent,
  SmtCardSubtitleDirective,
  SmtCardTitleDirective,
  SmtInputDirective,
} from '@smite/design-system';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { RoomsService } from '../../../../shared/services/rooms.service';
import { finalize } from 'rxjs';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [
    ReactiveFormsModule,
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
export class JoinRoomComponent {
  private readonly _roomsService = inject(RoomsService);

  public readonly submitted = signal<boolean>(false);
  public readonly isLoading = signal<boolean>(false);
  public readonly hasError = signal<boolean>(false);

  public readonly joinRoomForm = new FormGroup({
    roomId: new FormControl('', Validators.required),
  });

  public onSubmit(): void {
    this.submitted.set(true);

    if (this.joinRoomForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.hasError.set(false);

    this._roomsService
      .joinRoom(this.joinRoomForm.controls.roomId.value as string)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: () => {
          toast.success('Joined the room successfully');
        },
        error: () => {
          toast.error('Failed to join the room');
          this.hasError.set(true);
        },
      });
  }
}
