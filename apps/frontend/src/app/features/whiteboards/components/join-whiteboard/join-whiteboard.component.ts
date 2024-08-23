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
import { finalize } from 'rxjs';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

import { WhiteboardsService } from '../../../../shared/services/whiteboards.service';

@Component({
  selector: 'app-join-whiteboard',
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
  templateUrl: './join-whiteboard.component.html',
})
export class JoinWhiteboardComponent {
  private readonly _whiteboardsService = inject(WhiteboardsService);
  private readonly _router = inject(Router);

  public readonly submitted = signal<boolean>(false);
  public readonly isLoading = signal<boolean>(false);
  public readonly hasError = signal<boolean>(false);

  public readonly joinWhiteboardForm = new FormGroup({
    whiteboardId: new FormControl('', Validators.required),
  });

  public onSubmit(): void {
    this.submitted.set(true);

    if (this.joinWhiteboardForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.hasError.set(false);

    this._whiteboardsService
      .joinWhiteboard(
        this.joinWhiteboardForm.controls.whiteboardId.value as string,
      )
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: ({ token }) => {
          toast.success('Joined the whiteboard successfully');
          this._router.navigate(['/boards', token]);
        },
        error: ({ message }) => {
          toast.error(message);
          this.hasError.set(true);
        },
      });
  }
}
