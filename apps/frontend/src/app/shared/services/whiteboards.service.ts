import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

import { Whiteboard } from '../interfaces/whiteboard.interface';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class WhiteboardsService {
  private readonly _http = inject(HttpClient);

  public readonly whiteboard = signal<Whiteboard[]>([]);

  public createWhiteboard() {
    return this._http
      .post<Whiteboard>(`${environment.apiUrl}/whiteboards`, {})
      .pipe(
        map((whiteboard) => {
          this.whiteboard.set([...this.whiteboard(), whiteboard]);
          return whiteboard;
        }),
      );
  }

  public joinWhiteboard(whiteboardId: string) {
    return this._http
      .post<Whiteboard>(
        `${environment.apiUrl}/whiteboards/join/${whiteboardId}`,
        {},
      )
      .pipe(
        map((whiteboard) => {
          this.whiteboard.set([...this.whiteboard(), whiteboard]);
          return whiteboard;
        }),
        catchError((err) => {
          return throwError(() => new Error(err.error.message));
        }),
      );
  }

  public getUserWhiteboards() {
    return this._http
      .get<Whiteboard[]>(`${environment.apiUrl}/whiteboards`)
      .pipe(
        map((whiteboards) => {
          this.whiteboard.set(whiteboards);
          return whiteboards;
        }),
      );
  }
}
