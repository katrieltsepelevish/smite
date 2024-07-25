import { Route } from '@angular/router';
import { PlaygroundComponent } from './features/playground/playground.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: PlaygroundComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
