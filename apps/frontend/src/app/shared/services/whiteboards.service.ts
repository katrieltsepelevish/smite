import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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
}
