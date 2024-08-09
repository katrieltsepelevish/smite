import { CanActivate, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';

import { AuthService } from '../auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  canActivate(): Observable<boolean> {
    return this._authService.isAuthenticated$.pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this._router.navigateByUrl('/login');
          return false;
        }

        return true;
      })
    );
  }
}
