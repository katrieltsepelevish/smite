import { Route } from '@angular/router';

import { WhiteboardsComponent } from './features/whiteboards/whiteboards.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { GuestGuard } from './core/auth/guards/guest.guard';
import { PlaygroundComponent } from './features/playground/playground.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: WhiteboardsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'boards/:boardId',
    component: PlaygroundComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
