import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Whiteboard } from '../interfaces/whiteboard.interface';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class WhiteboardService {
  private readonly _http = inject(HttpClient);

  public readonly whiteboard = signal<Whiteboard | null>(null);

  public getWhiteboard(id: string): Observable<Whiteboard> {
    return this._http
      .get<Whiteboard>(`${environment.apiUrl}/whiteboards/${id}`)
      .pipe(
        map((whiteboard) => {
          this.whiteboard.set(whiteboard);
          return whiteboard;
        }),
      );
  }
}
