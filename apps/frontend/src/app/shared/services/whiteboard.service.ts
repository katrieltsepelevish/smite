import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { Whiteboard } from '../interfaces/whiteboard.interface';
import { environment } from '../../../environments/environment.development';
import { WhiteboardsService } from './whiteboards.service';

@Injectable()
export class WhiteboardService {
  private readonly _http = inject(HttpClient);
  private readonly _whiteboardsService = inject(WhiteboardsService);

  public readonly whiteboard = signal<Whiteboard | null>(null);

  public getWhiteboard(id: string): Observable<Whiteboard> {
    return this._http
      .get<Whiteboard>(`${environment.apiUrl}/whiteboard/${id}`)
      .pipe(
        map((whiteboard) => {
          this.whiteboard.set(whiteboard);
          return whiteboard;
        }),
      );
  }

  public joinWhiteboard(id: string): Observable<Whiteboard> {
    return this._http
      .post<Whiteboard>(`${environment.apiUrl}/whiteboard/join/${id}`, {})
      .pipe(
        map((whiteboard) => {
          this._whiteboardsService.whiteboards.set([
            ...this._whiteboardsService.whiteboards(),
            whiteboard,
          ]);
          return whiteboard;
        }),
        catchError((err) => {
          return throwError(() => new Error(err.error.message));
        }),
      );
  }

  public deleteWhiteboard(id: string): Observable<boolean> {
    return this._http
      .delete<boolean>(`${environment.apiUrl}/whiteboard/${id}`, {})
      .pipe(
        map((whiteboard) => {
          const updatedWhiteboards = this._whiteboardsService
            .whiteboards()
            .filter((whiteboard) => whiteboard.id !== id);
          this._whiteboardsService.whiteboards.set(updatedWhiteboards);
          return whiteboard;
        }),
        catchError((err) => {
          return throwError(() => new Error(err.error.message));
        }),
      );
  }
}
