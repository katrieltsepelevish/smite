import { Component } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { SmtButtonDirective } from '@smite/design-system';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideToyBrick } from '@ng-icons/lucide';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmButtonDirective,
    HlmInputDirective,
    HlmIconComponent,
    SmtButtonDirective,
  ],
  providers: [provideIcons({ lucideToyBrick })],
  templateUrl: './create-room.component.html',
})
export class CreateRoomComponent {}
