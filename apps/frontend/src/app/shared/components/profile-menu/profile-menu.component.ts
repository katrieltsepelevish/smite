import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideLogOut } from '@ng-icons/lucide';
import {
  SmtButtonDirective,
  SmtGradientProfileComponent,
  SmtMenuComponent,
  SmtMenuItemComponent,
  SmtMenuSeparatorComponent,
  SmtPopoverTriggerDirective,
  SmtTooltipComponent,
} from '@smite/design-system';

import { AuthService } from '../../../core/auth/auth.service';
import { User } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  templateUrl: './profile-menu.component.html',
  imports: [
    CommonModule,
    NgIconComponent,
    SmtGradientProfileComponent,
    SmtPopoverTriggerDirective,
    SmtMenuComponent,
    SmtMenuItemComponent,
    SmtMenuSeparatorComponent,
    SmtButtonDirective,
    SmtTooltipComponent,
  ],
  providers: [provideIcons({ lucideLogOut })],
})
export class ProfileMenuComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  public currentUser$: Observable<User | null | undefined>;

  constructor() {
    this.currentUser$ = this._authService.currentUser$;
  }

  public logout(): void {
    this._authService.logout().subscribe(() => {
      this._router.navigateByUrl('/login');
    });
  }
}
