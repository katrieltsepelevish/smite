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

  public readonly currentUser$ = new BehaviorSubject<User | null | undefined>(
    undefined
  );
  public readonly isAuthenticated$ = this.currentUser$.pipe(
    filter((currentUser) => currentUser !== undefined),
    map(Boolean)
  );
  private readonly isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();

  private readonly error = new BehaviorSubject<string>('');
  public error$ = this.error.asObservable();

  public login(payload: LoginPayload): Observable<AuthResponse | null> {
    this.isLoading.next(true);
    this.error.next('');

    return this._http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, payload)
      .pipe(
        map((user) => {
          this.currentUser$.next(user);
          return user;
        }),
        catchError((err) => {
          this.currentUser$.next(null);
          this.error.next(err.error.message);
          return of(null);
        }),
        finalize(() => this.isLoading.next(false))
      );
  }

  public register(payload: RegisterPayload): Observable<AuthResponse | null> {
    this.isLoading.next(true);
    this.error.next('');

    return this._http
      .post<AuthResponse>(`${environment.apiUrl}/auth/register`, payload)
      .pipe(
        map((user) => {
          this.currentUser$.next(user);
          return user;
        }),
        catchError((err) => {
          this.currentUser$.next(null);
          this.error.next(err.error.message);
          return of(null);
        }),
        finalize(() => this.isLoading.next(false))
      );
  }

  public getCurrentUser(): Observable<AuthResponse | null> {
    this.isLoading.next(true);

    return this._http.get<AuthResponse>(`${environment.apiUrl}/auth/me`).pipe(
      map((user) => {
        this.currentUser$.next(user);
        return user;
      }),
      catchError(() => {
        this.currentUser$.next(null);
        return of(null);
      }),
      finalize(() => this.isLoading.next(false))
    );
  }

  public logout(): Observable<object> {
    this.isLoading.next(true);

    return this._http.post(`${environment.apiUrl}/auth/logout`, {}).pipe(
      finalize(() => {
        this.currentUser$.next(null);
        this.isLoading.next(false);
      })
    );
  }
}
