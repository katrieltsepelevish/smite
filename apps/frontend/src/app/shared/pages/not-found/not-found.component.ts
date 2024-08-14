import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideTriangleAlert } from '@ng-icons/lucide';
import { SmtButtonDirective } from '@smite/design-system';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, NgIconComponent, SmtButtonDirective],
  providers: [provideIcons({ lucideTriangleAlert })],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {}
