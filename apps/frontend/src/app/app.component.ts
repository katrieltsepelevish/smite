import { Component, inject, OnInit } from '@angular/core';
import { NgxSonnerToaster } from 'ngx-sonner';
import { RouterModule } from '@angular/router';

import { AuthService } from './core/auth/auth.service';

@Component({
  standalone: true,
  imports: [RouterModule, NgxSonnerToaster],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly _authService = inject(AuthService);

  ngOnInit(): void {
    this._authService.getCurrentUser().subscribe();
  }
}
