import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { Room } from '../interfaces/room.interface';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class RoomsService {
  private readonly _http = inject(HttpClient);

  public readonly rooms = signal<Room[]>([]);

  public createRoom() {
    return this._http.post<Room>(`${environment.apiUrl}/rooms`, {}).pipe(
      map((room) => {
        this.rooms.set([...this.rooms(), room]);
        return room;
      }),
    );
  }

  public joinRoom(roomId: string) {
    return this._http
      .post<Room>(`${environment.apiUrl}/rooms/join`, { roomId })
      .pipe(
        map((room) => {
          this.rooms.set([...this.rooms(), room]);
          return room;
        }),
      );
  }

  public getUserRooms() {
    return this._http.get<Room[]>(`${environment.apiUrl}/rooms`).pipe(
      map((rooms) => {
        this.rooms.set(rooms);
        return rooms;
      }),
    );
  }
}
