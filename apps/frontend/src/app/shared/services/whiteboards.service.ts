import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { Whiteboard } from '../interfaces/whiteboard.interface';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class WhiteboardsService {
  private readonly _http = inject(HttpClient);

  public readonly whiteboards = signal<Whiteboard[]>([]);

  public createWhiteboard(): Observable<Whiteboard> {
    return this._http
      .post<Whiteboard>(`${environment.apiUrl}/whiteboards`, {})
      .pipe(
        map((whiteboard) => {
          this.whiteboards.set([...this.whiteboards(), whiteboard]);
          return whiteboard;
        }),
      );
  }

  public joinWhiteboard(id: string): Observable<Whiteboard> {
    return this._http
      .post<Whiteboard>(`${environment.apiUrl}/whiteboards/join/${id}`, {})
      .pipe(
        map((whiteboard) => {
          this.whiteboards.set([...this.whiteboards(), whiteboard]);
          return whiteboard;
        }),
        catchError((err) => {
          return throwError(() => new Error(err.error.message));
        }),
      );
  }

  public getUserWhiteboards(): Observable<Whiteboard[]> {
    return this._http
      .get<Whiteboard[]>(`${environment.apiUrl}/whiteboards`)
      .pipe(
        map((whiteboards) => {
          this.whiteboards.set(whiteboards);
          return whiteboards;
        }),
      );
  }

  public deleteWhiteboard(id: string): Observable<boolean> {
    return this._http
      .delete<boolean>(`${environment.apiUrl}/whiteboards/${id}`, {})
      .pipe(
        map((whiteboard) => {
          const updatedWhiteboards = this.whiteboards().filter(
            (whiteboard) => whiteboard.id !== id,
          );
          this.whiteboards.set(updatedWhiteboards);
          return whiteboard;
        }),
        catchError((err) => {
          return throwError(() => new Error(err.error.message));
        }),
      );
  }
}
