import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';

import { User } from '../../shared/interfaces/user.interface';
import { LoginPayload } from './interfaces/login-payload.interface';
import { AuthResponse } from './interfaces/auth-response.interface';
import { RegisterPayload } from './interfaces/register-payload.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _http = inject(HttpClient);

  private readonly _currentUser$ = new BehaviorSubject<User | null | undefined>(
    undefined
  );
  public readonly currentUser$ = this._currentUser$.asObservable();

  public readonly isAuthenticated$ = this._currentUser$.pipe(
    filter((currentUser) => currentUser !== undefined),
    map(Boolean)
  );

  public login(payload: LoginPayload): Observable<AuthResponse | null> {
    return this._http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, payload)
      .pipe(
        map((user) => {
          this._currentUser$.next(user);
          return user;
        }),
        catchError((err) => {
          this._currentUser$.next(null);
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  public register(payload: RegisterPayload): Observable<AuthResponse | null> {
    return this._http
      .post<AuthResponse>(`${environment.apiUrl}/auth/register`, payload)
      .pipe(
        map((user) => {
          this._currentUser$.next(user);
          return user;
        }),
        catchError((err) => {
          this._currentUser$.next(null);
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  public getCurrentUser(): Observable<AuthResponse | null> {
    return this._http.get<AuthResponse>(`${environment.apiUrl}/auth/me`).pipe(
      map((user) => {
        this._currentUser$.next(user);
        return user;
      }),
      catchError(() => {
        this._currentUser$.next(null);
        return of(null);
      })
    );
  }

  public logout(): Observable<void> {
    return this._http.post<void>(`${environment.apiUrl}/auth/logout`, {}).pipe(
      finalize(() => {
        this._currentUser$.next(null);
      })
    );
  }
}
