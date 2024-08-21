import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideLogOut } from '@ng-icons/lucide';
import {
  SmtAvatarComponent,
  SmtAvatarFallbackDirective,
  SmtAvatarImageDirective,
  SmtButtonDirective,
  SmtPopoverTriggerDirective,
  SmtMenuComponent,
  SmtMenuItemComponent,
  SmtMenuSeparatorComponent,
  SmtGradientProfileComponent,
} from '@smite/design-system';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIconComponent,
    SmtButtonDirective,
    SmtAvatarComponent,
    SmtAvatarImageDirective,
    SmtAvatarFallbackDirective,
    SmtPopoverTriggerDirective,
    SmtMenuComponent,
    SmtMenuItemComponent,
    SmtMenuSeparatorComponent,
    SmtGradientProfileComponent,
  ],
  providers: [provideIcons({ lucideLogOut })],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  public logout(): void {
    this._authService.logout().subscribe(() => {
      this._router.navigateByUrl('/login');
    });
  }
}
