import { Injectable, OnDestroy, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { environment } from '../../../environments/environment.development';
import { User } from '../interfaces/user.interface';

@Injectable()
export class WebsocketService implements OnDestroy {
  private readonly _socket: Socket;

  public readonly connected = signal<boolean>(false);
  public readonly activeUsers = signal<User[]>([]);

  constructor() {
    this._socket = io(`${environment.socketUrl}/whiteboards`, {
      withCredentials: true,
    });

    this._setupListeners();
  }

  ngOnDestroy(): void {
    this._socket.off();
    this._socket.close();
  }

  private _setupListeners(): void {
    this._socket.on('connect', () => this.connected.set(true));

    this._socket.on('disconnect', () => this.connected.set(false));

    this._socket.on('whiteboard:joinedRoom', ({ users }: { users: User[] }) =>
      this.activeUsers.set(users),
    );

    this._socket.on('whiteboard:leftRoom', ({ users }: { users: User[] }) =>
      this.activeUsers.set(users),
    );
  }

  public joinRoom(roomId: string): void {
    this._socket.emit('whiteboard:joinRoom', roomId);
  }
}
